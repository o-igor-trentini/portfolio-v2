import { ArrowLeft, ExternalLink, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState, type FC, type ReactElement } from 'react';
import type { Project } from '../projects';
import { useI18n } from '../../../../hooks/useLanguage';
import { OptimizedImage } from '../../../common/OptimizedImage';
import { Badge } from '../../../ui/badge';
import { Button } from '../../../ui/button';

interface ProjectDetailProps {
    project: Project | null;
    onClose: () => void;
}

const ProjectDetail: FC<ProjectDetailProps> = ({ project, onClose }): ReactElement => {
    const { t } = useI18n();
    const [viewMode, setViewMode] = useState<'technical' | 'simple'>('technical');

    return (
        <AnimatePresence>
            {project && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm overflow-y-auto"
                    onClick={onClose}
                >
                    <div className="min-h-screen py-8 px-4">
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="max-w-5xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl"
                        >
                            {/* Header */}
                            <div className="relative">
                                <div className="aspect-video bg-zinc-100 dark:bg-zinc-800 relative">
                                    <OptimizedImage
                                        src={project.image}
                                        alt={project.id}
                                        className="w-full h-full object-cover"
                                        size="large"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                        <h2 className="mb-2 text-white">{t(`projects.items.${project.id}.title`)}</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {project.tags.map((tag) => (
                                                <Badge
                                                    key={tag}
                                                    className="bg-white/20 text-white backdrop-blur-sm border-white/30"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={onClose}
                                    className="absolute top-4 right-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white"
                                >
                                    <X className="w-5 h-5" />
                                </Button>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {/* Toggle View Mode */}
                                <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-200 dark:border-zinc-800">
                                    <Button variant="ghost" onClick={onClose} className="gap-2">
                                        <ArrowLeft className="w-4 h-4" />
                                        {t('projects.detail.backToProjects')}
                                    </Button>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant={viewMode === 'simple' ? 'default' : 'outline'}
                                            onClick={() => setViewMode('simple')}
                                            size="sm"
                                            className={viewMode === 'simple' ? 'bg-purple-500 hover:bg-purple-600' : ''}
                                        >
                                            {t('projects.detail.simpleView')}
                                        </Button>
                                        <Button
                                            variant={viewMode === 'technical' ? 'default' : 'outline'}
                                            onClick={() => setViewMode('technical')}
                                            size="sm"
                                            className={
                                                viewMode === 'technical' ? 'bg-purple-500 hover:bg-purple-600' : ''
                                            }
                                        >
                                            {t('projects.detail.technicalView')}
                                        </Button>
                                    </div>
                                </div>

                                <AnimatePresence mode="wait">
                                    {viewMode === 'simple' ? (
                                        <motion.div
                                            key="simple"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                        >
                                            <div className="prose dark:prose-invert max-w-none">
                                                <p className="text-zinc-600 dark:text-zinc-400">
                                                    {t(`projects.items.${project.id}.descriptionSimple`)}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="technical"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            className="space-y-8"
                                        >
                                            {/* Problem */}
                                            <div>
                                                <h3 className="mb-3 text-purple-500">{t('projects.detail.problem')}</h3>
                                                <p className="text-zinc-600 dark:text-zinc-400">
                                                    {t(`projects.items.${project.id}.problem`)}
                                                </p>
                                            </div>

                                            {/* Solution */}
                                            <div>
                                                <h3 className="mb-3 text-purple-500">
                                                    {t('projects.detail.solution')}
                                                </h3>
                                                <p className="text-zinc-600 dark:text-zinc-400">
                                                    {t(`projects.items.${project.id}.solution`)}
                                                </p>
                                            </div>

                                            {/* Tech Stack */}
                                            <div>
                                                <h3 className="mb-3 text-purple-500">{t('projects.detail.stack')}</h3>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.stack.map((tech) => (
                                                        <Badge
                                                            key={tech}
                                                            variant="outline"
                                                            className="border-purple-500/30"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Architecture */}
                                            <div>
                                                <h3 className="mb-3 text-purple-500">
                                                    {t('projects.detail.architecture')}
                                                </h3>
                                                <div className="bg-zinc-100 dark:bg-zinc-800 rounded-lg p-6">
                                                    <code className="text-sm text-zinc-600 dark:text-zinc-400 whitespace-pre-wrap">
                                                        {t(`projects.items.${project.id}.architecture`)}
                                                    </code>
                                                </div>
                                            </div>

                                            {/* Highlights */}
                                            <div>
                                                <h3 className="mb-3 text-purple-500">
                                                    {t('projects.detail.highlights')}
                                                </h3>
                                                <ul className="space-y-2">
                                                    {(
                                                        t(`projects.items.${project.id}.highlights`, {
                                                            returnObjects: true,
                                                        }) as string[]
                                                    ).map((highlight, index) => (
                                                        <li
                                                            key={index}
                                                            className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400"
                                                        >
                                                            <span className="text-purple-500 mt-1">→</span>
                                                            {highlight}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {/* Actions */}
                                {project.github && (
                                    <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
                                        <Button
                                            onClick={() => window.open(project.github, '_blank')}
                                            className="bg-purple-500 hover:bg-purple-600 text-white"
                                        >
                                            <ExternalLink className="mr-2 w-4 h-4" />
                                            {t('projects.detail.viewOnGithub')}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProjectDetail;
