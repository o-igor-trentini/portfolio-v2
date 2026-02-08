import { useState, useEffect } from 'react';
import type { SpotifyData, NowPlayingResponse, TopArtistsResponse, RecentlyPlayedResponse } from './types';
import { musicCache } from '@/lib/cache';

const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SPOTIFY_NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const SPOTIFY_TOP_ARTISTS_ENDPOINT = 'https://api.spotify.com/v1/me/top/artists?limit=1&time_range=short_term';
const SPOTIFY_RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=3';

const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = import.meta.env.VITE_SPOTIFY_REFRESH_TOKEN;

const getAccessToken = async (): Promise<string | null> => {
    if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
        console.warn('Spotify credentials not configured');
        return null;
    }

    try {
        const response = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: REFRESH_TOKEN,
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to get access token');
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error getting Spotify access token:', error);
        return null;
    }
};

const getNowPlaying = async (accessToken: string): Promise<NowPlayingResponse | null> => {
    try {
        const response = await fetch(SPOTIFY_NOW_PLAYING_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.status === 204 || response.status === 404) {
            return null;
        }

        if (!response.ok) {
            throw new Error('Failed to get now playing');
        }

        return await response.json();
    } catch (error) {
        console.error('Error getting now playing:', error);
        return null;
    }
};

const getTopArtists = async (accessToken: string): Promise<TopArtistsResponse | null> => {
    try {
        const response = await fetch(SPOTIFY_TOP_ARTISTS_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get top artists');
        }

        return await response.json();
    } catch (error) {
        console.error('Error getting top artists:', error);
        return null;
    }
};

const getRecentlyPlayed = async (accessToken: string): Promise<RecentlyPlayedResponse | null> => {
    try {
        const response = await fetch(SPOTIFY_RECENTLY_PLAYED_ENDPOINT, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to get recently played');
        }

        return await response.json();
    } catch (error) {
        console.error('Error getting recently played:', error);
        return null;
    }
};

const SPOTIFY_CACHE_KEY = 'spotify';
const SPOTIFY_CACHE_TTL = 60_000; // 60 segundos

export const useSpotify = () => {
    const [data, setData] = useState<SpotifyData>(() => {
        const cached = musicCache.get<Omit<SpotifyData, 'isLoading' | 'error'>>(SPOTIFY_CACHE_KEY);
        if (cached) {
            return { ...cached, isLoading: true, error: null };
        }
        return { currentTrack: null, topArtist: null, recentTracks: [], isLoading: true, error: null };
    });

    useEffect(() => {
        const fetchSpotifyData = async () => {
            setData((prev) => ({ ...prev, isLoading: true, error: null }));

            const accessToken = await getAccessToken();

            if (!accessToken) {
                setData({
                    currentTrack: null,
                    topArtist: null,
                    recentTracks: [],
                    isLoading: false,
                    error: 'Spotify not configured',
                });
                return;
            }

            try {
                const [nowPlaying, topArtists, recentlyPlayed] = await Promise.all([
                    getNowPlaying(accessToken),
                    getTopArtists(accessToken),
                    getRecentlyPlayed(accessToken),
                ]);

                const currentTrack = nowPlaying?.item
                    ? {
                          name: nowPlaying.item.name,
                          artist: nowPlaying.item.artists.map((a) => a.name).join(', '),
                          album: nowPlaying.item.album.name,
                          albumArt: nowPlaying.item.album.images[0]?.url,
                          progress: nowPlaying.progress_ms
                              ? Math.round((nowPlaying.progress_ms / nowPlaying.item.duration_ms) * 100)
                              : 0,
                          duration: nowPlaying.item.duration_ms,
                          isPlaying: nowPlaying.is_playing,
                          url: nowPlaying.item.external_urls.spotify,
                      }
                    : null;

                const topArtist = topArtists?.items?.[0]
                    ? {
                          name: topArtists.items[0].name,
                          url: topArtists.items[0].external_urls.spotify,
                          images: topArtists.items[0].images,
                      }
                    : null;

                const recentTracks =
                    recentlyPlayed?.items.map((item) => ({
                        name: item.track.name,
                        artist: item.track.artists.map((a) => a.name).join(', '),
                        album: item.track.album.name,
                        albumArt: item.track.album.images[0]?.url,
                    })) || [];

                const newData = { currentTrack, topArtist, recentTracks };
                setData({ ...newData, isLoading: false, error: null });
                musicCache.set(SPOTIFY_CACHE_KEY, newData, SPOTIFY_CACHE_TTL);
            } catch (error) {
                console.error('Error fetching Spotify data:', error);
                setData({
                    currentTrack: null,
                    topArtist: null,
                    recentTracks: [],
                    isLoading: false,
                    error: 'Failed to load Spotify data',
                });
            }
        };

        fetchSpotifyData();

        // Refresh data every 30 seconds
        const interval = setInterval(fetchSpotifyData, 30000);

        return () => clearInterval(interval);
    }, []);

    return data;
};
