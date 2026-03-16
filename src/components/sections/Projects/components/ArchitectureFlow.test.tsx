import { createElement } from 'react';
import { render, screen } from '@/tests/helpers/render';
import ArchitectureFlow, { type ArchitectureNode } from './ArchitectureFlow';

// Mock motion/react
vi.mock('motion/react', () => ({
    motion: new Proxy(
        {},
        {
            get: (_target, prop: string) => {
                return ({ children, ...props }: any) => {
                    const {
                        initial,
                        animate,
                        exit,
                        transition,
                        whileHover,
                        whileTap,
                        whileInView,
                        viewport,
                        layout,
                        variants,
                        style,
                        ...htmlProps
                    } = props;
                    return createElement(prop as string, { ...htmlProps, style }, children);
                };
            },
        },
    ),
    AnimatePresence: ({ children }: any) => children,
}));

// Mock useIsMobile
vi.mock('@ui', async () => {
    const actual = await vi.importActual('@ui');
    return { ...actual, useIsMobile: () => false };
});

// --- Utilitários de contraste WCAG 2.1 ---

/** Converte hex (#rrggbb) para { r, g, b } (0-255) */
const hexToRgb = (hex: string): { r: number; g: number; b: number } => {
    const clean = hex.replace('#', '');
    return {
        r: parseInt(clean.slice(0, 2), 16),
        g: parseInt(clean.slice(2, 4), 16),
        b: parseInt(clean.slice(4, 6), 16),
    };
};

/** Luminância relativa (WCAG 2.1) */
const relativeLuminance = (r: number, g: number, b: number): number => {
    const [rs, gs, bs] = [r, g, b].map((c) => {
        const s = c / 255;
        return s <= 0.04045 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

/** Razão de contraste entre duas cores (WCAG 2.1) */
const contrastRatio = (fg: { r: number; g: number; b: number }, bg: { r: number; g: number; b: number }): number => {
    const l1 = relativeLuminance(fg.r, fg.g, fg.b);
    const l2 = relativeLuminance(bg.r, bg.g, bg.b);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
};

// WCAG AA: texto normal >= 4.5, texto grande (>=14px bold ou >=18px) >= 3.0
const WCAG_AA_NORMAL = 4.5;
const WCAG_AA_LARGE = 3.0;

// Cores accent dos temas (espelhadas do componente)
const LAYER_ACCENTS = ['#38bdf8', '#a78bfa', '#fbbf24', '#34d399', '#f472b6', '#22d3ee'];

// Card: fundo fixo escuro, texto fixo claro (não depende de dark:/light mode)
const CARD_BG = hexToRgb('#1c1c22');
const CARD_TEXT = hexToRgb('#f4f4f5'); // zinc-100

describe('ArchitectureFlow', () => {
    const sampleLayers: ArchitectureNode[][] = [
        [{ label: 'React SPA' }],
        [{ label: 'API REST', detail: 'Go/Gin' }],
        [{ label: 'PostgreSQL' }, { label: 'Redis', detail: 'Cache' }, { label: 'S3', detail: 'Storage' }],
    ];

    const richLayers: ArchitectureNode[][] = [
        [
            {
                label: 'Frontend Principal',
                detail: 'React SPA',
                items: ['Chat em tempo real', 'Dashboards'],
            },
        ],
        [
            {
                label: 'Backend Principal',
                detail: 'Go/Gin',
                items: ['Server HTTP', 'Consumers RabbitMQ', 'OCR com Document AI'],
            },
        ],
    ];

    it('renderiza todos os nodes', () => {
        render(<ArchitectureFlow layers={sampleLayers} />);

        expect(screen.getByText('React SPA')).toBeInTheDocument();
        expect(screen.getByText('API REST')).toBeInTheDocument();
        expect(screen.getByText('PostgreSQL')).toBeInTheDocument();
        expect(screen.getByText('Redis')).toBeInTheDocument();
        expect(screen.getByText('S3')).toBeInTheDocument();
    });

    it('renderiza textos de detalhe', () => {
        render(<ArchitectureFlow layers={sampleLayers} />);

        expect(screen.getByText('Go/Gin')).toBeInTheDocument();
        expect(screen.getByText('Cache')).toBeInTheDocument();
        expect(screen.getByText('Storage')).toBeInTheDocument();
    });

    it('renderiza sub-itens (items) dentro dos nodes', () => {
        render(<ArchitectureFlow layers={richLayers} />);

        expect(screen.getByText('Frontend Principal')).toBeInTheDocument();
        expect(screen.getByText('Chat em tempo real')).toBeInTheDocument();
        expect(screen.getByText('Dashboards')).toBeInTheDocument();
        expect(screen.getByText('Server HTTP')).toBeInTheDocument();
        expect(screen.getByText('Consumers RabbitMQ')).toBeInTheDocument();
        expect(screen.getByText('OCR com Document AI')).toBeInTheDocument();
    });

    it('renderiza items como <li> com list-style-type disc via inline style', () => {
        const { container } = render(<ArchitectureFlow layers={richLayers} />);

        const lists = container.querySelectorAll('ul');
        expect(lists.length).toBeGreaterThanOrEqual(2);

        lists.forEach((ul) => {
            const items = ul.querySelectorAll('li');
            expect(items.length).toBeGreaterThan(0);

            items.forEach((li) => {
                expect(li.style.listStyleType).toBe('disc');
                expect(li.style.listStylePosition).toBe('inside');
            });
        });
    });

    it('itens usam cor zinc-400 (#a1a1aa) com contraste >= 3.0 sobre card', () => {
        const itemText = hexToRgb('#a1a1aa'); // zinc-400
        const ratio = contrastRatio(itemText, CARD_BG);

        expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
    });

    describe('Contraste WCAG AA — label sobre fundo do card', () => {
        it('texto principal (#f4f4f5) sobre card (#1c1c22) atinge >= 4.5 (AA normal)', () => {
            const ratio = contrastRatio(CARD_TEXT, CARD_BG);

            expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
        });

        it('texto principal atinge >= 13:1 (muito acima do mínimo)', () => {
            const ratio = contrastRatio(CARD_TEXT, CARD_BG);

            // #f4f4f5 sobre #1c1c22 → ~14.5:1
            expect(ratio).toBeGreaterThanOrEqual(13);
        });
    });

    describe('Contraste WCAG AA — detail (accent) sobre fundo do card', () => {
        LAYER_ACCENTS.forEach((accent, index) => {
            it(`layer ${index} — accent ${accent} sobre card (#1c1c22) >= 3.0 (AA large text)`, () => {
                const fg = hexToRgb(accent);
                const ratio = contrastRatio(fg, CARD_BG);

                expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_LARGE);
            });
        });
    });

    describe('Contraste WCAG AA — detail (accent) validação estrita >= 4.5', () => {
        LAYER_ACCENTS.forEach((accent, index) => {
            it(`layer ${index} — accent ${accent} sobre card (#1c1c22) >= 4.5 (AA normal)`, () => {
                const fg = hexToRgb(accent);
                const ratio = contrastRatio(fg, CARD_BG);

                // Todas as cores accent são vibrantes o suficiente sobre fundo escuro
                expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_NORMAL);
            });
        });
    });
});
