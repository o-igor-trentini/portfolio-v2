import { useEffect, type FC, type ReactElement } from 'react';
import { useI18n, type Language } from '../../hooks/useLanguage';

const langMap: Record<Language, string> = {
    pt: 'pt-BR',
    en: 'en',
    es: 'es',
};

const ogLocaleMap: Record<Language, string> = {
    pt: 'pt_BR',
    en: 'en_US',
    es: 'es_ES',
};

export const SEO: FC = (): ReactElement => {
    const { t, language } = useI18n();

    const title = t('seo.title');
    const description = t('seo.description');
    const keywords = t('seo.keywords');
    const ogLocale = ogLocaleMap[language];

    useEffect(() => {
        document.documentElement.lang = langMap[language];
    }, [language]);

    return (
        <>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:locale" content={ogLocale} />
        </>
    );
};
