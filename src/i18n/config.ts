import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './index';

// Simple localStorage detection
const getSavedLanguage = (): string => {
    try {
        return localStorage.getItem('i18nextLng') || 'pt';
    } catch {
        return 'pt';
    }
};

i18n.use(initReactI18next).init({
    resources: {
        pt: { translation: translations.pt },
        en: { translation: translations.en },
        es: { translation: translations.es },
    },
    lng: getSavedLanguage(),
    fallbackLng: 'pt',
    interpolation: {
        escapeValue: false, // React already escapes values
    },
    react: {
        useSuspense: false,
    },
});

// Auto-save language changes to localStorage
i18n.on('languageChanged', (lng) => {
    localStorage.setItem('i18nextLng', lng);
});

export default i18n;
