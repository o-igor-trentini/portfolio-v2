import { useEffect, useState } from 'react';
import { useLastFM } from './useLastFM';
import { useSpotify } from './useSpotify';
import { MUSIC_PROVIDER, MUSIC_PROVIDERS } from '@/config/musicProvider';

interface MusicData {
    currentTrack: any;
    topArtist: any;
    recentTracks: any[];
    isLoading: boolean;
    error: string | null;
    provider: 'spotify' | 'lastfm' | null;
    availableProviders: ('spotify' | 'lastfm')[];
    switchProvider: (provider: 'spotify' | 'lastfm') => void;
}

/**
 * Unified music hook with automatic fallback between providers
 * Tries preferred provider first, falls back to alternative if it fails
 */
export const useMusic = (manualProvider?: 'spotify' | 'lastfm'): MusicData => {
    const spotifyData = useSpotify();
    const lastfmData = useLastFM();
    const [activeProvider, setActiveProvider] = useState<'spotify' | 'lastfm' | null>(null);
    const [availableProviders, setAvailableProviders] = useState<('spotify' | 'lastfm')[]>([]);

    // Determine provider priority
    const preferredProvider = manualProvider || MUSIC_PROVIDER;

    useEffect(() => {
        // Check which providers are available (not loading and no error)
        const available: ('spotify' | 'lastfm')[] = [];

        if (!spotifyData.isLoading && !spotifyData.error && spotifyData.currentTrack) {
            available.push('spotify');
        }
        if (!lastfmData.isLoading && !lastfmData.error && lastfmData.currentTrack) {
            available.push('lastfm');
        }

        setAvailableProviders(available);

        // Select active provider based on priority and availability
        if (manualProvider) {
            // Manual override takes precedence
            setActiveProvider(manualProvider);
        } else if (!spotifyData.isLoading && !lastfmData.isLoading) {
            // Auto-select based on preferred provider and availability
            if (preferredProvider === MUSIC_PROVIDERS.SPOTIFY) {
                if (
                    !spotifyData.error &&
                    (spotifyData.currentTrack || spotifyData.topArtist || spotifyData.recentTracks.length > 0)
                ) {
                    setActiveProvider('spotify');
                } else if (
                    !lastfmData.error &&
                    (lastfmData.currentTrack || lastfmData.topArtist || lastfmData.recentTracks.length > 0)
                ) {
                    setActiveProvider('lastfm');
                } else {
                    setActiveProvider(null);
                }
            } else {
                if (
                    !lastfmData.error &&
                    (lastfmData.currentTrack || lastfmData.topArtist || lastfmData.recentTracks.length > 0)
                ) {
                    setActiveProvider('lastfm');
                } else if (
                    !spotifyData.error &&
                    (spotifyData.currentTrack || spotifyData.topArtist || spotifyData.recentTracks.length > 0)
                ) {
                    setActiveProvider('spotify');
                } else {
                    setActiveProvider(null);
                }
            }
        }
    }, [spotifyData, lastfmData, preferredProvider, manualProvider]);

    const switchProvider = (provider: 'spotify' | 'lastfm') => {
        setActiveProvider(provider);
    };

    // Return data from active provider
    const isLoading = spotifyData.isLoading || lastfmData.isLoading;

    if (activeProvider === 'spotify') {
        return {
            ...spotifyData,
            provider: 'spotify',
            availableProviders,
            switchProvider,
        };
    } else if (activeProvider === 'lastfm') {
        return {
            ...lastfmData,
            provider: 'lastfm',
            availableProviders,
            switchProvider,
        };
    }

    // Both providers failed or are loading
    return {
        currentTrack: null,
        topArtist: null,
        recentTracks: [],
        isLoading,
        error: isLoading ? null : 'All music providers are unavailable',
        provider: null,
        availableProviders,
        switchProvider,
    };
};
