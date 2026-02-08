import { createElement } from 'react';
import { axe } from 'vitest-axe';
import { render } from '@/tests/helpers/render';
import { Hero } from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Projects from '@/components/sections/Projects';
import TechStack from '@/components/sections/TechStack';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';
import { Header } from '@/components/layout/Header';

// Mock motion/react — Proxy que mapeia motion.div → <div>, etc.
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

// Mock OptimizedImage / PriorityImage
vi.mock('@/components/common/OptimizedImage', () => ({
    OptimizedImage: (props: any) => createElement('img', { src: props.src, alt: props.alt }),
    PriorityImage: (props: any) => createElement('img', { src: props.src, alt: props.alt }),
}));

// Mock useGitHub — retorna estado vazio (sem loading)
vi.mock('@/hooks/useGitHub', () => ({
    useGitHub: () => ({
        stats: null,
        isLoading: false,
        isRateLimited: false,
    }),
}));

// Mock useMusic — retorna estado vazio (sem loading)
vi.mock('@/hooks/useMusic', () => ({
    useMusic: () => ({
        currentTrack: null,
        topArtist: null,
        recentTracks: [],
        isLoading: false,
        provider: 'spotify',
        availableProviders: [],
        switchProvider: vi.fn(),
    }),
}));

// Mock useScrollHighlight
vi.mock('@/hooks/useScrollHighlight', () => ({
    useScrollHighlight: () => ({
        scrollToSection: vi.fn(),
    }),
}));

// Mock ImageGallery (usado pelo AboutDetailModal)
vi.mock('@/components/layout/ImageGallery', () => ({
    ImageGallery: () => null,
}));

// Mock sonner
vi.mock('sonner', () => ({
    toast: { success: vi.fn(), error: vi.fn() },
}));

// Mock navigator.clipboard
Object.assign(navigator, {
    clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
    },
});

describe('Acessibilidade (axe-core)', () => {
    it('Hero não possui violações de acessibilidade', async () => {
        const { container } = render(<Hero />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('About não possui violações de acessibilidade', async () => {
        const { container } = render(<About />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('Projects não possui violações de acessibilidade', async () => {
        const { container } = render(<Projects onProjectClick={vi.fn()} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('TechStack não possui violações de acessibilidade', async () => {
        const { container } = render(<TechStack />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('Experience não possui violações de acessibilidade', async () => {
        const { container } = render(<Experience />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('Contact não possui violações de acessibilidade', async () => {
        const { container } = render(<Contact />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it('Header não possui violações de acessibilidade', async () => {
        const { container } = render(<Header onTerminalToggle={vi.fn()} />);
        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });
});
