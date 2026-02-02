import { useLastFM } from './useLastFM';
import { useSpotify } from './useSpotify';
import { MUSIC_PROVIDER, MUSIC_PROVIDERS } from '@/config/musicProvider';

/**
 * Unified music hook that uses either Spotify or Last.fm based on configuration
 */
export const useMusic = () => {
    const spotifyData = useSpotify();
    const lastfmData = useLastFM();

    // Return data from configured provider
    if (MUSIC_PROVIDER === MUSIC_PROVIDERS.LASTFM) {
        return {
            ...lastfmData,
            provider: MUSIC_PROVIDERS.LASTFM,
        };
    }

    return {
        ...spotifyData,
        provider: MUSIC_PROVIDERS.SPOTIFY,
    };
};
