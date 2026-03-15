import type { Context } from '@netlify/functions';

const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SPOTIFY_NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const SPOTIFY_TOP_ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists?limit=1&time_range=short_term';
const SPOTIFY_RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=3';

// Cache do access token em memória (module-level)
let cachedToken: string | null = null;
let tokenExpiresAt = 0;

async function getAccessToken(): Promise<string | null> {
    const now = Date.now();

    if (cachedToken && now < tokenExpiresAt) {
        return cachedToken;
    }

    const clientId = process.env.SPOTIFY_CLIENT_ID;
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
    const refreshToken = process.env.SPOTIFY_REFRESH_TOKEN;

    if (!clientId || !clientSecret || !refreshToken) {
        return null;
    }

    const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        }),
    });

    if (!response.ok) {
        cachedToken = null;
        return null;
    }

    const data = await response.json();
    cachedToken = data.access_token;
    // Cache por 50 minutos (token expira em 60)
    tokenExpiresAt = now + 50 * 60 * 1000;

    return cachedToken;
}

async function fetchSpotifyEndpoint(url: string, accessToken: string): Promise<unknown | null> {
    const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (response.status === 204 || response.status === 404) {
        return null;
    }

    if (!response.ok) {
        return null;
    }

    return response.json();
}

export default async (_request: Request, _context: Context) => {
    const accessToken = await getAccessToken();

    if (!accessToken) {
        return new Response(JSON.stringify({ error: 'Spotify not configured' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const [nowPlaying, topArtists, recentlyPlayed] = await Promise.all([
            fetchSpotifyEndpoint(SPOTIFY_NOW_PLAYING_ENDPOINT, accessToken),
            fetchSpotifyEndpoint(SPOTIFY_TOP_ARTISTS_ENDPOINT, accessToken),
            fetchSpotifyEndpoint(SPOTIFY_RECENTLY_PLAYED_ENDPOINT, accessToken),
        ]);

        return new Response(JSON.stringify({ nowPlaying, topArtists, recentlyPlayed }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=30',
            },
        });
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to fetch Spotify data' }), {
            status: 502,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
