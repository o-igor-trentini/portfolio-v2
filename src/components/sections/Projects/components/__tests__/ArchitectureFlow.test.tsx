import { createElement } from 'react';
import { render, screen } from '@/tests/helpers/render';
import { axe } from 'vitest-axe';
import ArchitectureFlow, { type ArchitectureNode, type ArchitectureLayer } from '../ArchitectureFlow';

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

let mockIsMobile = false;

vi.mock('@ui', async () => {
    const actual = await vi.importActual('@ui');
    return {
        ...actual,
        useIsMobile: () => mockIsMobile,
    };
});

const singleNodeLayers: ArchitectureNode[][] = [[{ label: 'Frontend' }], [{ label: 'Backend', detail: 'Node.js' }]];

const multiNodeLayer: ArchitectureNode[][] = [
    [{ label: 'Postgres' }, { label: 'Redis', detail: 'Cache' }, { label: 'S3', detail: 'Storage' }],
];

const layersWithItems: ArchitectureNode[][] = [
    [
        {
            label: 'API Gateway',
            detail: 'Go/Gin',
            items: ['Auth', 'Rate limiting', 'Logging'],
        },
    ],
];

const layersWithIcons: ArchitectureNode[][] = [
    [{ label: 'Database', icon: 'Database' }],
    [
        { label: 'Web App', icon: 'Globe' },
        { label: 'API Server', icon: 'Server' },
    ],
];

const layersWithInvalidIcon: ArchitectureNode[][] = [[{ label: 'Custom Service', icon: 'NonExistentIcon' }]];

const layersWithNoIcon: ArchitectureNode[][] = [[{ label: 'Plain Node' }]];

const architectureLayerFormat: (ArchitectureNode[] | ArchitectureLayer)[] = [
    { title: 'Camada Frontend', nodes: [{ label: 'React SPA' }] },
    { title: 'Camada Backend', nodes: [{ label: 'API REST' }, { label: 'Workers' }] },
];

const mixedFormat: (ArchitectureNode[] | ArchitectureLayer)[] = [
    [{ label: 'Browser' }],
    { title: 'Servidores', nodes: [{ label: 'App Server' }, { label: 'Queue' }] },
    [{ label: 'Database' }],
];

describe('ArchitectureFlow', () => {
    beforeEach(() => {
        mockIsMobile = false;
    });

    describe('renderizacao base', () => {
        it('deve renderizar labels de todos os nodes', () => {
            render(<ArchitectureFlow layers={singleNodeLayers} />);

            expect(screen.getByText('Frontend')).toBeInTheDocument();
            expect(screen.getByText('Backend')).toBeInTheDocument();
        });

        it('deve renderizar textos de detalhe quando fornecidos', () => {
            render(<ArchitectureFlow layers={singleNodeLayers} />);

            expect(screen.getByText('Node.js')).toBeInTheDocument();
        });

        it('deve renderizar sub-itens como lista', () => {
            render(<ArchitectureFlow layers={layersWithItems} />);

            expect(screen.getByText('Auth')).toBeInTheDocument();
            expect(screen.getByText('Rate limiting')).toBeInTheDocument();
            expect(screen.getByText('Logging')).toBeInTheDocument();
        });

        it('deve renderizar items como <li> com disc style', () => {
            const { container } = render(<ArchitectureFlow layers={layersWithItems} />);
            const listItems = container.querySelectorAll('li');

            expect(listItems.length).toBe(3);
            listItems.forEach((li) => {
                expect(li.style.listStyleType).toBe('disc');
                expect(li.style.listStylePosition).toBe('inside');
            });
        });
    });

    describe('layout de camadas', () => {
        it('deve renderizar single-node layer sem container LayerGroup', () => {
            const { container } = render(<ArchitectureFlow layers={[[{ label: 'Solo Node' }]]} />);

            const soloText = screen.getByText('Solo Node');
            const parentWrapper = soloText.closest('[class*="rounded-2xl"]');
            expect(parentWrapper).toBeNull();
        });

        it('deve renderizar multi-node layer dentro de container LayerGroup', () => {
            const { container } = render(<ArchitectureFlow layers={multiNodeLayer} />);

            const groupContainer = container.querySelector('[class*="rounded-2xl"]');
            expect(groupContainer).toBeInTheDocument();

            expect(screen.getByText('Postgres')).toBeInTheDocument();
            expect(screen.getByText('Redis')).toBeInTheDocument();
            expect(screen.getByText('S3')).toBeInTheDocument();
        });

        it('deve renderizar conectores verticais entre camadas', () => {
            const { container } = render(<ArchitectureFlow layers={singleNodeLayers} />);

            const connectorSvgs = container.querySelectorAll('svg');
            expect(connectorSvgs.length).toBeGreaterThanOrEqual(1);
        });

        it('nao deve renderizar conector vertical antes da primeira camada', () => {
            const { container } = render(<ArchitectureFlow layers={[[{ label: 'Only Layer' }]]} />);

            const svgs = container.querySelectorAll('svg');
            expect(svgs.length).toBe(0);
        });
    });

    describe('feature: icones', () => {
        it('deve renderizar icone SVG quando icon e fornecido', () => {
            const { container } = render(<ArchitectureFlow layers={layersWithIcons} />);

            const svgIcons = container.querySelectorAll('svg.lucide');
            expect(svgIcons.length).toBeGreaterThanOrEqual(1);
        });

        it('nao deve renderizar icone quando icon nao e fornecido', () => {
            const { container } = render(<ArchitectureFlow layers={layersWithNoIcon} />);

            const lucideIcons = container.querySelectorAll('svg.lucide');
            expect(lucideIcons.length).toBe(0);
        });

        it('nao deve quebrar com icone invalido/nao mapeado', () => {
            expect(() => {
                render(<ArchitectureFlow layers={layersWithInvalidIcon} />);
            }).not.toThrow();

            expect(screen.getByText('Custom Service')).toBeInTheDocument();
        });

        it('deve renderizar label junto com icone', () => {
            render(<ArchitectureFlow layers={layersWithIcons} />);

            expect(screen.getByText('Database')).toBeInTheDocument();
            expect(screen.getByText('Web App')).toBeInTheDocument();
            expect(screen.getByText('API Server')).toBeInTheDocument();
        });
    });

    describe('feature: titulo de camada (ArchitectureLayer)', () => {
        it('deve exibir titulo quando ArchitectureLayer com title e fornecido', () => {
            render(<ArchitectureFlow layers={architectureLayerFormat} />);

            expect(screen.getByText('Camada Frontend')).toBeInTheDocument();
            expect(screen.getByText('Camada Backend')).toBeInTheDocument();
        });

        it('deve renderizar nodes dentro de ArchitectureLayer', () => {
            render(<ArchitectureFlow layers={architectureLayerFormat} />);

            expect(screen.getByText('React SPA')).toBeInTheDocument();
            expect(screen.getByText('API REST')).toBeInTheDocument();
            expect(screen.getByText('Workers')).toBeInTheDocument();
        });

        it('deve funcionar com formato array simples (sem title)', () => {
            render(<ArchitectureFlow layers={singleNodeLayers} />);

            expect(screen.getByText('Frontend')).toBeInTheDocument();
            expect(screen.getByText('Backend')).toBeInTheDocument();
        });

        it('deve suportar mistura de formatos no mesmo array', () => {
            render(<ArchitectureFlow layers={mixedFormat} />);

            expect(screen.getByText('Browser')).toBeInTheDocument();
            expect(screen.getByText('Servidores')).toBeInTheDocument();
            expect(screen.getByText('App Server')).toBeInTheDocument();
            expect(screen.getByText('Queue')).toBeInTheDocument();
            expect(screen.getByText('Database')).toBeInTheDocument();
        });

        it('deve usar LayerGroup para single-node layer com title', () => {
            const layerWithTitle: (ArchitectureNode[] | ArchitectureLayer)[] = [
                { title: 'Titulo Solo', nodes: [{ label: 'Node Unico' }] },
            ];

            const { container } = render(<ArchitectureFlow layers={layerWithTitle} />);

            expect(screen.getByText('Titulo Solo')).toBeInTheDocument();
            expect(screen.getByText('Node Unico')).toBeInTheDocument();
            const groupContainer = container.querySelector('[class*="rounded-2xl"]');
            expect(groupContainer).toBeInTheDocument();
        });
    });

    describe('feature: conexoes horizontais', () => {
        it('deve renderizar conectores horizontais entre nodes adjacentes em desktop', () => {
            mockIsMobile = false;
            const { container } = render(<ArchitectureFlow layers={multiNodeLayer} />);

            const horizontalConnectors = container.querySelectorAll('[aria-hidden="true"] .h-px');
            expect(horizontalConnectors.length).toBe(2);
        });

        it('nao deve renderizar conectores horizontais para camada com 1 node', () => {
            mockIsMobile = false;
            const { container } = render(<ArchitectureFlow layers={[[{ label: 'Solo' }]]} />);

            const horizontalConnectors = container.querySelectorAll('.h-px');
            expect(horizontalConnectors.length).toBe(0);
        });

        it('nao deve renderizar conectores horizontais em mobile', () => {
            mockIsMobile = true;
            const { container } = render(<ArchitectureFlow layers={multiNodeLayer} />);

            const horizontalConnectors = container.querySelectorAll('[aria-hidden="true"] .h-px');
            expect(horizontalConnectors.length).toBe(0);
        });
    });

    describe('acessibilidade', () => {
        it('nao deve ter violacoes de acessibilidade com layers simples', async () => {
            const { container } = render(<ArchitectureFlow layers={singleNodeLayers} />);
            const results = await axe(container);

            expect(results).toHaveNoViolations();
        });

        it('nao deve ter violacoes de acessibilidade com layers complexas', async () => {
            const { container } = render(<ArchitectureFlow layers={mixedFormat} />);
            const results = await axe(container);

            expect(results).toHaveNoViolations();
        });

        it('conectores decorativos devem ter aria-hidden', () => {
            const { container } = render(<ArchitectureFlow layers={singleNodeLayers} />);

            const hiddenElements = container.querySelectorAll('[aria-hidden="true"]');
            expect(hiddenElements.length).toBeGreaterThanOrEqual(1);
        });
    });
});
