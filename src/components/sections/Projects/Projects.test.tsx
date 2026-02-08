import { createElement } from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@/tests/helpers/render';
import Projects from './index';

// Mock motion/react
vi.mock('motion/react', () => ({
    motion: new Proxy(
        {},
        {
            get: (_target, prop: string) => {
                return ({ children, ...props }: any) => {
                    const {
                        initial,
                        animate,
                        exit,
                        transition,
                        whileHover,
                        whileTap,
                        whileInView,
                        viewport,
                        layout,
                        variants,
                        style,
                        ...htmlProps
                    } = props;
                    return createElement(prop as string, { ...htmlProps, style }, children);
                };
            },
        },
    ),
    AnimatePresence: ({ children }: any) => children,
}));

// Mock OptimizedImage
vi.mock('../../common/OptimizedImage', () => ({
    OptimizedImage: (props: any) => createElement('img', { src: props.src, alt: props.alt }),
    PriorityImage: (props: any) => createElement('img', { src: props.src, alt: props.alt }),
}));

describe('Projects', () => {
    const mockProjectClick = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renderiza todos os projetos (6)', () => {
        render(<Projects onProjectClick={mockProjectClick} />);

        const viewButtons = screen.getAllByText('Ver Detalhes');
        expect(viewButtons).toHaveLength(6);
    });

    it('filtra profissionais (3)', async () => {
        const user = userEvent.setup();
        render(<Projects onProjectClick={mockProjectClick} />);

        // Usa getByRole para pegar o botão de filtro, não os badges dos cards
        const filterButton = screen.getByRole('button', { name: /Profissionais/i });
        await user.click(filterButton);

        const viewButtons = screen.getAllByText('Ver Detalhes');
        expect(viewButtons).toHaveLength(3);
    });

    it('filtra estudos (3)', async () => {
        const user = userEvent.setup();
        render(<Projects onProjectClick={mockProjectClick} />);

        const filterButton = screen.getByRole('button', { name: /Estudos/i });
        await user.click(filterButton);

        const viewButtons = screen.getAllByText('Ver Detalhes');
        expect(viewButtons).toHaveLength(3);
    });

    it('atualiza contador ao mudar filtro', async () => {
        const user = userEvent.setup();
        render(<Projects onProjectClick={mockProjectClick} />);

        // Todos: 6 projetos
        expect(screen.getByText('6 projetos')).toBeInTheDocument();

        // Filtra profissionais: 3
        await user.click(screen.getByRole('button', { name: /Profissionais/i }));
        expect(screen.getByText('3 projetos')).toBeInTheDocument();

        // Filtra estudos: 3
        await user.click(screen.getByRole('button', { name: /Estudos/i }));
        expect(screen.getByText('3 projetos')).toBeInTheDocument();
    });

    it('onProjectClick chamado ao clicar "Ver Detalhes"', async () => {
        const user = userEvent.setup();
        render(<Projects onProjectClick={mockProjectClick} />);

        const viewButtons = screen.getAllByText('Ver Detalhes');
        await user.click(viewButtons[0]);

        expect(mockProjectClick).toHaveBeenCalledTimes(1);
        expect(mockProjectClick).toHaveBeenCalledWith(
            expect.objectContaining({
                id: expect.any(String),
                type: expect.any(String),
            }),
        );
    });
});
