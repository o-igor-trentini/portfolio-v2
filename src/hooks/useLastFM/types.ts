export interface LastFMTrack {
    name: string;
    artist: string;
    album: string;
    albumArt?: string;
    isPlaying?: boolean;
    url?: string;
}

export interface LastFMArtist {
    name: string;
    playcount?: string;
    url?: string;
    images?: { url: string }[];
}

export interface LastFMData {
    currentTrack: LastFMTrack | null;
    topArtist: LastFMArtist | null;
    recentTracks: LastFMTrack[];
    isLoading: boolean;
    error: string | null;
}

export interface LastFMRecentTracksResponse {
    recenttracks: {
        track: Array<{
            name: string;
            artist: {
                '#text': string;
            };
            album: {
                '#text': string;
            };
            image: Array<{
                '#text': string;
                size: string;
            }>;
            '@attr'?: {
                nowplaying: string;
            };
            url: string;
        }>;
    };
}

export interface LastFMTopArtistsResponse {
    topartists: {
        artist: Array<{
            name: string;
            playcount: string;
            url: string;
            image: Array<{
                '#text': string;
                size: string;
            }>;
        }>;
    };
}
