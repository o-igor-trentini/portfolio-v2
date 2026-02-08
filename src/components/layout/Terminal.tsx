import { useLanguage, useTheme } from '@hooks';
import { Button } from '@ui';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useCallback, useEffect, useRef, useState, type FC, type FormEvent, type ReactElement } from 'react';
import { SocialLinks } from '@/components/sections/Contact/constants';
import { experiences } from '@/components/sections/Experience/content';
import { projects } from '@/components/sections/Projects/projects';

interface TerminalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface CommandOutput {
    command: string;
    output: string;
}

const Terminal: FC<TerminalProps> = ({ isOpen, onClose }): ReactElement => {
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

    const executeCommand = (cmd: string) => {
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
                output = t('terminal.themeChanged', { theme: theme === 'light' ? 'dark' : 'light' });
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
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const value = inputRef.current?.value ?? input;
        if (value.trim()) {
            executeCommand(value);
            setInput('');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[200] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
                    onClick={onClose}
                    role="dialog"
                    aria-modal="true"
                    aria-label="Terminal"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full max-w-3xl max-h-[600px] bg-zinc-900 rounded-xl overflow-hidden shadow-2xl border border-zinc-800"
                    >
                        {/* Terminal Header */}
                        <div className="bg-zinc-800 px-4 py-3 flex items-center justify-between border-b border-zinc-700">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <TerminalIcon className="w-4 h-4 text-green-400" />
                                    <span className="text-sm text-zinc-300">{t('terminal.prompt')}</span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="text-zinc-400 hover:text-white h-8 w-8"
                                aria-label={t('accessibility.close')}
                            >
                                <X className="w-4 h-4" />
                            </Button>
                        </div>

                        {/* Terminal Body */}
                        <div className="p-4 h-[480px] overflow-y-auto font-mono text-sm">
                            {history.map((entry, index) => (
                                <div key={index} className="mb-4">
                                    {entry.command && (
                                        <div className="flex items-center gap-2 text-green-400 mb-1">
                                            <span className="text-purple-400">{t('terminal.prompt')}</span>
                                            <span>{entry.command}</span>
                                        </div>
                                    )}
                                    <div className="text-zinc-300 whitespace-pre-wrap">{entry.output}</div>
                                </div>
                            ))}
                            <div ref={historyEndRef} />
                        </div>

                        {/* Terminal Input */}
                        <form onSubmit={handleSubmit} className="border-t border-zinc-800 p-4 bg-zinc-800/50">
                            <div className="flex items-center gap-2">
                                <span className="text-purple-400 font-mono text-sm">{t('terminal.prompt')}</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1 bg-transparent text-green-400 font-mono text-sm outline-none"
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Terminal;
