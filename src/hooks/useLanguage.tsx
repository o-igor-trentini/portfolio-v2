import { useTranslation } from 'react-i18next';

export type Language = 'pt' | 'en' | 'es';

export const useI18n = () => {
    const { t, i18n } = useTranslation();

    const changeLanguage = (lang: Language) => {
        i18n.changeLanguage(lang);
    };

    return {
        t,
        language: i18n.language as Language,
        setLanguage: changeLanguage,
    };
};
