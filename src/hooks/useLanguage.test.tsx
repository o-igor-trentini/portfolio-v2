import { renderHook, act } from '@testing-library/react';
import i18n from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { type ReactNode } from 'react';
import ptTranslations from '@/lib/i18n/locales/pt';
import enTranslations from '@/lib/i18n/locales/en';
import esTranslations from '@/lib/i18n/locales/es';
import { useI18n } from './useLanguage';

const testI18n = i18n.createInstance();

testI18n.use(initReactI18next).init({
    resources: {
        pt: { translation: ptTranslations },
        en: { translation: enTranslations },
        es: { translation: esTranslations },
    },
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
});

const wrapper = ({ children }: { children: ReactNode }) => (
    <I18nextProvider i18n={testI18n}>{children}</I18nextProvider>
);

describe('useI18n', () => {
    beforeEach(async () => {
        await testI18n.changeLanguage('pt');
    });

    it('retorna t, language e setLanguage', () => {
        const { result } = renderHook(() => useI18n(), { wrapper });

        expect(result.current.t).toBeDefined();
        expect(result.current.language).toBeDefined();
        expect(result.current.setLanguage).toBeDefined();
    });

    it('inicializa com idioma pt', () => {
        const { result } = renderHook(() => useI18n(), { wrapper });
        expect(result.current.language).toBe('pt');
    });

    it('troca para en', async () => {
        const { result } = renderHook(() => useI18n(), { wrapper });

        await act(async () => {
            result.current.setLanguage('en');
        });

        expect(result.current.language).toBe('en');
    });

    it('troca para es', async () => {
        const { result } = renderHook(() => useI18n(), { wrapper });

        await act(async () => {
            result.current.setLanguage('es');
        });

        expect(result.current.language).toBe('es');
    });

    it('traduz chaves corretamente em pt', () => {
        const { result } = renderHook(() => useI18n(), { wrapper });
        expect(result.current.t('nav.home')).toBe('Início');
        expect(result.current.t('nav.projects')).toBe('Projetos');
    });

    it('traduz chaves corretamente após trocar para en', async () => {
        const { result } = renderHook(() => useI18n(), { wrapper });

        await act(async () => {
            result.current.setLanguage('en');
        });

        expect(result.current.t('nav.home')).toBe('Home');
        expect(result.current.t('nav.projects')).toBe('Projects');
    });
});
