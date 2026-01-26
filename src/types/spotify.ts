export interface SpotifyTrack {
    name: string;
    artist: string;
    album: string;
    albumArt?: string;
    progress?: number;
    duration?: number;
    isPlaying?: boolean;
    url?: string;
}

export interface SpotifyArtist {
    name: string;
    plays?: string;
    url?: string;
    images?: { url: string }[];
}

export interface SpotifyData {
    currentTrack: SpotifyTrack | null;
    topArtist: SpotifyArtist | null;
    recentTracks: SpotifyTrack[];
    isLoading: boolean;
    error: string | null;
}

export interface NowPlayingResponse {
    is_playing: boolean;
    item?: {
        name: string;
        artists: Array<{ name: string }>;
        album: {
            name: string;
            images: Array<{ url: string }>;
        };
        duration_ms: number;
        external_urls: {
            spotify: string;
        };
    };
    progress_ms?: number;
}

export interface TopArtistsResponse {
    items: Array<{
        name: string;
        external_urls: {
            spotify: string;
        };
        images: Array<{ url: string }>;
    }>;
}

export interface RecentlyPlayedResponse {
    items: Array<{
        track: {
            name: string;
            artists: Array<{ name: string }>;
            album: {
                name: string;
                images: Array<{ url: string }>;
            };
        };
    }>;
}
