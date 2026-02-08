import { renderHook, act } from '@testing-library/react';
import { useTheme, useThemeEffect } from './useTheme';

describe('useTheme', () => {
    beforeEach(() => {
        localStorage.clear();
        // Reset do store Zustand
        useTheme.setState({ theme: 'dark' });
    });

    it('inicializa com tema dark por padrão', () => {
        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toBe('dark');
    });

    it('toggleTheme alterna entre light e dark', () => {
        const { result } = renderHook(() => useTheme());

        act(() => {
            result.current.toggleTheme();
        });
        expect(result.current.theme).toBe('light');

        act(() => {
            result.current.toggleTheme();
        });
        expect(result.current.theme).toBe('dark');
    });

    it('setTheme define tema diretamente', () => {
        const { result } = renderHook(() => useTheme());

        act(() => {
            result.current.setTheme('light');
        });
        expect(result.current.theme).toBe('light');

        act(() => {
            result.current.setTheme('dark');
        });
        expect(result.current.theme).toBe('dark');
    });

    it('persiste no localStorage', () => {
        const { result } = renderHook(() => useTheme());

        act(() => {
            result.current.setTheme('light');
        });

        const stored = JSON.parse(localStorage.getItem('theme-storage') || '{}');
        expect(stored.state.theme).toBe('light');
    });

    it('restaura do localStorage', () => {
        localStorage.setItem('theme-storage', JSON.stringify({ state: { theme: 'light' }, version: 0 }));
        useTheme.setState({ theme: 'light' });

        const { result } = renderHook(() => useTheme());
        expect(result.current.theme).toBe('light');
    });
});

describe('useThemeEffect', () => {
    beforeEach(() => {
        localStorage.clear();
        useTheme.setState({ theme: 'dark' });
        document.documentElement.classList.remove('light', 'dark');
    });

    it('aplica classe dark no document.documentElement', () => {
        renderHook(() => useThemeEffect());
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        expect(document.documentElement.classList.contains('light')).toBe(false);
    });

    it('remove classe anterior ao trocar tema', () => {
        renderHook(() => useThemeEffect());
        expect(document.documentElement.classList.contains('dark')).toBe(true);

        act(() => {
            useTheme.setState({ theme: 'light' });
        });

        expect(document.documentElement.classList.contains('light')).toBe(true);
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
});
