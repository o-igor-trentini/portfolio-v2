import i18n, { type i18n as I18nInstance } from 'i18next';
import { type ReactNode } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import ptTranslations from '@/lib/i18n/locales/pt';

const testI18n: I18nInstance = i18n.createInstance();

testI18n.use(initReactI18next).init({
    resources: {
        pt: { translation: ptTranslations },
    },
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: {
        escapeValue: false,
    },
    react: {
        useSuspense: false,
    },
});

export const I18nTestProvider = ({ children }: { children: ReactNode }) => (
    <I18nextProvider i18n={testI18n}>{children}</I18nextProvider>
);

export { testI18n };
