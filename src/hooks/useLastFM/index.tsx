import { useState, useEffect } from 'react';
import type { LastFMData, LastFMRecentTracksResponse, LastFMTopArtistsResponse } from './types';
import { fetchFunction } from '@/lib/api';
import { getCache, setCache } from '@/lib/cache';

interface LastFMFunctionResponse {
    recentTracks: LastFMRecentTracksResponse | null;
    topArtists: LastFMTopArtistsResponse | null;
}

const LASTFM_CACHE_KEY = 'lastfm';
const LASTFM_CACHE_TTL = 60_000; // 60 segundos

export const useLastFM = () => {
    const [data, setData] = useState<LastFMData>(() => {
        const cached = getCache<Omit<LastFMData, 'isLoading' | 'error'>>(LASTFM_CACHE_KEY);
        if (cached) {
            return { ...cached, isLoading: true, error: null };
        }
        return { currentTrack: null, topArtist: null, recentTracks: [], isLoading: true, error: null };
    });

    useEffect(() => {
        const fetchLastFMData = async () => {
            setData((prev) => ({ ...prev, isLoading: true, error: null }));

            try {
                const { recentTracks: recentTracksData, topArtists: topArtistsData } =
                    await fetchFunction<LastFMFunctionResponse>('lastfm');

                // Track atual (mais recente com atributo nowplaying)
                const tracks = recentTracksData?.recenttracks?.track || [];
                const nowPlayingTrack = tracks.find((track) => track['@attr']?.nowplaying === 'true');

                const currentTrack = nowPlayingTrack
                    ? {
                          name: nowPlayingTrack.name,
                          artist: nowPlayingTrack.artist['#text'],
                          album: nowPlayingTrack.album['#text'],
                          albumArt:
                              nowPlayingTrack.image.find((img) => img.size === 'large')?.['#text'] ||
                              nowPlayingTrack.image.find((img) => img.size === 'medium')?.['#text'],
                          isPlaying: true,
                          url: nowPlayingTrack.url,
                      }
                    : null;

                // Top artist da semana
                const topArtist = topArtistsData?.topartists?.artist?.[0]
                    ? {
                          name: topArtistsData.topartists.artist[0].name,
                          playcount: topArtistsData.topartists.artist[0].playcount,
                          url: topArtistsData.topartists.artist[0].url,
                          images: topArtistsData.topartists.artist[0].image.map((img) => ({
                              url: img['#text'],
                          })),
                      }
                    : null;

                // Tracks recentes (excluindo a que está tocando)
                const recentTracks = tracks
                    .filter((track) => track['@attr']?.nowplaying !== 'true')
                    .slice(0, 3)
                    .map((track) => ({
                        name: track.name,
                        artist: track.artist['#text'],
                        album: track.album['#text'],
                        albumArt:
                            track.image.find((img) => img.size === 'large')?.['#text'] ||
                            track.image.find((img) => img.size === 'medium')?.['#text'],
                        url: track.url,
                    }));

                const newData = { currentTrack, topArtist, recentTracks };
                setData({ ...newData, isLoading: false, error: null });
                setCache(LASTFM_CACHE_KEY, newData, LASTFM_CACHE_TTL);
            } catch {
                console.error('Error fetching Last.fm data');
                setData({
                    currentTrack: null,
                    topArtist: null,
                    recentTracks: [],
                    isLoading: false,
                    error: 'Failed to load Last.fm data',
                });
            }
        };

        fetchLastFMData();

        // Atualiza a cada 30 segundos
        const interval = setInterval(fetchLastFMData, 30000);

        return () => clearInterval(interval);
    }, []);

    return data;
};
