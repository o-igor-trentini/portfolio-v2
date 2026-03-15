import type { Context } from '@netlify/functions';

const LASTFM_API_BASE = 'https://ws.audioscrobbler.com/2.0/';

async function fetchLastFM(
    apiKey: string,
    username: string,
    method: string,
    params: Record<string, string> = {},
): Promise<unknown | null> {
    const url = new URL(LASTFM_API_BASE);
    url.searchParams.set('method', method);
    url.searchParams.set('user', username);
    url.searchParams.set('api_key', apiKey);
    url.searchParams.set('format', 'json');

    for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, value);
    }

    const response = await fetch(url.toString());

    if (!response.ok) {
        return null;
    }

    return response.json();
}

export default async (_request: Request, _context: Context) => {
    const apiKey = process.env.LASTFM_API_KEY;
    const username = process.env.LASTFM_USERNAME;

    if (!apiKey || !username) {
        return new Response(JSON.stringify({ error: 'Last.fm not configured' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const [recentTracks, topArtists] = await Promise.all([
            fetchLastFM(apiKey, username, 'user.getrecenttracks', { limit: '3' }),
            fetchLastFM(apiKey, username, 'user.gettopartists', { period: '7day', limit: '1' }),
        ]);

        return new Response(JSON.stringify({ recentTracks, topArtists }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=30',
            },
        });
    } catch {
        return new Response(JSON.stringify({ error: 'Failed to fetch Last.fm data' }), {
            status: 502,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
