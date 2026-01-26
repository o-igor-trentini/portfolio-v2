import { Github, GitBranch, Star, Code } from 'lucide-react';
import { motion } from 'motion/react';
import { useI18n } from '../hooks/useLanguage';

export const GitHubWidget = () => {
    const { t } = useI18n();

    // Mock contribution data (7x7 grid for heatmap)
    const contributions = Array.from({ length: 7 }, () =>
        Array.from({ length: 7 }, () => Math.floor(Math.random() * 5)),
    );

    const languages = [
        { name: 'Go', percentage: 45, color: 'from-cyan-500 to-blue-500' },
        { name: 'TypeScript', percentage: 30, color: 'from-blue-500 to-indigo-500' },
        { name: 'JavaScript', percentage: 15, color: 'from-yellow-400 to-orange-500' },
        { name: 'Other', percentage: 10, color: 'from-zinc-400 to-zinc-500' },
    ];

    const topRepos = [
        { name: 'realtime-chat', stars: 234, language: 'Go' },
        { name: 'analytics-dashboard', stars: 189, language: 'TypeScript' },
        { name: 'task-automation', stars: 156, language: 'Go' },
    ];

    return (
        <div className="bg-gradient-to-br from-zinc-800/10 to-zinc-900/10 rounded-2xl p-6 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-zinc-900 dark:bg-white flex items-center justify-center">
                    <Github className="w-5 h-5 text-white dark:text-zinc-900" />
                </div>
                <h3>{t('github.title')}</h3>
            </div>

            {/* Contribution Heatmap */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-200 dark:border-zinc-800">
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">{t('github.contributions')}</p>
                <div className="flex gap-1">
                    {contributions.map((week, weekIndex) => (
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
            </div>

            {/* Top Languages */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                    <Code className="w-4 h-4 text-purple-500" />
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('github.topLanguages')}</p>
                </div>

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
                                    <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${lang.color}`} />
                                    <span className="text-sm">{lang.name}</span>
                                </div>
                                <span className="text-sm text-zinc-600 dark:text-zinc-400">{lang.percentage}%</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Repositories */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                    <GitBranch className="w-4 h-4 text-purple-500" />
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('github.topRepos')}</p>
                </div>
                <div className="space-y-2">
                    {topRepos.map((repo, index) => (
                        <motion.div
                            key={repo.name}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 4 }}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                    <GitBranch className="w-4 h-4 text-purple-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-medium">{repo.name}</p>
                                    <p className="text-xs text-zinc-500">{repo.language}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 text-yellow-500">
                                <Star className="w-3 h-3 fill-current" />
                                <span className="text-xs">{repo.stars}</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};
