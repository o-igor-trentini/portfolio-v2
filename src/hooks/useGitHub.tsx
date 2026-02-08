import { useState, useEffect } from 'react';
import { githubCache } from '@/lib/cache';

interface GitHubRepo {
    name: string;
    description: string;
    stargazers_count: number;
    language: string;
    html_url: string;
}

interface GitHubStats {
    totalStars: number;
    totalRepos: number;
    topRepos: {
        name: string;
        stars: number;
        language: string;
        url: string;
        description: string;
    }[];
    languages: {
        name: string;
        percentage: number;
        color: string;
    }[];
    contributionData: number[][];
}

interface GitHubData {
    stats: GitHubStats | null;
    isLoading: boolean;
    error: string | null;
    isRateLimited: boolean;
    rateLimitReset: number | null;
    isUsingCache: boolean;
}

const GITHUB_USERNAME = 'o-igor-trentini';
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || '';
const CACHE_KEY = 'stats';
const CACHE_TTL = 60 * 60 * 1000; // 1 hora

// Language colors based on GitHub's official colors
const languageColors: Record<string, string> = {
    Go: 'from-cyan-500 to-blue-500',
    TypeScript: 'from-blue-500 to-indigo-500',
    JavaScript: 'from-yellow-400 to-orange-500',
    Python: 'from-blue-400 to-yellow-500',
    Java: 'from-red-500 to-orange-600',
    Rust: 'from-orange-500 to-red-600',
    'C++': 'from-pink-500 to-purple-500',
    C: 'from-gray-500 to-gray-700',
    HTML: 'from-orange-400 to-red-500',
    CSS: 'from-blue-400 to-purple-500',
    Shell: 'from-green-500 to-emerald-600',
    Ruby: 'from-red-600 to-red-800',
    PHP: 'from-purple-400 to-indigo-500',
    Other: 'from-zinc-400 to-zinc-500',
};

const GRAPHQL_QUERY = `
query($username: String!) {
    user(login: $username) {
        contributionsCollection {
            contributionCalendar {
                weeks {
                    contributionDays {
                        contributionCount
                        date
                    }
                }
            }
        }
    }
}`;

/** Converte contributionCount para escala 0-4 */
const toLevel = (count: number): number => {
    if (count === 0) return 0;
    if (count <= 3) return 1;
    if (count <= 6) return 2;
    if (count <= 9) return 3;
    return 4;
};

/** Busca contribuições reais via GraphQL (requer token) */
const fetchContributions = async (): Promise<number[][] | null> => {
    if (!GITHUB_TOKEN) return null;

    const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${GITHUB_TOKEN}`,
        },
        body: JSON.stringify({
            query: GRAPHQL_QUERY,
            variables: { username: GITHUB_USERNAME },
        }),
    });

    if (!response.ok) return null;

    const json = await response.json();
    const weeks = json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks;

    if (!Array.isArray(weeks)) return null;

    // Garante exatamente 52 semanas com 7 dias cada
    const data: number[][] = weeks
        .slice(-52)
        .map((week: { contributionDays: { contributionCount: number }[] }) =>
            week.contributionDays.map((day: { contributionCount: number }) => toLevel(day.contributionCount)),
        );

    // Preenche semanas faltantes no início (se houver menos de 52)
    while (data.length < 52) {
        data.unshift(Array.from({ length: 7 }, () => 0));
    }

    // Garante que cada semana tem exatamente 7 dias
    return data.map((week) => {
        while (week.length < 7) week.push(0);
        return week.slice(0, 7);
    });
};

/** Gera contribuições aleatórias como fallback */
const generateMockContributions = (): number[][] =>
    Array.from({ length: 52 }, () => Array.from({ length: 7 }, () => Math.floor(Math.random() * 5)));

/** Lê rate limit dos headers */
const parseRateLimit = (response: Response) => ({
    remaining: parseInt(response.headers.get('X-RateLimit-Remaining') || '60', 10),
    reset: parseInt(response.headers.get('X-RateLimit-Reset') || '0', 10),
});

const FALLBACK_STATS: GitHubStats = {
    totalStars: 579,
    totalRepos: 42,
    topRepos: [
        { name: 'realtime-chat', stars: 234, language: 'Go', url: '#', description: 'Real-time chat system' },
        {
            name: 'analytics-dashboard',
            stars: 189,
            language: 'TypeScript',
            url: '#',
            description: 'Analytics dashboard',
        },
        { name: 'task-automation', stars: 156, language: 'Go', url: '#', description: 'Task automation platform' },
    ],
    languages: [
        { name: 'Go', percentage: 45, color: languageColors.Go },
        { name: 'TypeScript', percentage: 30, color: languageColors.TypeScript },
        { name: 'JavaScript', percentage: 15, color: languageColors.JavaScript },
        { name: 'Other', percentage: 10, color: languageColors.Other },
    ],
    contributionData: generateMockContributions(),
};

export const useGitHub = (): GitHubData => {
    const [stats, setStats] = useState<GitHubStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isRateLimited, setIsRateLimited] = useState(false);
    const [rateLimitReset, setRateLimitReset] = useState<number | null>(null);
    const [isUsingCache, setIsUsingCache] = useState(false);

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Verificar cache — exibir imediatamente se disponível
                const cached = githubCache.get<GitHubStats>(CACHE_KEY);
                if (cached) {
                    setStats(cached);
                    setIsUsingCache(true);
                    setIsLoading(false);
                }

                // Buscar dados atualizados em paralelo (REST + GraphQL)
                const headers: HeadersInit = {};
                if (GITHUB_TOKEN) {
                    headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
                }

                const [reposResult, contribResult] = await Promise.allSettled([
                    fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=100`, { headers }),
                    fetchContributions(),
                ]);

                // Verificar rate limit na resposta REST
                if (reposResult.status === 'fulfilled') {
                    const reposResponse = reposResult.value;
                    const rateLimit = parseRateLimit(reposResponse);

                    if (reposResponse.status === 429 || rateLimit.remaining === 0) {
                        setIsRateLimited(true);
                        setRateLimitReset(rateLimit.reset);

                        // Usar cache se disponível, senão fallback
                        if (cached) {
                            setStats(cached);
                            setIsUsingCache(true);
                        } else {
                            setStats(FALLBACK_STATS);
                            setError('Rate limited');
                        }

                        setIsLoading(false);
                        return;
                    }

                    if (!reposResponse.ok) {
                        throw new Error('Failed to fetch GitHub data');
                    }

                    const repos: GitHubRepo[] = await reposResponse.json();

                    const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

                    const topRepos = repos
                        .filter((repo) => !repo.name.includes('fork'))
                        .sort((a, b) => b.stargazers_count - a.stargazers_count)
                        .slice(0, 3)
                        .map((repo) => ({
                            name: repo.name,
                            stars: repo.stargazers_count,
                            language: repo.language || 'Other',
                            url: repo.html_url,
                            description: repo.description || '',
                        }));

                    const languageCount: Record<string, number> = {};
                    repos.forEach((repo) => {
                        const lang = repo.language || 'Other';
                        languageCount[lang] = (languageCount[lang] || 0) + 1;
                    });

                    const totalReposWithLanguage = Object.values(languageCount).reduce((sum, count) => sum + count, 0);

                    const languages = Object.entries(languageCount)
                        .map(([name, count]) => ({
                            name,
                            percentage: Math.round((count / totalReposWithLanguage) * 100),
                            color: languageColors[name] || languageColors.Other,
                        }))
                        .sort((a, b) => b.percentage - a.percentage)
                        .slice(0, 4);

                    // Contribuições: reais ou mock
                    const contributionData =
                        (contribResult.status === 'fulfilled' ? contribResult.value : null) ||
                        generateMockContributions();

                    const newStats: GitHubStats = {
                        totalStars,
                        totalRepos: repos.length,
                        topRepos,
                        languages,
                        contributionData,
                    };

                    setStats(newStats);
                    setIsRateLimited(false);
                    setIsUsingCache(false);
                    githubCache.set(CACHE_KEY, newStats, CACHE_TTL);
                } else {
                    throw reposResult.reason;
                }
            } catch (err) {
                console.error('Error fetching GitHub data:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');

                // Usar cache se disponível, senão fallback
                const cached = githubCache.get<GitHubStats>(CACHE_KEY);
                if (cached) {
                    setStats(cached);
                    setIsUsingCache(true);
                } else {
                    setStats(FALLBACK_STATS);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchGitHubData();
    }, []);

    return { stats, isLoading, error, isRateLimited, rateLimitReset, isUsingCache };
};
