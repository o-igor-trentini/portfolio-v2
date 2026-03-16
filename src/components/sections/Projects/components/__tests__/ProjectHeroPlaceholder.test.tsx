import { createElement } from 'react';
import { render, screen } from '@/tests/helpers/render';
import { axe } from 'vitest-axe';
import ProjectHeroPlaceholder from '../ProjectHeroPlaceholder';

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

const BASE_STACK = ['React', 'TypeScript', 'Tailwind', 'Vite'];

const LARGE_STACK = ['React', 'TypeScript', 'Tailwind', 'Vite', 'Node.js', 'PostgreSQL', 'Docker', 'Redis'];

describe('ProjectHeroPlaceholder', () => {
    describe('renderizacao', () => {
        it('deve renderizar container com overflow-hidden', () => {
            const { container } = render(<ProjectHeroPlaceholder stack={BASE_STACK} />);
            const rootDiv = container.firstElementChild as HTMLElement;

            expect(rootDiv).toHaveClass('overflow-hidden');
        });

        it('deve renderizar badges das tecnologias do stack', () => {
            render(<ProjectHeroPlaceholder stack={BASE_STACK} />);

            for (const tech of BASE_STACK) {
                expect(screen.getByText(tech)).toBeInTheDocument();
            }
        });

        it('deve limitar exibicao a 6 tecnologias mesmo com stack maior', () => {
            render(<ProjectHeroPlaceholder stack={LARGE_STACK} />);

            for (const tech of LARGE_STACK.slice(0, 6)) {
                expect(screen.getByText(tech)).toBeInTheDocument();
            }

            for (const tech of LARGE_STACK.slice(6)) {
                expect(screen.queryByText(tech)).not.toBeInTheDocument();
            }
        });

        it('deve aplicar className customizada quando fornecida', () => {
            const { container } = render(<ProjectHeroPlaceholder stack={BASE_STACK} className="my-custom-class" />);
            const rootDiv = container.firstElementChild as HTMLElement;

            expect(rootDiv).toHaveClass('my-custom-class');
        });
    });

    describe('responsividade', () => {
        it('deve ter container com w-full e h-full', () => {
            const { container } = render(<ProjectHeroPlaceholder stack={BASE_STACK} />);
            const rootDiv = container.firstElementChild as HTMLElement;

            expect(rootDiv).toHaveClass('w-full', 'h-full');
        });

        it('deve ter badges com classes responsivas de texto', () => {
            render(<ProjectHeroPlaceholder stack={['React']} />);
            const badge = screen.getByText('React');

            expect(badge).toHaveClass('text-[10px]', 'sm:text-sm');
        });

        it('deve ter container de badges com gap responsivo', () => {
            render(<ProjectHeroPlaceholder stack={BASE_STACK} />);
            const badge = screen.getByText(BASE_STACK[0]);
            const badgeContainer = badge.parentElement as HTMLElement;

            expect(badgeContainer).toHaveClass('gap-2', 'sm:gap-3');
        });
    });

    describe('acessibilidade', () => {
        it('nao deve ter violacoes de acessibilidade', async () => {
            const { container } = render(<ProjectHeroPlaceholder stack={BASE_STACK} />);
            const results = await axe(container);

            expect(results).toHaveNoViolations();
        });
    });
});
