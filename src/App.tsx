import { useState, useEffect } from 'react';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { CustomCursor } from './components/CustomCursor';
import { Experience } from './components/Experience';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectDetail } from './components/ProjectDetail';
import { Projects } from './components/Projects';
import { TechStack } from './components/TechStack';
import { Terminal } from './components/Terminal';
import { Toaster } from './components/ui/sonner';
import type { Project } from './data/projects';
import { useThemeEffect } from './hooks/useTheme';

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

    return (
        <>
            <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors cursor-none">
                <CustomCursor />
                <Header onTerminalToggle={() => setIsTerminalOpen(true)} />

                <main>
                    <Hero />
                    <Projects onProjectClick={setSelectedProject} />
                    <About />
                    <TechStack />
                    <Experience />
                    <Contact />
                </main>

                <Footer />
            </div>

            <ProjectDetail project={selectedProject} onClose={() => setSelectedProject(null)} />

            <Terminal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

            <Toaster position="bottom-right" />
        </>
    );
}
