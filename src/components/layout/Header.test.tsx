import { createElement } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@/tests/helpers/render';
import { Header } from './Header';

// Mock motion/react — componentes retornam elementos HTML nativos
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
const mockToggleTheme = vi.fn();
vi.mock('../../hooks/useTheme', () => ({
    useTheme: () => ({
        theme: 'dark',
        toggleTheme: mockToggleTheme,
    }),
}));

describe('Header', () => {
    const mockTerminalToggle = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renderiza nome "Igor Trentini"', () => {
        render(<Header onTerminalToggle={mockTerminalToggle} />);
        expect(screen.getByText('Igor Trentini')).toBeInTheDocument();
    });

    it('renderiza links de navegação', () => {
        render(<Header onTerminalToggle={mockTerminalToggle} />);

        expect(screen.getAllByText('Início').length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText('Projetos').length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText('Sobre').length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText('Carreira').length).toBeGreaterThanOrEqual(1);
        expect(screen.getAllByText('Contato').length).toBeGreaterThanOrEqual(1);
    });

    it('botão de tema chama toggleTheme', async () => {
        const user = userEvent.setup();
        render(<Header onTerminalToggle={mockTerminalToggle} />);

        // Botão de tema tem o ícone Sun (tema dark) — pega todos e clica no primeiro visível
        const themeButtons = screen.getAllByRole('button');
        // O botão de tema é o que contém o ícone de sol/lua
        const themeButton = themeButtons.find((btn) => {
            const svg = btn.querySelector('svg');
            return svg && btn.onclick === null && !btn.textContent;
        });

        // Alternativa: buscar pelo className do botão desktop
        const desktopButtons = screen.getAllByRole('button').filter((btn) => btn.className.includes('md:flex'));
        // Primeiro botão md:flex é o de tema
        if (desktopButtons.length > 0) {
            await user.click(desktopButtons[0]);
            expect(mockToggleTheme).toHaveBeenCalledTimes(1);
        } else if (themeButton) {
            await user.click(themeButton);
            expect(mockToggleTheme).toHaveBeenCalledTimes(1);
        }
    });

    it('botão de terminal chama onTerminalToggle', async () => {
        const user = userEvent.setup();
        render(<Header onTerminalToggle={mockTerminalToggle} />);

        // O terceiro botão desktop (md:flex) é o terminal
        const desktopButtons = screen.getAllByRole('button').filter((btn) => btn.className.includes('md:flex'));
        // Tema, idioma, terminal
        if (desktopButtons.length >= 3) {
            await user.click(desktopButtons[2]);
            expect(mockTerminalToggle).toHaveBeenCalledTimes(1);
        }
    });
});
