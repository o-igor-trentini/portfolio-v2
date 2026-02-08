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
        // Verifica dados disponíveis independente do estado de loading (aproveita cache)
        const spotifyHasData =
            !spotifyData.error &&
            (spotifyData.currentTrack || spotifyData.topArtist || spotifyData.recentTracks.length > 0);
        const lastfmHasData =
            !lastfmData.error &&
            (lastfmData.currentTrack || lastfmData.topArtist || lastfmData.recentTracks.length > 0);

        const available: ('spotify' | 'lastfm')[] = [];
        if (spotifyHasData) available.push('spotify');
        if (lastfmHasData) available.push('lastfm');
        setAvailableProviders(available);

        // Seleção do provider ativo baseada em dados disponíveis (inclui cache)
        if (manualProvider) {
            setActiveProvider(manualProvider);
        } else if (preferredProvider === MUSIC_PROVIDERS.SPOTIFY) {
            if (spotifyHasData) {
                setActiveProvider('spotify');
            } else if (lastfmHasData) {
                setActiveProvider('lastfm');
            } else if (!spotifyData.isLoading && !lastfmData.isLoading) {
                setActiveProvider(null);
            }
        } else {
            if (lastfmHasData) {
                setActiveProvider('lastfm');
            } else if (spotifyHasData) {
                setActiveProvider('spotify');
            } else if (!spotifyData.isLoading && !lastfmData.isLoading) {
                setActiveProvider(null);
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
