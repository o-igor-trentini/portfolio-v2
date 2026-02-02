import { useState, useEffect, lazy, Suspense, useCallback } from 'react';
import { CustomCursor } from './components/layout/CustomCursor';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Toaster } from './components/ui/sonner';
import type { Project } from './data/projects';
import { useThemeEffect } from './hooks/useTheme';

// Lazy load componentes pesados
const Terminal = lazy(() => import('./components/layout/Terminal'));
const Footer = lazy(() => import('./components/layout/Footer'));
const Projects = lazy(() => import('./components/sections/Projects'));
const ProjectDetail = lazy(() => import('./components/sections/Projects/components/ProjectDetail'));
const About = lazy(() => import('./components/sections/About'));
const TechStack = lazy(() => import('./components/sections/TechStack'));
const Experience = lazy(() => import('./components/sections/Experience'));
const Contact = lazy(() => import('./components/sections/Contact'));

export default function App() {
    useThemeEffect();
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);

    // Detect system theme preference on mount
    useEffect(() => {
        const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem('theme-storage')) {
                document.documentElement.classList.toggle('dark', e.matches);
            }
        };

        darkModeQuery.addEventListener('change', handleChange);
        return () => darkModeQuery.removeEventListener('change', handleChange);
    }, []);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (selectedProject || isTerminalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [selectedProject, isTerminalOpen]);

    const handleProjectClick = useCallback((project: Project) => {
        setSelectedProject(project);
    }, []);

    const handleCloseProject = useCallback(() => {
        setSelectedProject(null);
    }, []);

    const handleOpenTerminal = useCallback(() => {
        setIsTerminalOpen(true);
    }, []);

    const handleCloseTerminal = useCallback(() => {
        setIsTerminalOpen(false);
    }, []);

    return (
        <>
            <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors cursor-none">
                <CustomCursor />

                <Header onTerminalToggle={handleOpenTerminal} />

                <main>
                    <Hero />

                    <Suspense fallback={<div className="h-screen" />}>
                        <Projects onProjectClick={handleProjectClick} />

                        <About />

                        <TechStack />

                        <Experience />

                        <Contact />

                        <Footer />
                    </Suspense>
                </main>
            </div>

            <Suspense fallback={null}>
                <ProjectDetail project={selectedProject} onClose={handleCloseProject} />

                <Terminal isOpen={isTerminalOpen} onClose={handleCloseTerminal} />
            </Suspense>

            <Toaster position="bottom-right" />
        </>
    );
}
