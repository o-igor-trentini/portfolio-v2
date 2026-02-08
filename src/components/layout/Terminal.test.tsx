import { createElement } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@/tests/helpers/render';
import { fireEvent } from '@testing-library/react';
import Terminal from './Terminal';

// Mock motion/react
vi.mock('motion/react', () => ({
    motion: new Proxy(
        {},
        {
            get: (_target, prop: string) => {
                return ({ children, ...props }: any) => {
                    const {
                        initial: _i,
                        animate: _a,
                        exit: _e,
                        transition: _tr,
                        whileHover: _wh,
                        whileTap: _wt,
                        whileInView: _wiv,
                        viewport: _vp,
                        layout: _l,
                        variants: _v,
                        ...htmlProps
                    } = props;
                    return createElement(prop, htmlProps, children);
                };
            },
        },
    ),
    AnimatePresence: ({ children }: any) => children,
}));

// Mock useTheme
const mockSetTheme = vi.fn();
const mockToggleTheme = vi.fn();
vi.mock('../../hooks/useTheme', () => ({
    useTheme: () => ({
        theme: 'dark',
        setTheme: mockSetTheme,
        toggleTheme: mockToggleTheme,
    }),
}));

describe('Terminal', () => {
    const mockOnClose = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    // handleSubmit lê o valor do inputRef.current.value — basta setar no DOM e submeter
    const submitCommand = (command: string) => {
        const input = screen.getByRole('textbox') as HTMLInputElement;
        const form = input.closest('form')!;

        // Seta o value diretamente no DOM (o ref aponta para este elemento)
        input.value = command;
        fireEvent.submit(form);
    };

    it('renderiza mensagem de boas-vindas quando aberto', () => {
        render(<Terminal isOpen={true} onClose={mockOnClose} />);
        expect(screen.getByText(/Terminal Igor Trentini/)).toBeInTheDocument();
    });

    it('não renderiza quando fechado', () => {
        render(<Terminal isOpen={false} onClose={mockOnClose} />);
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('executa comando "help" e mostra comandos disponíveis', () => {
        render(<Terminal isOpen={true} onClose={mockOnClose} />);

        submitCommand('help');
        const helpTexts = screen.getAllByText(/projects.*experience.*contact.*theme/i);
        expect(helpTexts.length).toBeGreaterThanOrEqual(2);
    });

    it('executa comando "about"', () => {
        render(<Terminal isOpen={true} onClose={mockOnClose} />);

        submitCommand('about');
        expect(screen.getByText(/Full Stack Developer especializado/)).toBeInTheDocument();
    });

    it('executa comando "projects" com dados dinâmicos', () => {
        render(<Terminal isOpen={true} onClose={mockOnClose} />);

        submitCommand('projects');
        // Verifica que lista títulos reais dos projetos via i18n
        expect(screen.getByText(/Chat em Tempo Real/)).toBeInTheDocument();
        expect(screen.getByText(/Projetos \(6\)/)).toBeInTheDocument();
    });

    it('executa comando "experience" com dados dinâmicos', () => {
        render(<Terminal isOpen={true} onClose={mockOnClose} />);

        submitCommand('experience');
        // Verifica dados reais da experiência (company do content.ts + position do i18n pt)
        expect(screen.getByText(/Full Stack Developer @ Logae/)).toBeInTheDocument();
        expect(screen.getByText(/Golang.*React.*TypeScript/)).toBeInTheDocument();
    });

    it('executa comando "contact" com dados dinâmicos', () => {
        render(<Terminal isOpen={true} onClose={mockOnClose} />);

        submitCommand('contact');
        // Verifica URLs reais do SocialLinks enum
        expect(screen.getByText(/github\.com\/o-igor-trentini/)).toBeInTheDocument();
        expect(screen.getByText(/linkedin\.com\/in\/igor-trentini/)).toBeInTheDocument();
    });

    it('executa comando "skills" com dados dinâmicos da experiência atual', () => {
        render(<Terminal isOpen={true} onClose={mockOnClose} />);

        submitCommand('skills');
        // Verifica tech stack real do experience atual
        expect(screen.getByText(/Golang.*React.*TypeScript.*PostgreSQL/)).toBeInTheDocument();
    });

    it('executa comando "anime" com dados dinâmicos do i18n', () => {
        render(<Terminal isOpen={true} onClose={mockOnClose} />);

        submitCommand('anime');
        // Verifica favoritos reais de about.interests.anime.favorites (pt.ts)
        expect(screen.getByText(/Attack on Titan/)).toBeInTheDocument();
        expect(screen.getByText(/Death Note/)).toBeInTheDocument();
    });

    it('executa comando "theme" e mostra tema atual', () => {
        render(<Terminal isOpen={true} onClose={mockOnClose} />);

        submitCommand('theme');
        expect(screen.getByText(/Tema atual.*dark/)).toBeInTheDocument();
    });

    it('executa comando "theme dark" e chama setTheme', () => {
        render(<Terminal isOpen={true} onClose={mockOnClose} />);

        submitCommand('theme dark');
        expect(mockSetTheme).toHaveBeenCalledWith('dark');
    });

    it('executa comando "theme light" e chama setTheme', () => {
        render(<Terminal isOpen={true} onClose={mockOnClose} />);

        submitCommand('theme light');
        expect(mockSetTheme).toHaveBeenCalledWith('light');
    });

    it('executa comando "theme toggle" e chama toggleTheme', () => {
        render(<Terminal isOpen={true} onClose={mockOnClose} />);

        submitCommand('theme toggle');
        expect(mockToggleTheme).toHaveBeenCalled();
    });

    it('executa comando "clear" e limpa histórico', () => {
        render(<Terminal isOpen={true} onClose={mockOnClose} />);

        submitCommand('clear');
        expect(screen.queryByText(/Terminal Igor Trentini/)).not.toBeInTheDocument();
    });

    it('executa comando "exit" e fecha terminal', () => {
        render(<Terminal isOpen={true} onClose={mockOnClose} />);

        submitCommand('exit');
        expect(mockOnClose).toHaveBeenCalled();
    });

    it('mostra mensagem de erro para comando desconhecido', () => {
        render(<Terminal isOpen={true} onClose={mockOnClose} />);

        submitCommand('invalidcmd');
        expect(screen.getByText(/não encontrado|not found/i)).toBeInTheDocument();
    });

    it('fecha terminal com Escape', async () => {
        const user = userEvent.setup();
        render(<Terminal isOpen={true} onClose={mockOnClose} />);

        await user.keyboard('{Escape}');
        expect(mockOnClose).toHaveBeenCalled();
    });
});
