import { useIsMobile } from '@ui';
import {
    Database,
    Globe,
    HardDrive,
    Layers,
    MessageSquare,
    Monitor,
    Server,
    Shield,
    Webhook,
    type LucideIcon,
} from 'lucide-react';
import { motion } from 'motion/react';
import { type CSSProperties, type FC, type ReactElement } from 'react';

export interface ArchitectureNode {
    label: string;
    detail?: string;
    items?: string[];
    icon?: string;
}

export interface ArchitectureLayer {
    title?: string;
    nodes: ArchitectureNode[];
}

interface ArchitectureFlowProps {
    layers: (ArchitectureNode[] | ArchitectureLayer)[];
}

/** Mapa de ícones disponíveis para uso nos locales */
const ICON_MAP: Record<string, LucideIcon> = {
    Database,
    Globe,
    HardDrive,
    Layers,
    MessageSquare,
    Monitor,
    Server,
    Shield,
    Webhook,
};

const LAYER_THEMES = [
    { accent: '#38bdf8', accentText: '#0369a1', glow: 'rgba(56,189,248,0.15)', border: 'rgba(56,189,248,0.35)' },
    { accent: '#a78bfa', accentText: '#6d28d9', glow: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.35)' },
    { accent: '#fbbf24', accentText: '#a16207', glow: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.30)' },
    { accent: '#34d399', accentText: '#047857', glow: 'rgba(52,211,153,0.15)', border: 'rgba(52,211,153,0.35)' },
    { accent: '#f472b6', accentText: '#be185d', glow: 'rgba(244,114,182,0.15)', border: 'rgba(244,114,182,0.35)' },
    { accent: '#22d3ee', accentText: '#0e7490', glow: 'rgba(34,211,238,0.15)', border: 'rgba(34,211,238,0.35)' },
];

/** Normaliza entrada: aceita tanto ArchitectureNode[] quanto ArchitectureLayer */
const normalizeLayer = (layer: ArchitectureNode[] | ArchitectureLayer): ArchitectureLayer => {
    if (Array.isArray(layer)) {
        return { nodes: layer };
    }
    return layer;
};

const NodeIcon: FC<{ name: string; color: string }> = ({ name, color }) => {
    const Icon = ICON_MAP[name];
    if (!Icon) return null;
    return <Icon className="relative shrink-0" size={14} style={{ color }} />;
};

const NodeCard: FC<{ node: ArchitectureNode; themeIndex: number; delay: number; compact?: boolean }> = ({
    node,
    themeIndex,
    delay,
    compact = false,
}) => {
    const theme = LAYER_THEMES[themeIndex % LAYER_THEMES.length];

    const hasItems = node.items && node.items.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ scale: 1.04 }}
            className={`relative rounded-xl cursor-default min-w-0 overflow-hidden ${hasItems ? `${compact ? 'px-2.5 py-2' : 'px-4 py-3'} text-left` : `flex flex-col items-center justify-center ${compact ? 'px-2.5 py-2' : 'px-4 py-2.5'} text-center`}`}
            style={{
                backgroundColor: '#1c1c22',
                border: `1px solid ${theme.border}`,
                boxShadow: `0 0 20px ${theme.glow}`,
            }}
        >
            {/* Glow overlay decorativo */}
            <div
                className="absolute inset-0 rounded-xl pointer-events-none overflow-hidden"
                style={{
                    background: `linear-gradient(135deg, ${theme.glow}, transparent 60%)`,
                }}
            />

            <span
                className={`relative flex items-center gap-1.5 font-semibold tracking-wide break-words ${compact ? 'text-xs' : 'text-sm'}`}
                style={{ color: '#f4f4f5' }}
            >
                {node.icon && <NodeIcon name={node.icon} color={theme.accent} />}
                <span className="min-w-0 break-words">{node.label}</span>
            </span>

            {node.detail && (
                <span
                    className={`relative mt-0.5 block font-bold tracking-wider uppercase break-words ${compact ? 'text-[10px]' : 'text-[11px]'}`}
                    style={{ color: theme.accent }}
                >
                    {node.detail}
                </span>
            )}

            {hasItems && !compact && (
                <ul className="relative mt-2 space-y-1">
                    {node.items?.map((item, i) => (
                        <li
                            key={i}
                            className="text-[11px] leading-normal pl-2.5"
                            style={{
                                listStyleType: 'disc',
                                listStylePosition: 'inside',
                                color: theme.accent,
                            }}
                        >
                            <span style={{ color: '#a1a1aa' }}>{item}</span>
                        </li>
                    ))}
                </ul>
            )}
        </motion.div>
    );
};

const FlowConnector: FC<{ delay: number; isMobile: boolean }> = ({ delay, isMobile }) => {
    const height = isMobile ? 32 : 40;

    return (
        <motion.div
            className="flex justify-center"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay, duration: 0.4 }}
        >
            <div className="flex flex-col items-center" style={{ height }}>
                {/* Linha pontilhada */}
                <div
                    className="flex-1 w-px"
                    style={{
                        backgroundImage: 'linear-gradient(to bottom, rgba(168,85,247,0.5) 50%, transparent 50%)',
                        backgroundSize: '1px 6px',
                    }}
                />

                {/* Chevron */}
                <svg width="12" height="8" viewBox="0 0 12 8" className="shrink-0 -mt-px">
                    <path
                        d="M1 1.5L6 6.5L11 1.5"
                        fill="none"
                        stroke="rgba(168,85,247,0.5)"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </div>
        </motion.div>
    );
};

/** Conexão horizontal pontilhada entre nós adjacentes na mesma camada */
const HorizontalConnector: FC<{ color: string; delay: number }> = ({ color, delay }) => (
    <motion.div
        className="flex items-center self-center shrink-0"
        aria-hidden="true"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay, duration: 0.4 }}
    >
        <div
            className="h-px w-4 sm:w-6"
            style={{
                backgroundImage: `linear-gradient(to right, ${color} 50%, transparent 50%)`,
                backgroundSize: '6px 1px',
            }}
        />
    </motion.div>
);

const LayerTitle: FC<{ title: string; color: string; delay: number }> = ({ title, color, delay }) => (
    <motion.span
        className="relative block mb-2 text-[10px] font-bold tracking-[0.15em] uppercase text-center"
        style={{ color }}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 0.8, y: 0 }}
        transition={{ delay, duration: 0.4 }}
    >
        {title}
    </motion.span>
);

const LayerGroup: FC<{
    nodes: ArchitectureNode[];
    layerIndex: number;
    delay: number;
    isMobile: boolean;
    title?: string;
}> = ({ nodes, layerIndex, delay, isMobile, title }) => {
    const theme = LAYER_THEMES[layerIndex % LAYER_THEMES.length];

    const containerStyle: CSSProperties = {
        border: `1px solid ${theme.border}`,
        background: `radial-gradient(ellipse at 50% 0%, ${theme.glow} 0%, transparent 70%)`,
    };

    const hasDetailedNodes = nodes.some((n) => n.items && n.items.length > 0);
    const useCompactGrid = isMobile && nodes.length > 4;
    const useMobileStack = isMobile && hasDetailedNodes;

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className={`relative w-full rounded-2xl backdrop-blur-sm overflow-hidden ${isMobile ? 'p-2.5' : 'p-4'}`}
            style={containerStyle}
        >
            {/* Dot grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
                style={{
                    backgroundImage: `radial-gradient(circle, ${theme.accent} 1px, transparent 1px)`,
                    backgroundSize: '16px 16px',
                }}
            />

            {title && <LayerTitle title={title} color={theme.accent} delay={delay} />}

            <div
                className={
                    useCompactGrid
                        ? 'relative grid grid-cols-2 gap-1.5'
                        : useMobileStack
                          ? 'relative flex flex-col gap-2'
                          : `relative flex flex-wrap items-stretch justify-center ${isMobile ? 'gap-2' : 'gap-3'}`
                }
            >
                {nodes.map((node, nodeIndex) => {
                    const showConnector = nodeIndex > 0 && !isMobile;
                    return (
                        <div
                            key={nodeIndex}
                            className={useCompactGrid || useMobileStack ? 'min-w-0' : 'flex items-stretch min-w-0'}
                        >
                            {showConnector && (
                                <HorizontalConnector color={theme.border} delay={delay + nodeIndex * 0.07 + 0.15} />
                            )}

                            <NodeCard
                                node={node}
                                themeIndex={layerIndex}
                                delay={delay + nodeIndex * 0.07 + 0.1}
                                compact={useCompactGrid}
                            />
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
};

const ArchitectureFlow: FC<ArchitectureFlowProps> = ({ layers }): ReactElement => {
    const isMobile = useIsMobile();

    return (
        <div className="relative flex flex-col items-center">
            {/* Linha central decorativa (fundo) */}
            <div
                className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 opacity-10"
                style={{
                    background:
                        'linear-gradient(to bottom, transparent, rgba(168,85,247,0.5) 20%, rgba(168,85,247,0.5) 80%, transparent)',
                }}
                aria-hidden="true"
            />

            {layers.map((rawLayer, layerIndex) => {
                const layer = normalizeLayer(rawLayer);

                return (
                    <div key={layerIndex} className="relative flex flex-col items-center w-full z-10">
                        {layerIndex > 0 && <FlowConnector delay={layerIndex * 0.2 + 0.15} isMobile={isMobile} />}

                        {layer.nodes.length === 1 && !layer.title ? (
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    delay: layerIndex * 0.2,
                                    duration: 0.5,
                                    ease: [0.23, 1, 0.32, 1],
                                }}
                            >
                                <NodeCard node={layer.nodes[0]} themeIndex={layerIndex} delay={layerIndex * 0.2} />
                            </motion.div>
                        ) : (
                            <LayerGroup
                                nodes={layer.nodes}
                                layerIndex={layerIndex}
                                delay={layerIndex * 0.2}
                                isMobile={isMobile}
                                title={layer.title}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default ArchitectureFlow;
