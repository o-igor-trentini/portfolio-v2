'use client';

import type { CSSProperties } from 'react';
import { Toaster as Sonner } from 'sonner';
import type { ToasterProps } from 'sonner';
import { useTheme } from '../../hooks/useTheme';

const Toaster = ({ ...props }: ToasterProps) => {
    const theme = useTheme((state) => state.theme);

    return (
        <Sonner
            theme={theme as ToasterProps['theme']}
            className="toaster group"
            style={
                {
                    '--normal-bg': 'var(--popover)',
                    '--normal-text': 'var(--popover-foreground)',
                    '--normal-border': 'var(--border)',
                } as CSSProperties
            }
            {...props}
        />
    );
};

export { Toaster };
