import { ExternalLink, ChevronRight, Filter, Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, useMemo } from 'react';
import { OptimizedImage } from './common/OptimizedImage';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import { useI18n } from '../hooks/useLanguage';

interface ProjectsProps {
    onProjectClick: (project: Project) => void;
}

export const Projects = ({ onProjectClick }: ProjectsProps) => {
    const { t, language } = useI18n();
    const [selectedFilter, setSelectedFilter] = useState<'all' | 'professional' | 'study'>('all');

    const filteredProjects = useMemo(
        () => (selectedFilter === 'all' ? projects : projects.filter((project) => project.type === selectedFilter)),
        [selectedFilter],
    );

    return (
        <section id="projects" className="py-32 relative">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="mb-4">{t('projects.title')}</h2>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-8">{t('projects.subtitle')}</p>

                    {/* Filtros de Projeto */}
                    <div className="flex flex-wrap items-center justify-center gap-3 mb-4">
                        <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
                            <Filter className="w-4 h-4" />
                            {t('projects.tags.filterLabel')}:
                        </div>
                        <Button
                            variant={selectedFilter === 'all' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedFilter('all')}
                            className={selectedFilter === 'all' ? 'bg-purple-500 hover:bg-purple-600' : ''}
                        >
                            {t('projects.tags.all')}
                        </Button>
                        <Button
                            variant={selectedFilter === 'professional' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedFilter('professional')}
                            className={selectedFilter === 'professional' ? 'bg-purple-500 hover:bg-purple-600' : ''}
                        >
                            <Briefcase className="w-4 h-4 mr-2" />
                            {t('projects.tags.professional')}
                        </Button>
                        <Button
                            variant={selectedFilter === 'study' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setSelectedFilter('study')}
                            className={selectedFilter === 'study' ? 'bg-purple-500 hover:bg-purple-600' : ''}
                        >
                            <GraduationCap className="w-4 h-4 mr-2" />
                            {t('projects.tags.study')}
                        </Button>
                    </div>

                    {/* Contador de Projetos */}
                    <motion.p
                        key={selectedFilter}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-sm text-zinc-500 dark:text-zinc-400"
                    >
                        {filteredProjects.length}{' '}
                        {filteredProjects.length === 1 ? t('projects.projectCount') : t('projects.projectsCount')}
                    </motion.p>
                </motion.div>

                <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                            style={{ willChange: 'transform' }}
                            className="group"
                        >
                            <div className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 hover:border-purple-500/50 transition-all duration-300 h-full flex flex-col">
                                <div className="relative aspect-video overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                                    <OptimizedImage
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        size="medium"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                    {/* Badge de Tipo */}
                                    <div className="absolute top-3 right-3">
                                        {project.type === 'professional' ? (
                                            <div className="flex items-center gap-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm">
                                                <Briefcase className="w-3 h-3" />
                                                {t('projects.tags.professional')}
                                            </div>
                                        ) : (
                                            <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm">
                                                <GraduationCap className="w-3 h-3" />
                                                {t('projects.tags.study')}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="mb-3">{project.title}</h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 mb-4 flex-1">
                                        {project.description[language]}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tags.slice(0, 3).map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="bg-purple-500/10 text-purple-500 hover:bg-purple-500/20"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                        {project.tags.length > 3 && (
                                            <Badge variant="secondary">+{project.tags.length - 3}</Badge>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            onClick={() => onProjectClick(project)}
                                            variant="ghost"
                                            className="flex-1 group/btn"
                                        >
                                            {t('projects.card.viewMore')}
                                            <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                                        </Button>
                                        {project.github && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => window.open(project.github, '_blank')}
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};
