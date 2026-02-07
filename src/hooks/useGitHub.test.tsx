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

describe('useGitHub', () => {
    beforeEach(() => {
        vi.restoreAllMocks();
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
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => mockRepos,
        } as Response);

        const { result } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        // 50 + 30 + 20 + 10 + 100 + 5 = 215
        expect(result.current.stats?.totalStars).toBe(215);
    });

    it('calcula totalRepos corretamente', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => mockRepos,
        } as Response);

        const { result } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.stats?.totalRepos).toBe(6);
    });

    it('calcula topRepos — top 3, filtra nomes com "fork"', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => mockRepos,
        } as Response);

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
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => mockRepos,
        } as Response);

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
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => mockRepos,
        } as Response);

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

        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => reposWithUnknown,
        } as Response);

        const { result } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        const zigLang = result.current.stats?.languages?.find((l) => l.name === 'Zig');
        expect(zigLang?.color).toContain('zinc');
    });

    it('contributionData tem estrutura 52x7', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => mockRepos,
        } as Response);

        const { result } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        const data = result.current.stats?.contributionData;
        expect(data).toHaveLength(52);
        expect(data?.[0]).toHaveLength(7);
    });

    it('fallback com dados mock quando API falha', async () => {
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: false,
            status: 500,
        } as Response);

        const { result } = renderHook(() => useGitHub());

        await waitFor(() => {
            expect(result.current.isLoading).toBe(false);
        });

        expect(result.current.error).toBeTruthy();
        expect(result.current.stats).not.toBeNull();
        expect(result.current.stats?.totalStars).toBe(579);
        expect(result.current.stats?.totalRepos).toBe(42);
        expect(result.current.stats?.topRepos).toHaveLength(3);
        expect(result.current.stats?.languages).toHaveLength(4);
    });

    it('sai de loading em ambos cenários', async () => {
        // Cenário sucesso
        vi.spyOn(globalThis, 'fetch').mockResolvedValue({
            ok: true,
            json: async () => mockRepos,
        } as Response);

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
});
