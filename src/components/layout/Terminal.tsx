import { Terminal as TerminalIcon, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useRef, useState, type FC, type FormEvent, type ReactElement } from 'react';
import { useI18n } from '../../hooks/useLanguage';
import { Button } from '../ui/button';

interface TerminalProps {
    isOpen: boolean;
    onClose: () => void;
}

interface CommandOutput {
    command: string;
    output: string;
}

const Terminal: FC<TerminalProps> = ({ isOpen, onClose }): ReactElement => {
    const { t } = useI18n();
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
        historyEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

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
            case 'anime':
                output = t('terminal.aboutAnime');
                break;
            case 'skills':
                output = t('terminal.aboutSkills');
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

        setHistory([...history, { command: cmd, output }]);
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (input.trim()) {
            executeCommand(input);
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
                                    <span className="text-sm text-zinc-300">igor@portfolio:~$</span>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onClose}
                                className="text-zinc-400 hover:text-white h-8 w-8"
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
                                            <span className="text-purple-400">igor@portfolio:~$</span>
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
                                <span className="text-purple-400 font-mono text-sm">igor@portfolio:~$</span>
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
