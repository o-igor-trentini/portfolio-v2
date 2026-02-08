import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vite.dev/config/
export default defineConfig({
    base: '/', // Use '/' para domínio customizado, ou '/nome-do-repo/' para GitHub Pages padrão
    plugins: [
        react(),
        tsconfigPaths(),
        ViteImageOptimizer({
            png: {
                quality: 80,
            },
            jpeg: {
                quality: 80,
            },
            jpg: {
                quality: 80,
            },
            webp: {
                quality: 80,
            },
        }),
    ],
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: false,
        minify: 'esbuild',
        rollupOptions: {
            output: {
                manualChunks(id) {
                    if (!id.includes('node_modules')) return;

                    if (id.includes('/react-dom/') || id.includes('/react/')) return 'vendor';
                    if (id.includes('/motion/')) return 'motion';
                    if (id.includes('/lucide-react/')) return 'icons';
                    if (id.includes('/@radix-ui/')) return 'ui';
                    if (id.includes('/i18next/') || id.includes('/react-i18next/')) return 'i18n';
                },
            },
        },
    },
    server: {
        open: false,
        host: true,
        port: 3000,
    },
    preview: {
        open: false,
        host: true,
        port: 3000,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    },
});
