import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translations from './index';

// Get the language from localStorage or use default
const getStoredLanguage = (): string => {
    try {
        const stored = localStorage.getItem('language-storage');
        if (stored) {
            const parsed = JSON.parse(stored);
            return parsed.state?.language || 'pt';
        }
    } catch {
        // If there's any error, fall back to default
    }
    return 'pt';
};

i18n.use(initReactI18next).init({
    resources: {
        pt: { translation: translations.pt },
        en: { translation: translations.en },
        es: { translation: translations.es },
    },
    lng: getStoredLanguage(),
    fallbackLng: 'pt',
    interpolation: {
        escapeValue: false, // React already escapes values
    },
    react: {
        useSuspense: false,
    },
});

export default i18n;
