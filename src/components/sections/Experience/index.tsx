import { Briefcase, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, type FC, type ReactElement } from 'react';
import { experiences } from './content';
import { useI18n } from '../../../hooks/useLanguage';
import { Button } from '../../ui/button';

const Experience: FC = (): ReactElement => {
    const { t } = useI18n();
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <section id="experience" className="py-32 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="mb-4">{t('experience.title')}</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">{t('experience.subtitle')}</p>
                </motion.div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical line */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 hidden md:block" />

                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative"
                            >
                                {/* Timeline dot */}
                                <div
                                    className={`absolute left-8 top-8 w-4 h-4 rounded-full ${
                                        exp.current
                                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse'
                                            : 'bg-purple-500'
                                    } border-4 border-white dark:border-zinc-900 shadow-lg shadow-purple-500/50 -translate-x-1/2 hidden md:block z-10`}
                                />

                                <div
                                    className={`md:ml-20 bg-white dark:bg-zinc-900 rounded-2xl border ${
                                        exp.current
                                            ? 'border-purple-500 shadow-xl shadow-purple-500/20'
                                            : 'border-zinc-200 dark:border-zinc-800'
                                    } overflow-hidden hover:border-purple-500/50 transition-all duration-300 ${
                                        exp.current ? 'ring-2 ring-purple-500/20' : ''
                                    }`}
                                >
                                    {/* Badge "Atual" para o trabalho atual */}
                                    {exp.current && (
                                        <div className="absolute top-0 right-0 z-10">
                                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1.5 rounded-bl-2xl text-xs font-medium shadow-lg flex items-center gap-1.5">
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: 'easeInOut',
                                                    }}
                                                    className="w-2 h-2 bg-white rounded-full"
                                                />
                                                {t('experience.present')}
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-6">
                                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                            <div>
                                                <h3 className="mb-1">{exp.company}</h3>
                                                <p className="text-purple-500 mb-2">
                                                    {t(`experience.items.${exp.id}.position`)}
                                                </p>
                                                <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        {t(`experience.items.${exp.id}.period`)}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4" />
                                                        {t(`experience.items.${exp.id}.location`)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                                <Briefcase className="w-6 h-6 text-purple-500" />
                                            </div>
                                        </div>

                                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                                            {t(`experience.items.${exp.id}.description`)}
                                        </p>

                                        {/* Tech stack */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {exp.tech.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-sm"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Expandable achievements */}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                                            className="gap-2"
                                        >
                                            {t('experience.viewDetails')}
                                            <motion.div
                                                animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ChevronDown className="w-4 h-4" />
                                            </motion.div>
                                        </Button>

                                        <motion.div
                                            initial={false}
                                            animate={{
                                                height: expandedId === exp.id ? 'auto' : 0,
                                                opacity: expandedId === exp.id ? 1 : 0,
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800">
                                                <ul className="space-y-2">
                                                    {(
                                                        t(`experience.items.${exp.id}.achievements`, {
                                                            returnObjects: true,
                                                        }) as string[]
                                                    ).map((achievement: string, i: number) => (
                                                        <motion.li
                                                            key={i}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.1 }}
                                                            className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400"
                                                        >
                                                            <span className="text-purple-500 mt-1">→</span>
                                                            {achievement}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
