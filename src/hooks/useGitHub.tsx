import { useState, useEffect } from 'react';

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
}

const GITHUB_USERNAME = 'o-igor-trentini';

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

export const useGitHub = (): GitHubData => {
    const [stats, setStats] = useState<GitHubStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                // Fetch user's repositories
                const reposResponse = await fetch(
                    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=stars&per_page=100`,
                );

                if (!reposResponse.ok) {
                    throw new Error('Failed to fetch GitHub data');
                }

                const repos: GitHubRepo[] = await reposResponse.json();

                // Calculate total stars
                const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

                // Get top 3 repositories by stars
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

                // Calculate language statistics
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
                    .slice(0, 4); // Top 4 languages

                // Generate mock contribution data (real implementation would need GitHub GraphQL API)
                // 52 weeks x 7 days to show a full year
                const contributionData = Array.from({ length: 52 }, () =>
                    Array.from({ length: 7 }, () => Math.floor(Math.random() * 5)),
                );

                setStats({
                    totalStars,
                    totalRepos: repos.length,
                    topRepos,
                    languages,
                    contributionData,
                });
            } catch (err) {
                console.error('Error fetching GitHub data:', err);
                setError(err instanceof Error ? err.message : 'Unknown error');

                // Set fallback mock data
                setStats({
                    totalStars: 579,
                    totalRepos: 42,
                    topRepos: [
                        {
                            name: 'realtime-chat',
                            stars: 234,
                            language: 'Go',
                            url: '#',
                            description: 'Real-time chat system',
                        },
                        {
                            name: 'analytics-dashboard',
                            stars: 189,
                            language: 'TypeScript',
                            url: '#',
                            description: 'Analytics dashboard',
                        },
                        {
                            name: 'task-automation',
                            stars: 156,
                            language: 'Go',
                            url: '#',
                            description: 'Task automation platform',
                        },
                    ],
                    languages: [
                        { name: 'Go', percentage: 45, color: languageColors.Go },
                        { name: 'TypeScript', percentage: 30, color: languageColors.TypeScript },
                        { name: 'JavaScript', percentage: 15, color: languageColors.JavaScript },
                        { name: 'Other', percentage: 10, color: languageColors.Other },
                    ],
                    contributionData: Array.from({ length: 52 }, () =>
                        Array.from({ length: 7 }, () => Math.floor(Math.random() * 5)),
                    ),
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchGitHubData();
    }, []);

    return { stats, isLoading, error };
};
