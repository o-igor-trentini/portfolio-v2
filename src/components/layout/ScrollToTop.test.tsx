import { createElement } from 'react';
import { render, screen, fireEvent, act } from '@/tests/helpers/render';
import ScrollToTop from './ScrollToTop';

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

describe('ScrollToTop', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    });

    it('não renderiza o botão quando scrollY < 400', () => {
        render(<ScrollToTop />);
        expect(screen.queryByRole('button', { name: /topo/i })).not.toBeInTheDocument();
    });

    it('renderiza o botão quando scrollY > 400', () => {
        render(<ScrollToTop />);

        act(() => {
            Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
            fireEvent.scroll(window);
        });

        expect(screen.getByRole('button', { name: /topo/i })).toBeInTheDocument();
    });

    it('chama window.scrollTo ao clicar no botão', () => {
        const scrollToSpy = vi.fn();
        window.scrollTo = scrollToSpy as any;

        render(<ScrollToTop />);

        act(() => {
            Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
            fireEvent.scroll(window);
        });

        fireEvent.click(screen.getByRole('button', { name: /topo/i }));
        expect(scrollToSpy).toHaveBeenCalledWith({ top: 0, behavior: 'smooth' });
    });

    it('esconde o botão quando volta ao topo', () => {
        render(<ScrollToTop />);

        act(() => {
            Object.defineProperty(window, 'scrollY', { value: 500, writable: true });
            fireEvent.scroll(window);
        });

        expect(screen.getByRole('button', { name: /topo/i })).toBeInTheDocument();

        act(() => {
            Object.defineProperty(window, 'scrollY', { value: 100, writable: true });
            fireEvent.scroll(window);
        });

        expect(screen.queryByRole('button', { name: /topo/i })).not.toBeInTheDocument();
    });
});
