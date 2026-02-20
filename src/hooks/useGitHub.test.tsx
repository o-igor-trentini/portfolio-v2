import { renderHook, waitFor } from '@testing-library/react';
import { useGitHub } from './useGitHub';

const mockRepos = [
    {
        name: 'repo-alpha',
        description: 'Descrição alpha',
        stargazers_count: 50,
        language: 'Go',
        html_url: 'https://github.com/user/repo-alpha',
    },
    {
        name: 'repo-beta',
        description: 'Descrição beta',
        stargazers_count: 30,
        language: 'TypeScript',
        html_url: 'https://github.com/user/repo-beta',
    },
    {
        name: 'repo-gamma',
        description: 'Descrição gamma',
        stargazers_count: 20,
        language: 'Go',
        html_url: 'https://github.com/user/repo-gamma',
    },
    {
        name: 'repo-delta',
        description: 'Descrição delta',
        stargazers_count: 10,
        language: 'JavaScript',
        html_url: 'https://github.com/user/repo-delta',
    },
    {
        name: 'repo-fork',
        description: 'Um fork',
        stargazers_count: 100,
        language: 'Python',
        html_url: 'https://github.com/user/repo-fork',
    },
    {
        name: 'repo-no-lang',
        description: null,
        stargazers_count: 5,
        language: null,
        html_url: 'https://github.com/user/repo-no-lang',
    },
];

/** Cria mock de Response REST com headers de rate limit */
const mockRestResponse = (body: unknown, ok = true, status = 200, rateLimitRemaining = '60') =>
    ({
        ok,
        status,
        json: async () => body,
        headers: new Headers({
            'X-RateLimit-Remaining': rateLimitRemaining,
            'X-RateLimit-Reset': '9999999999',
        }),
    }) as unknown as Response;

/** Dados GraphQL de contribuições para testes */
const mockGraphQLContributions = {
    data: {
        user: {
            contributionsCollection: {
                contributionCalendar: {
                    weeks: Array.from({ length: 52 }, (_, weekIdx) => ({
                        contributionDays: Array.from({ length: 7 }, (_, dayIdx) => ({
                            contributionCount: (weekIdx + dayIdx) % 10,
                            date: '2025-01-01',
                        })),
                    })),
                },
            },
        },
    },
};

/** Helper: mock fetch diferenciando repos vs contributions via URL */
const mockFetchForBoth = (
    restBody: unknown = mockRepos,
    restOk = true,
    restStatus = 200,
    rateLimitRemaining = '60',
    graphqlBody: unknown = mockGraphQLContributions,
    graphqlOk = true,
) => {
    vi.spyOn(globalThis, 'fetch').mockImplementation(async (input: RequestInfo | URL) => {
        const url = typeof input === 'string' ? input : input.toString();

        if (url.includes('type=contributions')) {
            return {
                ok: graphqlOk,
                json: async () => graphqlBody,
                headers: new Headers(),
            } as unknown as Response;
        }

        // Repos endpoint via BFF
        return mockRestResponse(restBody, restOk, restStatus, rateLimitRemaining);
    });
};

describe('useGitHub', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
        sessionStorage.clear();
    });

    it('inicia em loading', () => {
        vi.spyOn(globalThis, 'fetch').mockImplementation(
            () => new Promise(() => {}), // Nunca resolve
        );

        const { result } = renderHook(() => useGitHub());
        expect(result.current.isLoading).toBe(true);
        expect(result.current.stats).toBeNull();
        expect(result.current.error).toBeNull();
    });

    it('calcula totalStars corretamente', async () => {
        mockFetchForBoth();

        const { result } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        // 50 + 30 + 20 + 10 + 100 + 5 = 215
        expect(result.current.stats?.totalStars).toBe(215);
    });

    it('calcula totalRepos corretamente', async () => {
        mockFetchForBoth();

        const { result } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.stats?.totalRepos).toBe(6);
    });

    it('calcula topRepos — top 3, filtra nomes com "fork"', async () => {
        mockFetchForBoth();

        const { result } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        const topRepos = result.current.stats?.topRepos;
        expect(topRepos).toHaveLength(3);
        expect(topRepos?.[0].name).toBe('repo-alpha');
        expect(topRepos?.[0].stars).toBe(50);
        expect(topRepos?.[1].name).toBe('repo-beta');
        expect(topRepos?.[2].name).toBe('repo-gamma');
        // Garante que o fork não está nos topRepos
        expect(topRepos?.find((r) => r.name === 'repo-fork')).toBeUndefined();
    });

    it('calcula languages — top 4 com percentuais', async () => {
        mockFetchForBoth();

        const { result } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        const languages = result.current.stats?.languages;
        expect(languages).toBeDefined();
        expect(languages!.length).toBeLessThanOrEqual(4);

        // Go aparece 2x, TypeScript 1x, JavaScript 1x, Python 1x, Other(null) 1x
        const goLang = languages?.find((l) => l.name === 'Go');
        expect(goLang).toBeDefined();
        expect(goLang!.percentage).toBeGreaterThan(0);
    });

    it('mapeia cores de linguagens conhecidas', async () => {
        mockFetchForBoth();

        const { result } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        const goLang = result.current.stats?.languages?.find((l) => l.name === 'Go');
        expect(goLang?.color).toContain('cyan');
    });

    it('mapeia cores de linguagens desconhecidas para "Other"', async () => {
        const reposWithUnknown = [
            {
                name: 'repo-x',
                description: '',
                stargazers_count: 1,
                language: 'Zig',
                html_url: '#',
            },
        ];

        mockFetchForBoth(reposWithUnknown);

        const { result } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        const zigLang = result.current.stats?.languages?.find((l) => l.name === 'Zig');
        expect(zigLang?.color).toContain('zinc');
    });

    it('contributionData retorna dados do BFF', async () => {
        mockFetchForBoth();

        const { result } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        // BFF retorna contribuições (52 semanas x 7 dias)
        const data = result.current.stats?.contributionData;
        expect(data).toHaveLength(52);
        expect(data?.[0]).toHaveLength(7);
    });

    it('contributionData vazio quando BFF retorna data: null', async () => {
        mockFetchForBoth(mockRepos, true, 200, '60', { data: null }, true);

        const { result } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.stats?.contributionData).toHaveLength(0);
    });

    it('stats é null quando API falha sem cache', async () => {
        mockFetchForBoth(null, false, 500);

        const { result } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.error).toBeTruthy();
        expect(result.current.stats).toBeNull();
    });

    it('rate limit com cache disponível → isRateLimited: true + dados do cache', async () => {
        // Primeiro fetch: preenche cache
        mockFetchForBoth();
        const { result: firstResult } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(firstResult.current.isLoading).toBe(false);
        });

        vi.restoreAllMocks();

        // Segundo fetch: rate limited (429)
        mockFetchForBoth(null, true, 429, '0');
        const { result } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(result.current.isRateLimited).toBe(true);
        });

        expect(result.current.isLoading).toBe(false);
        expect(result.current.stats).not.toBeNull();
        // Deve usar dados do cache (totalStars = 215 do primeiro fetch)
        expect(result.current.stats?.totalStars).toBe(215);
    });

    it('rate limit sem cache → stats null', async () => {
        mockFetchForBoth(null, true, 429, '0');

        const { result } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.isRateLimited).toBe(true);
        expect(result.current.stats).toBeNull();
        expect(result.current.error).toBe('Rate limited');
    });

    it('cache é usado imediatamente no mount', async () => {
        // Primeiro fetch: preenche cache
        mockFetchForBoth();
        const { result: firstResult } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(firstResult.current.isLoading).toBe(false);
        });

        vi.restoreAllMocks();

        // Segundo hook: deve exibir dados do cache imediatamente (isLoading = false)
        mockFetchForBoth();
        const { result } = renderHook(() => useGitHub());

        // Com cache, stats é exibido imediatamente
        expect(result.current.stats).not.toBeNull();
        expect(result.current.stats?.totalStars).toBe(215);
    });

    it('sai de loading em ambos cenários', async () => {
        // Cenário sucesso
        mockFetchForBoth();

        const { result: successResult } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(successResult.current.isLoading).toBe(false);
        });

        vi.restoreAllMocks();

        // Cenário erro
        vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

        const { result: errorResult } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(errorResult.current.isLoading).toBe(false);
        });
    });

    it('retorna isUsingCache: false após fetch bem-sucedido', async () => {
        mockFetchForBoth();

        const { result } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.isUsingCache).toBe(false);
    });
});
