import { render, type RenderOptions } from '@testing-library/react';
import { type ReactElement, type ReactNode } from 'react';
import { I18nTestProvider } from './i18n';

const AllProviders = ({ children }: { children: ReactNode }) => (
    <I18nTestProvider>{children}</I18nTestProvider>
);

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
    render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { customRender as render };
