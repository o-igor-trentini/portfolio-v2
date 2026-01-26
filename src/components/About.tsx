import { Coffee, Dumbbell, Tv, Film, Clapperboard } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useMemo } from 'react';
import { AboutDetailModal } from './AboutDetailModal';
import { aboutInterests } from '../data/aboutData';
import { useI18n } from '../hooks/useLanguage';

export const About = () => {
    const { t } = useI18n();
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);
    const [selectedInterest, setSelectedInterest] = useState<string | null>(null);

    const iconMap = useMemo(
        () => ({
            coffee: Coffee,
            sports: Dumbbell,
            anime: Tv,
            series: Clapperboard,
            movies: Film,
        }),
        [],
    );

    const colorMap = useMemo(
        () => ({
            coffee: 'from-amber-500 to-orange-500',
            sports: 'from-green-500 to-emerald-500',
            anime: 'from-blue-500 to-cyan-500',
            series: 'from-purple-500 to-pink-500',
            movies: 'from-red-500 to-rose-500',
        }),
        [],
    );

    return (
        <section id="about" className="py-32 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="mb-4">{t('about.title')}</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">{t('about.subtitle')}</p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {aboutInterests.map((interest, index) => {
                        const Icon = iconMap[interest.id as keyof typeof iconMap];
                        const color = colorMap[interest.id as keyof typeof colorMap];
                        return (
                            <motion.div
                                key={interest.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                onMouseEnter={() => setHoveredCard(interest.id)}
                                onMouseLeave={() => setHoveredCard(null)}
                                onClick={() => setSelectedInterest(interest.id)}
                                className="group perspective-1000 cursor-pointer"
                            >
                                <motion.div
                                    whileHover={{ rotateY: 5, rotateX: 5, scale: 1.05 }}
                                    transition={{ type: 'spring', stiffness: 300 }}
                                    style={{ willChange: 'transform' }}
                                    className="relative h-64 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-lg hover:shadow-2xl transition-shadow preserve-3d"
                                >
                                    {/* Gradient Background */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                                    />

                                    {/* Content */}
                                    <div className="relative h-full p-6 flex flex-col items-center justify-center text-center">
                                        <motion.div
                                            animate={{
                                                scale: hoveredCard === interest.id ? 1.2 : 1,
                                                rotate: hoveredCard === interest.id ? 360 : 0,
                                            }}
                                            transition={{ duration: 0.6 }}
                                            className={`w-16 h-16 rounded-full bg-gradient-to-br ${color} flex items-center justify-center mb-4 shadow-lg`}
                                        >
                                            <Icon className="w-8 h-8 text-white" />
                                        </motion.div>

                                        <h3 className="mb-2">{t(`about.interests.${interest.id}.title`)}</h3>

                                        <motion.p
                                            initial={{ opacity: 0 }}
                                            animate={{
                                                opacity: hoveredCard === interest.id ? 1 : 0.6,
                                            }}
                                            className="text-zinc-600 dark:text-zinc-400"
                                        >
                                            {t(`about.interests.${interest.id}.description`)}
                                        </motion.p>

                                        {/* Click to view more indicator */}
                                        <motion.div
                                            animate={{
                                                opacity: hoveredCard === interest.id ? 1 : 0,
                                                y: hoveredCard === interest.id ? 0 : 10,
                                            }}
                                            className="absolute bottom-6 text-sm text-purple-500"
                                        >
                                            Clique para ver mais →
                                        </motion.div>

                                        {/* Decorative dots */}
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1">
                                            {[...Array(3)].map((_, i) => (
                                                <motion.div
                                                    key={i}
                                                    animate={{
                                                        scale: hoveredCard === interest.id ? [1, 1.5, 1] : 1,
                                                    }}
                                                    transition={{
                                                        duration: 0.6,
                                                        delay: i * 0.1,
                                                        repeat: hoveredCard === interest.id ? Infinity : 0,
                                                    }}
                                                    className={`w-2 h-2 rounded-full bg-gradient-to-br ${color}`}
                                                />
                                            ))}
                                        </div>
                                    </div>

                                    {/* Shine effect */}
                                    <motion.div
                                        animate={{
                                            x: hoveredCard === interest.id ? ['-100%', '100%'] : '-100%',
                                        }}
                                        transition={{ duration: 0.8 }}
                                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                                    />
                                </motion.div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            <AboutDetailModal interestId={selectedInterest} onClose={() => setSelectedInterest(null)} />
        </section>
    );
};
