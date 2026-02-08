import { useGitHub, useLanguage } from '@hooks';
import { Github, GitBranch, Star, Code, ExternalLink, AlertTriangle, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useRef, useState, type FC, type ReactElement } from 'react';
import { GitHubWidgetSkeleton } from './GitHubWidgetSkeleton';

export const GitHubWidget: FC = (): ReactElement => {
    const { t } = useLanguage();
    const { stats, isLoading, isRateLimited } = useGitHub();
    const containerRef = useRef<HTMLDivElement>(null);
    const [weeksToShow, setWeeksToShow] = useState(52);

    // Use real data or fallback to empty arrays
    const contributions = stats?.contributionData || [];
    const languages = stats?.languages || [];
    const topRepos = stats?.topRepos || [];

    // Calculate how many weeks can fit based on container width
    useEffect(() => {
        const calculateWeeks = () => {
            if (containerRef.current) {
                const containerWidth = containerRef.current.offsetWidth;
                // Each week column is ~16px (w-3 = 12px + gap-1 = 4px)
                const weekWidth = 16;
                const calculatedWeeks = Math.floor(containerWidth / weekWidth);
                setWeeksToShow(Math.max(1, Math.min(calculatedWeeks, 52))); // Min 1, Max 52 weeks
            }
        };

        // Use setTimeout to ensure the DOM is fully rendered
        const timeoutId = setTimeout(calculateWeeks, 0);
        window.addEventListener('resize', calculateWeeks);
        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', calculateWeeks);
        };
    }, [stats]);

    // Slice contributions to show only the calculated number of weeks
    const visibleContributions = contributions.slice(-weeksToShow);

    return (
        <div className="bg-gradient-to-br from-zinc-800/10 to-zinc-900/10 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center">
                    <Github className="w-5 h-5 text-white dark:text-zinc-900" />
                </div>
                <h3>{t('github.title')}</h3>
            </div>

            {/* Rate limit banner */}
            {isRateLimited && (
                <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                    <p className="text-xs text-yellow-700 dark:text-yellow-300">{t('github.rateLimited')}</p>
                </div>
            )}

            {isLoading && !stats ? (
                <GitHubWidgetSkeleton />
            ) : !stats ? (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                        <AlertCircle className="w-8 h-8 text-zinc-400 dark:text-zinc-500" />
                    </div>

                    <h4 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                        {t('github.errorTitle')}
                    </h4>

                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">{t('github.errorDescription')}</p>

                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-lg transition-colors text-sm"
                    >
                        <RefreshCw className="w-4 h-4" />
                        {t('github.retry')}
                    </button>
                </div>
            ) : (
                <>
                    {/* Stats Overview */}
                    {stats && (
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center gap-2 mb-1">
                                    <Star className="w-4 h-4 text-yellow-500" />

                                    <p className="text-xs text-zinc-600 dark:text-zinc-400">{t('github.totalStars')}</p>
                                </div>

                                <p className="text-2xl font-bold">{stats.totalStars}</p>
                            </div>

                            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                                <div className="flex items-center gap-2 mb-1">
                                    <GitBranch className="w-4 h-4 text-purple-500" />

                                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                                        {t('github.repositories')}
                                    </p>
                                </div>
                                <p className="text-2xl font-bold">{stats.totalRepos}</p>
                            </div>
                        </div>
                    )}

                    {/* Contribution Heatmap */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-200 dark:border-zinc-800">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">{t('github.contributions')}</p>

                        {contributions.length > 0 ? (
                            <div ref={containerRef} className="flex gap-1 overflow-hidden">
                                {visibleContributions.map((week, weekIndex) => (
                                    <div key={weekIndex} className="flex flex-col gap-1">
                                        {week.map((day, dayIndex) => (
                                            <motion.div
                                                key={`${weekIndex}-${dayIndex}`}
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ delay: (weekIndex * 7 + dayIndex) * 0.01 }}
                                                whileHover={{ scale: 1.2 }}
                                                className={`w-3 h-3 rounded-sm ${
                                                    day === 0
                                                        ? 'bg-zinc-200 dark:bg-zinc-800'
                                                        : day === 1
                                                          ? 'bg-green-200 dark:bg-green-900'
                                                          : day === 2
                                                            ? 'bg-green-300 dark:bg-green-700'
                                                            : day === 3
                                                              ? 'bg-green-400 dark:bg-green-600'
                                                              : 'bg-green-500 dark:bg-green-500'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="h-24 flex items-center justify-center text-zinc-400">
                                <p className="text-sm">{t('github.noContributions')}</p>
                            </div>
                        )}
                    </div>

                    {/* Top Languages */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-2 mb-3">
                            <Code className="w-4 h-4 text-purple-500" />

                            <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('github.topLanguages')}</p>
                        </div>

                        {languages.length > 0 ? (
                            <>
                                {/* Donut Chart */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative w-24 h-24">
                                        <svg className="w-24 h-24 -rotate-90">
                                            {languages.map((lang, index) => {
                                                const previousPercentage = languages
                                                    .slice(0, index)
                                                    .reduce((sum, l) => sum + l.percentage, 0);
                                                const circumference = 2 * Math.PI * 32;
                                                const strokeDasharray = `${(lang.percentage / 100) * circumference} ${circumference}`;
                                                const strokeDashoffset = -((previousPercentage / 100) * circumference);

                                                return (
                                                    <motion.circle
                                                        key={lang.name}
                                                        initial={{ pathLength: 0 }}
                                                        animate={{ pathLength: 1 }}
                                                        transition={{ duration: 1, delay: index * 0.2 }}
                                                        cx="48"
                                                        cy="48"
                                                        r="32"
                                                        fill="none"
                                                        strokeWidth="10"
                                                        className="stroke-current text-purple-500"
                                                        style={{
                                                            strokeDasharray,
                                                            strokeDashoffset,
                                                        }}
                                                    />
                                                );
                                            })}
                                        </svg>
                                    </div>

                                    <div className="flex-1 space-y-2">
                                        {languages.map((lang, index) => (
                                            <motion.div
                                                key={lang.name}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="flex items-center justify-between"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className={`w-3 h-3 rounded-full bg-gradient-to-br ${lang.color}`}
                                                    />

                                                    <span className="text-sm">{lang.name}</span>
                                                </div>

                                                <span className="text-sm text-zinc-600 dark:text-zinc-400">
                                                    {lang.percentage}%
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="h-24 flex items-center justify-center text-zinc-400">
                                <p className="text-sm">{t('github.noLanguages')}</p>
                            </div>
                        )}
                    </div>

                    {/* Top Repositories */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-center gap-2 mb-3">
                            <GitBranch className="w-4 h-4 text-purple-500" />
                            <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('github.topRepos')}</p>
                        </div>
                        {topRepos.length > 0 ? (
                            <div className="space-y-2">
                                {topRepos.map((repo, index) => (
                                    <motion.a
                                        key={repo.name}
                                        href={repo.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ x: 4 }}
                                        className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer group"
                                    >
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                                                <GitBranch className="w-4 h-4 text-purple-500" />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <p className="text-sm font-medium truncate">{repo.name}</p>

                                                    <ExternalLink className="w-3 h-3 text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                                </div>
                                                <p className="text-xs text-zinc-500">{repo.language}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1 text-yellow-500 flex-shrink-0 ml-2">
                                            <Star className="w-3 h-3 fill-current" />

                                            <span className="text-xs">{repo.stars}</span>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        ) : (
                            <div className="h-24 flex items-center justify-center text-zinc-400">
                                <p className="text-sm">{t('github.noRepos')}</p>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
