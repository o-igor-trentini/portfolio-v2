import { renderHook, act } from '@testing-library/react';
import { type ReactNode } from 'react';
import { I18nTestProvider } from '@/tests/helpers/i18n';
import { useTerminal } from './useTerminal';

// Mock useTheme
const mockSetTheme = vi.fn();
const mockToggleTheme = vi.fn();
vi.mock('./useTheme', () => ({
    useTheme: () => ({
        theme: 'dark',
        setTheme: mockSetTheme,
        toggleTheme: mockToggleTheme,
    }),
}));

const wrapper = ({ children }: { children: ReactNode }) => (
    <I18nTestProvider>{children}</I18nTestProvider>
);

describe('useTerminal', () => {
    const mockOnClose = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    // Helper: seta input e submete via handleSubmit
    const submitCommand = (result: { current: ReturnType<typeof useTerminal> }, command: string) => {
        act(() => {
            result.current.setInput(command);
        });
        act(() => {
            result.current.handleSubmit({ preventDefault: vi.fn() } as unknown as React.FormEvent);
        });
    };

    // Retorna o output do último item do history
    const lastOutput = (result: { current: ReturnType<typeof useTerminal> }) => {
        const h = result.current.history;
        return h[h.length - 1]?.output ?? '';
    };

    describe('estado inicial', () => {
        it('inicializa com welcome e help no history', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            expect(result.current.history).toHaveLength(2);
            expect(result.current.history[0].output).toMatch(/Terminal Igor Trentini/);
            expect(result.current.history[1].output).toMatch(/about.*skills.*anime.*projects/i);
        });

        it('input começa vazio', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });
            expect(result.current.input).toBe('');
        });

        it('prompt retorna valor i18n', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });
            expect(result.current.prompt).toBe('igor@portfolio:~$');
        });

        it('refs são criadas', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });
            expect(result.current.inputRef).toBeDefined();
            expect(result.current.historyEndRef).toBeDefined();
        });
    });

    describe('comando "help"', () => {
        it('adiciona help ao history', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            submitCommand(result, 'help');

            expect(result.current.history).toHaveLength(3);
            expect(lastOutput(result)).toMatch(/about.*skills.*anime.*projects/i);
        });
    });

    describe('comando "about"', () => {
        it('adiciona descrição ao history', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            submitCommand(result, 'about');

            expect(lastOutput(result)).toMatch(/Full Stack Developer especializado/);
        });
    });

    describe('comando "anime"', () => {
        it('lista favoritos dinâmicos do i18n', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            submitCommand(result, 'anime');

            const output = lastOutput(result);
            expect(output).toMatch(/Attack on Titan/);
            expect(output).toMatch(/Death Note/);
            expect(output).toMatch(/Steins;Gate/);
        });

        it('"about --anime" funciona como alias', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            submitCommand(result, 'about --anime');

            expect(lastOutput(result)).toMatch(/Attack on Titan/);
        });
    });

    describe('comando "skills"', () => {
        it('lista tech stack da experiência atual', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            submitCommand(result, 'skills');

            const output = lastOutput(result);
            expect(output).toMatch(/Golang/);
            expect(output).toMatch(/React/);
            expect(output).toMatch(/TypeScript/);
            expect(output).toMatch(/PostgreSQL/);
        });
    });

    describe('comando "projects"', () => {
        it('lista projetos dinâmicos com títulos e tags', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            submitCommand(result, 'projects');

            const output = lastOutput(result);
            expect(output).toMatch(/Projetos \(6\)/);
            expect(output).toMatch(/Chat em Tempo Real/);
            expect(output).toMatch(/Golang/);
        });

        it('agenda fechamento do terminal com delay', () => {
            vi.useFakeTimers();
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            submitCommand(result, 'projects');
            expect(mockOnClose).not.toHaveBeenCalled();

            act(() => {
                vi.advanceTimersByTime(1500);
            });
            expect(mockOnClose).toHaveBeenCalled();

            vi.useRealTimers();
        });
    });

    describe('comando "experience"', () => {
        it('lista experiências dinâmicas com position, company e tech', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            submitCommand(result, 'experience');

            const output = lastOutput(result);
            expect(output).toMatch(/Full Stack Developer @ Logae/);
            expect(output).toMatch(/2021/);
            expect(output).toMatch(/Golang.*React.*TypeScript/);
        });

        it('agenda fechamento do terminal com delay', () => {
            vi.useFakeTimers();
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            submitCommand(result, 'experience');
            expect(mockOnClose).not.toHaveBeenCalled();

            act(() => {
                vi.advanceTimersByTime(1500);
            });
            expect(mockOnClose).toHaveBeenCalled();

            vi.useRealTimers();
        });
    });

    describe('comando "contact"', () => {
        it('lista links dinâmicos do SocialLinks', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            submitCommand(result, 'contact');

            const output = lastOutput(result);
            expect(output).toMatch(/github\.com\/o-igor-trentini/);
            expect(output).toMatch(/linkedin\.com\/in\/igor-trentini/);
            expect(output).toMatch(/instagram\.com\/ct\.igor/);
        });

        it('agenda fechamento do terminal com delay', () => {
            vi.useFakeTimers();
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            submitCommand(result, 'contact');
            expect(mockOnClose).not.toHaveBeenCalled();

            act(() => {
                vi.advanceTimersByTime(1500);
            });
            expect(mockOnClose).toHaveBeenCalled();

            vi.useRealTimers();
        });
    });

    describe('comandos de tema', () => {
        it('"theme" mostra tema atual', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            submitCommand(result, 'theme');

            expect(lastOutput(result)).toMatch(/Tema atual.*dark/);
        });

        it('"theme dark" chama setTheme', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            submitCommand(result, 'theme dark');

            expect(mockSetTheme).toHaveBeenCalledWith('dark');
            expect(lastOutput(result)).toMatch(/Tema alterado para.*dark/);
        });

        it('"theme light" chama setTheme', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            submitCommand(result, 'theme light');

            expect(mockSetTheme).toHaveBeenCalledWith('light');
            expect(lastOutput(result)).toMatch(/Tema alterado para.*light/);
        });

        it('"theme toggle" chama toggleTheme', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            submitCommand(result, 'theme toggle');

            expect(mockToggleTheme).toHaveBeenCalled();
        });
    });

    describe('comando "clear"', () => {
        it('limpa todo o history', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            expect(result.current.history).toHaveLength(2);

            submitCommand(result, 'clear');

            expect(result.current.history).toHaveLength(0);
        });
    });

    describe('comando "exit"', () => {
        it('chama onClose', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            submitCommand(result, 'exit');

            expect(mockOnClose).toHaveBeenCalled();
        });
    });

    describe('comando desconhecido', () => {
        it('mostra mensagem de erro', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            submitCommand(result, 'xyzinvalid');

            expect(lastOutput(result)).toMatch(/não encontrado/i);
        });
    });

    describe('handleSubmit', () => {
        it('chama preventDefault', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });
            const mockPreventDefault = vi.fn();

            act(() => {
                result.current.setInput('help');
            });
            act(() => {
                result.current.handleSubmit({
                    preventDefault: mockPreventDefault,
                } as unknown as React.FormEvent);
            });

            expect(mockPreventDefault).toHaveBeenCalled();
        });

        it('limpa input após submissão', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            submitCommand(result, 'help');

            expect(result.current.input).toBe('');
        });

        it('não executa com input vazio', () => {
            const { result } = renderHook(() => useTerminal(true, mockOnClose), { wrapper });
            const initialLength = result.current.history.length;

            submitCommand(result, '   ');

            expect(result.current.history).toHaveLength(initialLength);
        });
    });

    describe('efeito Escape', () => {
        it('chama onClose ao pressionar Escape quando aberto', () => {
            renderHook(() => useTerminal(true, mockOnClose), { wrapper });

            act(() => {
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
            });

            expect(mockOnClose).toHaveBeenCalled();
        });

        it('não reage ao Escape quando fechado', () => {
            renderHook(() => useTerminal(false, mockOnClose), { wrapper });

            act(() => {
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
            });

            expect(mockOnClose).not.toHaveBeenCalled();
        });
    });
});
