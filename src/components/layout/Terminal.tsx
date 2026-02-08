import { useLanguage } from '@hooks';
import { Button } from '@ui';
import { Terminal as TerminalIcon, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { type FC, type ReactElement } from 'react';
import { useTerminal } from '@/hooks/useTerminal';

interface TerminalProps {
    isOpen: boolean;
    onClose: () => void;
}

const Terminal: FC<TerminalProps> = ({ isOpen, onClose }): ReactElement => {
    const { t } = useLanguage();
    const { history, input, setInput, inputRef, historyEndRef, handleSubmit, prompt } = useTerminal(isOpen, onClose);

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
                                    <span className="text-sm text-zinc-300">{prompt}</span>
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
                                            <span className="text-purple-400">{prompt}</span>

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
                                <span className="text-purple-400 font-mono text-sm">{prompt}</span>

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
