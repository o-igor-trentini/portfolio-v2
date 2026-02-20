import { useState, useEffect } from 'react';
import type { SpotifyData, NowPlayingResponse, TopArtistsResponse, RecentlyPlayedResponse } from './types';
import { fetchFunction } from '@/lib/api';
import { getCache, setCache } from '@/lib/cache';

interface SpotifyFunctionResponse {
    nowPlaying: NowPlayingResponse | null;
    topArtists: TopArtistsResponse | null;
    recentlyPlayed: RecentlyPlayedResponse | null;
}

const SPOTIFY_CACHE_KEY = 'spotify';
const SPOTIFY_CACHE_TTL = 60_000; // 60 segundos

export const useSpotify = () => {
    const [data, setData] = useState<SpotifyData>(() => {
        const cached = getCache<Omit<SpotifyData, 'isLoading' | 'error'>>(SPOTIFY_CACHE_KEY);
        if (cached) {
            return { ...cached, isLoading: true, error: null };
        }
        return { currentTrack: null, topArtist: null, recentTracks: [], isLoading: true, error: null };
    });

    useEffect(() => {
        const fetchSpotifyData = async () => {
            setData((prev) => ({ ...prev, isLoading: true, error: null }));

            try {
                const { nowPlaying, topArtists, recentlyPlayed } =
                    await fetchFunction<SpotifyFunctionResponse>('spotify');

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
                setCache(SPOTIFY_CACHE_KEY, newData, SPOTIFY_CACHE_TTL);
            } catch {
                console.error('Error fetching Spotify data');
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
