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

const mockLoadingData: MockMusicData = {
    currentTrack: null,
    topArtist: null,
    recentTracks: [],
    isLoading: true,
    error: null,
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

    describe('cache', () => {
        it('seleciona provider com dados em cache mesmo durante loading', async () => {
            spotifyReturn = {
                currentTrack: { name: 'Cached Track', artist: 'Cached Artist' },
                topArtist: { name: 'Cached Artist' },
                recentTracks: [{ name: 'Cached Recent' }],
                isLoading: true,
                error: null,
            };
            lastfmReturn = { ...mockLoadingData };

            const { result } = renderHook(() => useMusic());

            await waitFor(() => {
                expect(result.current.provider).toBe('spotify');
            });

            expect(result.current.currentTrack?.name).toBe('Cached Track');
        });

        it('availableProviders inclui provider com cache durante loading', async () => {
            spotifyReturn = {
                ...mockSpotifyData,
                isLoading: true,
            };
            lastfmReturn = {
                ...mockLastFMData,
                isLoading: true,
            };

            const { result } = renderHook(() => useMusic());

            await waitFor(() => {
                expect(result.current.availableProviders).toContain('spotify');
                expect(result.current.availableProviders).toContain('lastfm');
            });
        });

        it('faz fallback para lastfm com cache quando spotify carrega sem dados', async () => {
            spotifyReturn = { ...mockLoadingData };
            lastfmReturn = {
                currentTrack: { name: 'LFM Cached', artist: 'LFM Artist' },
                topArtist: null,
                recentTracks: [],
                isLoading: true,
                error: null,
            };

            const { result } = renderHook(() => useMusic());

            await waitFor(() => {
                expect(result.current.provider).toBe('lastfm');
            });

            expect(result.current.currentTrack?.name).toBe('LFM Cached');
        });

        it('exibe skeleton quando ambos carregam sem cache', async () => {
            spotifyReturn = { ...mockLoadingData };
            lastfmReturn = { ...mockLoadingData };

            const { result } = renderHook(() => useMusic());

            expect(result.current.provider).toBeNull();
            expect(result.current.isLoading).toBe(true);
            expect(result.current.currentTrack).toBeNull();
            expect(result.current.error).toBeNull();
        });

        it('provider com apenas topArtist em cache é considerado disponível', async () => {
            spotifyReturn = {
                currentTrack: null,
                topArtist: { name: 'Cached Top Artist' },
                recentTracks: [],
                isLoading: true,
                error: null,
            };
            lastfmReturn = { ...mockLoadingData };

            const { result } = renderHook(() => useMusic());

            await waitFor(() => {
                expect(result.current.provider).toBe('spotify');
                expect(result.current.availableProviders).toContain('spotify');
            });
        });

        it('provider com apenas recentTracks em cache é considerado disponível', async () => {
            spotifyReturn = {
                currentTrack: null,
                topArtist: null,
                recentTracks: [{ name: 'Cached Recent' }],
                isLoading: true,
                error: null,
            };
            lastfmReturn = { ...mockLoadingData };

            const { result } = renderHook(() => useMusic());

            await waitFor(() => {
                expect(result.current.provider).toBe('spotify');
                expect(result.current.availableProviders).toContain('spotify');
            });
        });

        it('provider com erro não é considerado disponível mesmo com dados', async () => {
            spotifyReturn = {
                currentTrack: { name: 'Stale Track', artist: 'Artist' },
                topArtist: null,
                recentTracks: [],
                isLoading: false,
                error: 'Token expired',
            };
            lastfmReturn = { ...mockLastFMData };

            const { result } = renderHook(() => useMusic());

            await waitFor(() => {
                expect(result.current.availableProviders).not.toContain('spotify');
                expect(result.current.provider).toBe('lastfm');
            });
        });

        it('não define provider null enquanto algum ainda carrega sem dados', async () => {
            spotifyReturn = { ...mockLoadingData };
            lastfmReturn = { ...mockEmptyData };

            const { result } = renderHook(() => useMusic());

            // Spotify ainda carregando, não deve definir null prematuramente
            expect(result.current.provider).toBeNull();
            expect(result.current.isLoading).toBe(true);
            expect(result.current.error).toBeNull();
        });
    });
});
