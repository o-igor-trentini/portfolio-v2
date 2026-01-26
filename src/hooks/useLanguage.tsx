import { useTranslation } from 'react-i18next';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '../i18n/config';

type Language = 'pt' | 'en' | 'es';

interface LanguageStore {
    language: Language;
    setLanguage: (language: Language) => void;
}

export const useLanguage = create<LanguageStore>()(
    persist(
        (set) => ({
            language: 'pt',
            setLanguage: (language) => {
                set({ language });
                // Also update i18next
                i18n.changeLanguage(language);
            },
        }),
        {
            name: 'language-storage',
        },
    ),
);

// Custom hook that combines zustand and i18next
export const useI18n = () => {
    const { t } = useTranslation();
    const { language, setLanguage } = useLanguage();

    const changeLanguage = (lang: Language) => {
        setLanguage(lang);
    };

    return { t, language, setLanguage: changeLanguage };
};
