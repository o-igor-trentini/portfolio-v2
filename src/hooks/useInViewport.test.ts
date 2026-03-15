import { renderHook, act } from '@testing-library/react';
import { useInViewport } from './useInViewport';

const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

let observerCallback: IntersectionObserverCallback;
let observerOptions: IntersectionObserverInit | undefined;

beforeEach(() => {
    vi.clearAllMocks();
    observerCallback = undefined as unknown as IntersectionObserverCallback;
    observerOptions = undefined;

    globalThis.IntersectionObserver = vi.fn(function (
        this: Record<string, unknown>,
        callback: IntersectionObserverCallback,
        options?: IntersectionObserverInit,
    ) {
        observerCallback = callback;
        observerOptions = options;
        this.observe = mockObserve;
        this.disconnect = mockDisconnect;
        this.unobserve = vi.fn();
        this.takeRecords = vi.fn();
    }) as unknown as typeof IntersectionObserver;
});

describe('useInViewport', () => {
    it('inicializa com isInViewport true por padrão', () => {
        const { result } = renderHook(() => useInViewport());
        expect(result.current.isInViewport).toBe(true);
    });

    it('retorna uma ref para anexar ao elemento', () => {
        const { result } = renderHook(() => useInViewport());
        expect(result.current.ref).toBeDefined();
        expect(result.current.ref.current).toBeNull();
    });

    it('cria IntersectionObserver e observa o elemento quando ref está definida', () => {
        const element = document.createElement('div');

        const { result } = renderHook(() => useInViewport<HTMLDivElement>());

        // Seta o ref manualmente e re-renderiza
        act(() => {
            (result.current.ref as { current: HTMLDivElement | null }).current = element;
        });

        // Re-renderiza para o useEffect pegar o ref atualizado
        const { unmount } = renderHook(() => {
            const hook = useInViewport<HTMLDivElement>({ threshold: 0.5, rootMargin: '100px' });
            // Seta o ref imediatamente
            (hook.ref as { current: HTMLDivElement | null }).current = element;
            return hook;
        });

        // O observer é criado no effect, que roda após o render.
        // Como jsdom não triggera intersection, testamos via callback direta.
        expect(observerOptions?.threshold).toBe(0.5);
        expect(observerOptions?.rootMargin).toBe('100px');
        expect(mockObserve).toHaveBeenCalledWith(element);

        unmount();
        expect(mockDisconnect).toHaveBeenCalled();
    });

    it('atualiza isInViewport via callback do observer', () => {
        const element = document.createElement('div');

        const { result } = renderHook(() => {
            const hook = useInViewport<HTMLDivElement>();
            (hook.ref as { current: HTMLDivElement | null }).current = element;
            return hook;
        });

        // Sai do viewport
        act(() => {
            observerCallback([{ isIntersecting: false } as IntersectionObserverEntry], {} as IntersectionObserver);
        });
        expect(result.current.isInViewport).toBe(false);

        // Entra no viewport
        act(() => {
            observerCallback([{ isIntersecting: true } as IntersectionObserverEntry], {} as IntersectionObserver);
        });
        expect(result.current.isInViewport).toBe(true);
    });

    it('não cria observer quando ref é null', () => {
        renderHook(() => useInViewport());
        // Observer não é criado porque ref.current é null
        expect(mockObserve).not.toHaveBeenCalled();
    });
});
