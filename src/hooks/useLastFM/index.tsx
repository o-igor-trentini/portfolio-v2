import { useState, useEffect } from 'react';
import type { LastFMData, LastFMRecentTracksResponse, LastFMTopArtistsResponse } from './types';

const LASTFM_API_BASE = 'https://ws.audioscrobbler.com/2.0/';
const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const LASTFM_USERNAME = import.meta.env.VITE_LASTFM_USERNAME;

const getRecentTracks = async (): Promise<LastFMRecentTracksResponse | null> => {
    if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
        console.warn('Last.fm credentials not configured');
        return null;
    }

    try {
        const url = new URL(LASTFM_API_BASE);
        url.searchParams.append('method', 'user.getrecenttracks');
        url.searchParams.append('user', LASTFM_USERNAME);
        url.searchParams.append('api_key', LASTFM_API_KEY);
        url.searchParams.append('format', 'json');
        url.searchParams.append('limit', '3');

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error('Failed to get recent tracks from Last.fm');
        }

        return await response.json();
    } catch (error) {
        console.error('Error getting Last.fm recent tracks:', error);
        return null;
    }
};

const getTopArtists = async (): Promise<LastFMTopArtistsResponse | null> => {
    if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
        console.warn('Last.fm credentials not configured');
        return null;
    }

    try {
        const url = new URL(LASTFM_API_BASE);
        url.searchParams.append('method', 'user.gettopartists');
        url.searchParams.append('user', LASTFM_USERNAME);
        url.searchParams.append('api_key', LASTFM_API_KEY);
        url.searchParams.append('format', 'json');
        url.searchParams.append('period', '7day');
        url.searchParams.append('limit', '1');

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error('Failed to get top artists from Last.fm');
        }

        return await response.json();
    } catch (error) {
        console.error('Error getting Last.fm top artists:', error);
        return null;
    }
};

export const useLastFM = () => {
    const [data, setData] = useState<LastFMData>({
        currentTrack: null,
        topArtist: null,
        recentTracks: [],
        isLoading: true,
        error: null,
    });

    useEffect(() => {
        const fetchLastFMData = async () => {
            setData((prev) => ({ ...prev, isLoading: true, error: null }));

            if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
                setData({
                    currentTrack: null,
                    topArtist: null,
                    recentTracks: [],
                    isLoading: false,
                    error: 'Last.fm not configured',
                });
                return;
            }

            try {
                const [recentTracksData, topArtistsData] = await Promise.all([getRecentTracks(), getTopArtists()]);

                // Get current track (most recent track with nowplaying attribute)
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

                // Get top artist
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

                // Get recent tracks (excluding now playing)
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

                setData({
                    currentTrack,
                    topArtist,
                    recentTracks,
                    isLoading: false,
                    error: null,
                });
            } catch (error) {
                console.error('Error fetching Last.fm data:', error);
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

        // Refresh data every 30 seconds
        const interval = setInterval(fetchLastFMData, 30000);

        return () => clearInterval(interval);
    }, []);

    return data;
};
