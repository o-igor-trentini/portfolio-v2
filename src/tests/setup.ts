import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach, vi } from 'vitest';

afterEach(() => {
    cleanup();
});

// Mock window.matchMedia (não implementado no jsdom)
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock Element.prototype.scrollIntoView
Element.prototype.scrollIntoView = vi.fn();

// Mock IntersectionObserver (usado pelo motion whileInView)
class MockIntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];

    constructor(private callback: IntersectionObserverCallback) {}

    observe() {
        // Simula elemento visível imediatamente
        this.callback(
            [{ isIntersecting: true, intersectionRatio: 1 }] as IntersectionObserverEntry[],
            this as unknown as IntersectionObserver,
        );
    }

    unobserve() {}
    disconnect() {}
    takeRecords(): IntersectionObserverEntry[] {
        return [];
    }
}

Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    value: MockIntersectionObserver,
});

// Mock variáveis de ambiente VITE_*
vi.stubEnv('VITE_MUSIC_PROVIDER', 'spotify');
vi.stubEnv('VITE_SPOTIFY_CLIENT_ID', '');
vi.stubEnv('VITE_SPOTIFY_CLIENT_SECRET', '');
vi.stubEnv('VITE_SPOTIFY_REFRESH_TOKEN', '');
vi.stubEnv('VITE_LASTFM_API_KEY', '');
vi.stubEnv('VITE_LASTFM_USERNAME', '');
