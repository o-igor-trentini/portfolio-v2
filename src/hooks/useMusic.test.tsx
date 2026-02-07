import { renderHook, act, waitFor } from '@testing-library/react';

interface MockMusicData {
    currentTrack: { name: string; artist: string } | null;
    topArtist: { name: string } | null;
    recentTracks: { name: string }[];
    isLoading: boolean;
    error: string | null;
}

const mockSpotifyData: MockMusicData = {
    currentTrack: { name: 'Spotify Track', artist: 'Artist A' },
    topArtist: { name: 'Top Spotify Artist' },
    recentTracks: [{ name: 'Recent 1' }],
    isLoading: false,
    error: null,
};

const mockLastFMData: MockMusicData = {
    currentTrack: { name: 'LastFM Track', artist: 'Artist B' },
    topArtist: { name: 'Top LastFM Artist' },
    recentTracks: [{ name: 'Recent 2' }],
    isLoading: false,
    error: null,
};

const mockEmptyData: MockMusicData = {
    currentTrack: null,
    topArtist: null,
    recentTracks: [],
    isLoading: false,
    error: 'Provider not configured',
};

// Variáveis para controlar os mocks por teste
let spotifyReturn: MockMusicData = { ...mockSpotifyData };
let lastfmReturn: MockMusicData = { ...mockLastFMData };

vi.mock('./useSpotify', () => ({
    useSpotify: () => spotifyReturn,
}));

vi.mock('./useLastFM', () => ({
    useLastFM: () => lastfmReturn,
}));

vi.mock('@/config/musicProvider', () => ({
    MUSIC_PROVIDER: 'spotify',
    MUSIC_PROVIDERS: {
        SPOTIFY: 'spotify',
        LASTFM: 'lastfm',
    },
}));

// Import após os mocks
const { useMusic } = await import('./useMusic');

describe('useMusic', () => {
    beforeEach(() => {
        spotifyReturn = { ...mockSpotifyData };
        lastfmReturn = { ...mockLastFMData };
    });

    it('seleciona spotify quando preferido e com dados', async () => {
        const { result } = renderHook(() => useMusic());

        await waitFor(() => {
            expect(result.current.provider).toBe('spotify');
        });

        expect(result.current.currentTrack?.name).toBe('Spotify Track');
    });

    it('fallback para lastfm quando spotify falha', async () => {
        spotifyReturn = { ...mockEmptyData };

        const { result } = renderHook(() => useMusic());

        await waitFor(() => {
            expect(result.current.provider).toBe('lastfm');
        });

        expect(result.current.currentTrack?.name).toBe('LastFM Track');
    });

    it('fallback para spotify quando lastfm falha', async () => {
        lastfmReturn = { ...mockEmptyData };

        const { result } = renderHook(() => useMusic());

        await waitFor(() => {
            expect(result.current.provider).toBe('spotify');
        });

        expect(result.current.currentTrack?.name).toBe('Spotify Track');
    });

    it('retorna null quando ambos falham', async () => {
        spotifyReturn = { ...mockEmptyData };
        lastfmReturn = { ...mockEmptyData };

        const { result } = renderHook(() => useMusic());

        await waitFor(() => {
            expect(result.current.provider).toBeNull();
        });

        expect(result.current.currentTrack).toBeNull();
        expect(result.current.error).toBeTruthy();
    });

    it('override manual com manualProvider', async () => {
        const { result } = renderHook(() => useMusic('lastfm'));

        await waitFor(() => {
            expect(result.current.provider).toBe('lastfm');
        });
    });

    it('switchProvider troca provider ativo', async () => {
        const { result } = renderHook(() => useMusic());

        await waitFor(() => {
            expect(result.current.provider).toBe('spotify');
        });

        act(() => {
            result.current.switchProvider('lastfm');
        });

        expect(result.current.provider).toBe('lastfm');
        expect(result.current.currentTrack?.name).toBe('LastFM Track');
    });

    it('availableProviders lista providers com dados', async () => {
        const { result } = renderHook(() => useMusic());

        await waitFor(() => {
            expect(result.current.availableProviders).toContain('spotify');
            expect(result.current.availableProviders).toContain('lastfm');
        });
    });

    it('availableProviders não inclui provider sem dados', async () => {
        spotifyReturn = { ...mockEmptyData };

        const { result } = renderHook(() => useMusic());

        await waitFor(() => {
            expect(result.current.availableProviders).not.toContain('spotify');
            expect(result.current.availableProviders).toContain('lastfm');
        });
    });
});
