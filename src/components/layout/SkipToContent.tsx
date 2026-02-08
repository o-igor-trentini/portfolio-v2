import { useLanguage } from '@hooks';
import type { FC, ReactElement } from 'react';

export const SkipToContent: FC = (): ReactElement => {
    const { t } = useLanguage();

    return (
        <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-purple-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
        >
            {t('accessibility.skipToContent')}
        </a>
    );
};
