import { createElement } from 'react';
import { render, screen } from '@/tests/helpers/render';
import { Hero } from './index';

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

// Mock PriorityImage
vi.mock('../../common/OptimizedImage', () => ({
    PriorityImage: (props: any) => createElement('img', { src: props.src, alt: props.alt }),
    OptimizedImage: (props: any) => createElement('img', { src: props.src, alt: props.alt }),
}));

describe('Hero', () => {
    it('renderiza nome "Igor Trentini"', () => {
        render(<Hero />);
        // O nome aparece no h1 e possivelmente em outros lugares
        const headings = screen.getAllByText('Igor Trentini');
        expect(headings.length).toBeGreaterThanOrEqual(1);
    });

    it('renderiza cargo (Full Stack Developer)', () => {
        render(<Hero />);
        expect(screen.getByText('Full Stack Developer')).toBeInTheDocument();
    });

    it('renderiza saudação', () => {
        render(<Hero />);
        expect(screen.getByText('Olá, eu sou')).toBeInTheDocument();
    });

    it('renderiza badges de tecnologia', () => {
        render(<Hero />);

        expect(screen.getByText('Golang')).toBeInTheDocument();
        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
        expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
        expect(screen.getByText('Docker')).toBeInTheDocument();
    });

    it('renderiza botões CTA (projetos e contato)', () => {
        render(<Hero />);

        expect(screen.getByText('Ver Projetos')).toBeInTheDocument();
        expect(screen.getByText('Entrar em Contato')).toBeInTheDocument();
    });

    it('renderiza links sociais (GitHub e LinkedIn)', () => {
        render(<Hero />);

        const links = screen.getAllByRole('link');
        const githubHref = links.find((l) => l.getAttribute('href')?.includes('github.com'));
        const linkedinHref = links.find((l) => l.getAttribute('href')?.includes('linkedin.com'));

        expect(githubHref).toBeDefined();
        expect(linkedinHref).toBeDefined();
    });

    it('renderiza imagem de perfil', () => {
        render(<Hero />);

        const img = screen.getByRole('img', { name: 'Igor Trentini' });
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute('src', '/images/perfil.webp');
    });
});
