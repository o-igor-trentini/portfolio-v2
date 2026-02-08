import { Clapperboard, Coffee, Dumbbell, Film, Sparkles, Tv, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, type FC, type ReactElement } from 'react';
import { useLanguage } from '../../../../hooks/useLanguage';
import { ImageGallery } from '../../../layout/ImageGallery';
import { Button } from '../../../ui/button';
import { aboutInterests } from '../content';

const iconMap = {
    coffee: Coffee,
    sports: Dumbbell,
    anime: Tv,
    series: Clapperboard,
    movies: Film,
};

const colorMap = {
    coffee: 'from-amber-500 to-orange-500',
    sports: 'from-green-500 to-emerald-500',
    anime: 'from-blue-500 to-cyan-500',
    series: 'from-purple-500 to-pink-500',
    movies: 'from-red-500 to-rose-500',
};

interface AboutDetailModalProps {
    interestId: string | null;
    onClose: () => void;
}

export const AboutDetailModal: FC<AboutDetailModalProps> = ({ interestId, onClose }): ReactElement => {
    const { t } = useLanguage();
    const interest = aboutInterests.find((i) => i.id === interestId);

    useEffect(() => {
        if (!interestId) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [interestId, onClose]);

    if (!interest) return <></>;

    const Icon = iconMap[interest.id as keyof typeof iconMap];
    const color = colorMap[interest.id as keyof typeof colorMap];

    // Get all translated content from i18n
    const title = t(`about.interests.${interest.id}.title`);
    const description = t(`about.interests.${interest.id}.description`);
    const intro = t(`about.interests.${interest.id}.intro`);
    const favoritesTitle = t(`about.interests.${interest.id}.favoritesTitle`);
    const favorites = t(`about.interests.${interest.id}.favorites`, { returnObjects: true }) as string[];
    const why = t(`about.interests.${interest.id}.why`);
    const funFact = t(`about.interests.${interest.id}.funFact`);

    return (
        <AnimatePresence>
            {interestId && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm overflow-y-auto"
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-label={title}
                >
                    <div className="min-h-screen py-8 px-4 flex items-center justify-center">
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-2xl w-full bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl"
                        >
                            {/* Header */}
                            <div className={`relative p-8 bg-gradient-to-br ${color}`}>
                                <div className="absolute inset-0 bg-black/20" />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onClose}
                                    className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white z-10"
                                    aria-label={t('accessibility.close')}
                                >
                                    <X className="w-5 h-5" />
                                </Button>

                                <div className="relative flex items-center gap-4 text-white">
                                    <motion.div
                                        initial={{ scale: 0, rotate: -180 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: 'spring', duration: 0.8 }}
                                        className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-2xl"
                                    >
                                        <Icon className="w-10 h-10" />
                                    </motion.div>
                                    <div>
                                        <motion.h2
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.2 }}
                                            className="mb-1 text-white"
                                        >
                                            {title}
                                        </motion.h2>
                                        <motion.p
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-white/90"
                                        >
                                            {description}
                                        </motion.p>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8 space-y-6">
                                {/* Intro */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">{intro}</p>
                                </motion.div>

                                {/* Favorites */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl p-6"
                                >
                                    <div className="flex items-center gap-2 mb-4">
                                        <div
                                            className={`w-8 h-8 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center`}
                                        >
                                            <Sparkles className="w-4 h-4 text-white" />
                                        </div>
                                        <h3>{favoritesTitle}</h3>
                                    </div>
                                    <ul className="space-y-3">
                                        {favorites.map((item, index) => (
                                            <motion.li
                                                key={index}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.6 + index * 0.1 }}
                                                className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400"
                                            >
                                                <span
                                                    className={`mt-1 w-2 h-2 rounded-full bg-gradient-to-br ${color} flex-shrink-0`}
                                                />
                                                <span>{item}</span>
                                            </motion.li>
                                        ))}
                                    </ul>
                                </motion.div>

                                {/* Why */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                    className="border-l-4 border-purple-500 pl-4"
                                >
                                    <p className="text-zinc-600 dark:text-zinc-400 italic">{why}</p>
                                </motion.div>

                                {/* Fun Fact */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className={`bg-gradient-to-br ${color} bg-opacity-10 rounded-2xl p-6 border-2 border-dashed`}
                                    style={{
                                        borderColor: `color-mix(in srgb, ${color.split(' ')[1]} 50%, transparent)`,
                                    }}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">💡</span>
                                        <div>
                                            <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                                                Fun Facts
                                            </p>
                                            <p className="text-sm text-zinc-600 dark:text-zinc-400">{funFact}</p>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Image Gallery */}
                                {interest.images && interest.images.length > 0 && (
                                    <ImageGallery images={interest.images} color={color} />
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-8 pb-8">
                                <Button
                                    onClick={onClose}
                                    className={`w-full bg-gradient-to-r ${color} text-white hover:opacity-90`}
                                    size="lg"
                                >
                                    Fechar
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
