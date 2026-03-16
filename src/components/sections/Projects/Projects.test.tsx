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

vi.mock('./components/ProjectHeroPlaceholder', () => ({
    default: ({ stack }: any) =>
        createElement('div', { 'data-testid': 'hero-placeholder' }, `Placeholder: ${stack.length} techs`),
}));

describe('Projects', () => {
    const mockProjectClick = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renderiza todos os projetos (1)', () => {
        render(<Projects onProjectClick={mockProjectClick} />);

        const viewButtons = screen.getAllByText('Ver Detalhes');
        expect(viewButtons).toHaveLength(1);
    });

    it('filtra profissionais (1)', async () => {
        const user = userEvent.setup();
        render(<Projects onProjectClick={mockProjectClick} />);

        // Usa getByRole para pegar o botão de filtro, não os badges dos cards
        const filterButton = screen.getByRole('button', { name: /Profissionais/i });
        await user.click(filterButton);

        const viewButtons = screen.getAllByText('Ver Detalhes');
        expect(viewButtons).toHaveLength(1);
    });

    it('filtra estudos (0)', async () => {
        const user = userEvent.setup();
        render(<Projects onProjectClick={mockProjectClick} />);

        const filterButton = screen.getByRole('button', { name: /Estudos/i });
        await user.click(filterButton);

        const viewButtons = screen.queryAllByText('Ver Detalhes');
        expect(viewButtons).toHaveLength(0);
    });

    it('atualiza contador ao mudar filtro', async () => {
        const user = userEvent.setup();
        render(<Projects onProjectClick={mockProjectClick} />);

        // Todos: 1 projeto
        expect(screen.getByText('1 projeto')).toBeInTheDocument();

        // Filtra profissionais: 1
        await user.click(screen.getByRole('button', { name: /Profissionais/i }));
        expect(screen.getByText('1 projeto')).toBeInTheDocument();

        // Filtra estudos: 0
        await user.click(screen.getByRole('button', { name: /Estudos/i }));
        expect(screen.getByText('0 projetos')).toBeInTheDocument();
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

    describe('card: cardSummary', () => {
        it('deve exibir cardSummary no card', () => {
            render(<Projects onProjectClick={mockProjectClick} />);

            expect(
                screen.getByText(
                    'Plataforma SaaS de análise de risco para logística. Automatiza verificações operacionais com IA, atendendo centenas de empresas em escala.',
                ),
            ).toBeInTheDocument();
        });

        it('não deve exibir a description completa no card', () => {
            render(<Projects onProjectClick={mockProjectClick} />);

            expect(screen.queryByText(/Plataforma SaaS voltada à análise e validação/)).not.toBeInTheDocument();
        });

        it('deve ter line-clamp-3 no container de texto do cardSummary', () => {
            render(<Projects onProjectClick={mockProjectClick} />);

            const summaryElement = screen.getByText(
                'Plataforma SaaS de análise de risco para logística. Automatiza verificações operacionais com IA, atendendo centenas de empresas em escala.',
            );
            expect(summaryElement).toHaveClass('line-clamp-3');
        });
    });

    describe('card: imagem condicional', () => {
        it('deve renderizar ProjectHeroPlaceholder quando imageType é generated', () => {
            render(<Projects onProjectClick={mockProjectClick} />);

            expect(screen.getByTestId('hero-placeholder')).toBeInTheDocument();
        });

        it('não deve renderizar tag img no card com imageType generated', () => {
            render(<Projects onProjectClick={mockProjectClick} />);

            expect(screen.queryByRole('img')).not.toBeInTheDocument();
        });
    });

    describe('grid dinamico', () => {
        it('deve usar max-w-lg mx-auto sem classe grid para 1 projeto', () => {
            const { container } = render(<Projects onProjectClick={mockProjectClick} />);

            const gridContainer = container.querySelector('.max-w-lg.mx-auto');
            expect(gridContainer).toBeInTheDocument();
            expect(gridContainer).not.toHaveClass('grid');
        });
    });
});
