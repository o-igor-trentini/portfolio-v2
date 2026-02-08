import { useLanguage, useTheme } from '@hooks';
import { useCallback, useEffect, useRef, useState, type FormEvent, type RefObject } from 'react';
import { SocialLinks } from '@/components/sections/Contact/constants';
import { experiences } from '@/components/sections/Experience/content';
import { projects } from '@/components/sections/Projects/projects';

interface CommandOutput {
    command: string;
    output: string;
}

interface UseTerminalReturn {
    history: CommandOutput[];
    input: string;
    setInput: (value: string) => void;
    inputRef: RefObject<HTMLInputElement | null>;
    historyEndRef: RefObject<HTMLDivElement | null>;
    handleSubmit: (e: FormEvent) => void;
    prompt: string;
}

export const useTerminal = (isOpen: boolean, onClose: () => void): UseTerminalReturn => {
    const { t } = useLanguage();
    const { theme, setTheme, toggleTheme } = useTheme();
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<CommandOutput[]>([
        { command: '', output: t('terminal.welcome') },
        { command: '', output: t('terminal.help') },
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const historyEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    useEffect(() => {
        historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const scrollToSectionAndClose = useCallback(
        (id: string) => {
            // Aguarda o usuário visualizar a resposta antes de fechar
            setTimeout(() => {
                onClose();
                setTimeout(() => {
                    const element = document.getElementById(id);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 300);
            }, 1500);
        },
        [onClose],
    );

    const executeCommand = useCallback(
        (cmd: string) => {
            const trimmedCmd = cmd.trim().toLowerCase();
            let output = '';

            switch (trimmedCmd) {
                case 'help':
                    output = t('terminal.help');
                    break;
                case 'about':
                    output = t('terminal.about');
                    break;
                case 'about --anime':
                case 'anime': {
                    const favorites = t('about.interests.anime.favorites', {
                        returnObjects: true,
                    }) as string[];
                    output = Array.isArray(favorites)
                        ? favorites.map((f) => `  • ${f}`).join('\n')
                        : t('about.interests.anime.description');
                    break;
                }
                case 'skills': {
                    const current = experiences.find((e) => e.current);
                    output = current ? current.tech.join(', ') : '';
                    break;
                }
                case 'projects': {
                    const list = projects
                        .map((p) => `  • ${t(`projects.items.${p.id}.title`)} [${p.tags.join(', ')}]`)
                        .join('\n');
                    output = `${t('projects.title')} (${projects.length}):\n${list}`;
                    setHistory((prev) => [...prev, { command: cmd, output }]);
                    scrollToSectionAndClose('projects');
                    return;
                }
                case 'experience': {
                    const expList = experiences
                        .map((e) => {
                            const position = t(`experience.items.${e.id}.position`);
                            const period = t(`experience.items.${e.id}.period`);
                            return `${position} @ ${e.company} (${period})\nTech: ${e.tech.join(', ')}`;
                        })
                        .join('\n\n');
                    setHistory((prev) => [...prev, { command: cmd, output: expList }]);
                    scrollToSectionAndClose('experience');
                    return;
                }
                case 'contact': {
                    const links = Object.entries(SocialLinks)
                        .map(([name, url]) => `  ${name}: ${url}`)
                        .join('\n');
                    output = `${t('contact.title')}:\n${links}`;
                    setHistory((prev) => [...prev, { command: cmd, output }]);
                    scrollToSectionAndClose('contact');
                    return;
                }
                case 'theme':
                    output = t('terminal.themeCurrent', { theme });
                    break;
                case 'theme dark':
                    setTheme('dark');
                    output = t('terminal.themeChanged', { theme: 'dark' });
                    break;
                case 'theme light':
                    setTheme('light');
                    output = t('terminal.themeChanged', { theme: 'light' });
                    break;
                case 'theme toggle':
                    toggleTheme();
                    output = t('terminal.themeChanged', {
                        theme: theme === 'light' ? 'dark' : 'light',
                    });
                    break;
                case 'clear':
                    setHistory([]);
                    return;
                case 'exit':
                    onClose();
                    return;
                case '':
                    return;
                default:
                    output = t('terminal.unknown');
            }

            setHistory((prev) => [...prev, { command: cmd, output }]);
        },
        [t, theme, setTheme, toggleTheme, onClose, scrollToSectionAndClose],
    );

    const handleSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            const value = inputRef.current?.value ?? input;
            if (value.trim()) {
                executeCommand(value);
                setInput('');
            }
        },
        [input, executeCommand],
    );

    return {
        history,
        input,
        setInput,
        inputRef,
        historyEndRef,
        handleSubmit,
        prompt: t('terminal.prompt'),
    };
};
