/**
 * Music provider configuration
 * Switch between 'spotify' and 'lastfm' based on availability
 */
export const MUSIC_PROVIDER = (import.meta.env.VITE_MUSIC_PROVIDER || 'spotify') as 'spotify' | 'lastfm';

export const MUSIC_PROVIDERS = {
    SPOTIFY: 'spotify' as const,
    LASTFM: 'lastfm' as const,
} as const;
