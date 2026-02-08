import {
    Code2,
    Server,
    Boxes,
    Cloud,
    GitBranch,
    Sparkles,
    Monitor,
    Terminal as TerminalIcon,
    CheckCircle,
    Filter,
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useMemo, type FC, type ReactElement } from 'react';
import { BADGE_CONFIG } from './constants';
import { techStackCategories, type TechBadge } from './content';
import { useLanguage } from '../../../hooks/useLanguage';
import { Button } from '../../ui/button';

const iconMap: Record<string, any> = {
    Server,
    Code2,
    Cloud,
    GitBranch,
    Sparkles,
    Monitor,
    Terminal: TerminalIcon,
    CheckCircle,
    Boxes,
};

const TechStack: FC = (): ReactElement => {
    const { t } = useLanguage();
    const [selectedBadge, setSelectedBadge] = useState<TechBadge | 'all'>('all');

    const filterByBadge = useMemo(
        () => (items: any[]) => {
            if (selectedBadge === 'all') return items;
            return items.filter((item) => item.badges?.includes(selectedBadge));
        },
        [selectedBadge],
    );

    return (
        <section id="tech-stack" className="py-32">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="mb-4">{t('techStack.title')}</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-8">{t('techStack.subtitle')}</p>

                    {/* Badge Filters */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                            <Filter className="w-4 h-4" />
                            {t('techStack.filterLabel')}:
                        </div>
                        <Button
                            variant={selectedBadge === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedBadge('all')}
                            className={selectedBadge === 'all' ? 'bg-purple-500 hover:bg-purple-600' : ''}
                        >
                            {t('techStack.all')}
                        </Button>
                        {Object.entries(BADGE_CONFIG).map(([key, badge]) => (
                            <Button
                                key={key}
                                variant={selectedBadge === key ? 'default' : 'outline'}
                                size="sm"
                                onClick={() => setSelectedBadge(key as TechBadge)}
                                className={selectedBadge === key ? 'bg-purple-500 hover:bg-purple-600' : ''}
                            >
                                <span className="mr-1">{badge.icon}</span>
                                {t(`techStack.badges.${key}`)}
                            </Button>
                        ))}
                    </div>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    {techStackCategories.map((category, categoryIndex) => {
                        const CategoryIcon = iconMap[category.icon];
                        const filteredItems = filterByBadge(category.items);

                        if (filteredItems.length === 0) return null;

                        return (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: categoryIndex * 0.1 }}
                                className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-6"
                            >
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                        <CategoryIcon className="w-5 h-5 text-purple-500" />
                                    </div>
                                    <div>
                                        <h3>{t(`techStack.categories.${category.id}`)}</h3>
                                        <p className="text-xs text-zinc-500">
                                            {filteredItems.length}{' '}
                                            {filteredItems.length === 1 ? t('techStack.item') : t('techStack.items')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {filteredItems.map((tech, techIndex) => (
                                        <motion.div
                                            key={tech.name}
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: categoryIndex * 0.1 + techIndex * 0.02 }}
                                            whileHover={{ scale: 1.05 }}
                                            className="group relative"
                                        >
                                            <div className="relative bg-zinc-50 dark:bg-zinc-800 rounded-lg px-3 py-2 border border-zinc-200 dark:border-zinc-700 hover:border-purple-500/50 transition-all duration-300">
                                                {/* Gradient overlay on hover */}
                                                <div
                                                    className={`absolute inset-0 rounded-lg bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                                                />

                                                <div className="relative flex items-center gap-2">
                                                    <motion.div
                                                        whileHover={{ rotate: 360 }}
                                                        transition={{ duration: 0.6 }}
                                                        className={`w-6 h-6 rounded bg-gradient-to-br ${tech.color} flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300 flex-shrink-0`}
                                                    >
                                                        <div className="w-3 h-3 bg-white rounded-sm" />
                                                    </motion.div>
                                                    <span className="text-sm text-zinc-700 dark:text-zinc-300">
                                                        {tech.name}
                                                    </span>
                                                </div>

                                                {/* Badges */}
                                                {tech.badges && tech.badges.length > 0 && (
                                                    <div className="absolute -top-1 -right-1 flex gap-0.5">
                                                        {tech.badges.slice(0, 2).map((badgeKey: TechBadge) => {
                                                            const badge = BADGE_CONFIG[badgeKey];
                                                            return (
                                                                <motion.div
                                                                    key={badgeKey}
                                                                    initial={{ scale: 0 }}
                                                                    animate={{ scale: 1 }}
                                                                    transition={{
                                                                        delay:
                                                                            categoryIndex * 0.1 +
                                                                            techIndex * 0.02 +
                                                                            0.2,
                                                                    }}
                                                                    className={`w-5 h-5 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center text-[10px] shadow-lg`}
                                                                    title={t(`techStack.badges.${badgeKey}`)}
                                                                >
                                                                    {badge.icon}
                                                                </motion.div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default TechStack;
