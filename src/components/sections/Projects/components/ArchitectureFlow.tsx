import { useIsMobile } from '@ui';
import { motion } from 'motion/react';
import { type CSSProperties, type FC, type ReactElement } from 'react';

export interface ArchitectureNode {
    label: string;
    detail?: string;
    items?: string[];
}

interface ArchitectureFlowProps {
    layers: ArchitectureNode[][];
}

const LAYER_THEMES = [
    { accent: '#38bdf8', accentText: '#0369a1', glow: 'rgba(56,189,248,0.15)', border: 'rgba(56,189,248,0.35)' },
    { accent: '#a78bfa', accentText: '#6d28d9', glow: 'rgba(167,139,250,0.15)', border: 'rgba(167,139,250,0.35)' },
    { accent: '#fbbf24', accentText: '#a16207', glow: 'rgba(251,191,36,0.12)', border: 'rgba(251,191,36,0.30)' },
    { accent: '#34d399', accentText: '#047857', glow: 'rgba(52,211,153,0.15)', border: 'rgba(52,211,153,0.35)' },
    { accent: '#f472b6', accentText: '#be185d', glow: 'rgba(244,114,182,0.15)', border: 'rgba(244,114,182,0.35)' },
    { accent: '#22d3ee', accentText: '#0e7490', glow: 'rgba(34,211,238,0.15)', border: 'rgba(34,211,238,0.35)' },
];

const NodeCard: FC<{ node: ArchitectureNode; themeIndex: number; delay: number }> = ({ node, themeIndex, delay }) => {
    const theme = LAYER_THEMES[themeIndex % LAYER_THEMES.length];

    const hasItems = node.items && node.items.length > 0;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(4px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            whileHover={{ scale: 1.04 }}
            className={`relative rounded-xl cursor-default ${hasItems ? 'px-4 py-3 text-left' : 'flex flex-col items-center justify-center px-4 py-2.5 text-center'}`}
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

            <span className="relative text-sm font-semibold tracking-wide" style={{ color: '#f4f4f5' }}>
                {node.label}
            </span>

            {node.detail && (
                <span
                    className="relative mt-0.5 block text-[11px] font-bold tracking-wider uppercase"
                    style={{ color: theme.accent }}
                >
                    {node.detail}
                </span>
            )}

            {hasItems && (
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

const LayerGroup: FC<{
    nodes: ArchitectureNode[];
    layerIndex: number;
    delay: number;
    isMobile: boolean;
}> = ({ nodes, layerIndex, delay, isMobile }) => {
    const theme = LAYER_THEMES[layerIndex % LAYER_THEMES.length];

    const containerStyle: CSSProperties = {
        border: `1px solid ${theme.border}`,
        background: `radial-gradient(ellipse at 50% 0%, ${theme.glow} 0%, transparent 70%)`,
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="relative w-full rounded-2xl p-4 backdrop-blur-sm overflow-hidden"
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

            <div className={`relative flex flex-wrap items-stretch justify-center ${isMobile ? 'gap-2' : 'gap-3'}`}>
                {nodes.map((node, nodeIndex) => (
                    <NodeCard
                        key={nodeIndex}
                        node={node}
                        themeIndex={layerIndex}
                        delay={delay + nodeIndex * 0.07 + 0.1}
                    />
                ))}
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

            {layers.map((layer, layerIndex) => (
                <div key={layerIndex} className="relative flex flex-col items-center w-full z-10">
                    {layerIndex > 0 && <FlowConnector delay={layerIndex * 0.2 + 0.15} isMobile={isMobile} />}

                    {layer.length === 1 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                delay: layerIndex * 0.2,
                                duration: 0.5,
                                ease: [0.23, 1, 0.32, 1],
                            }}
                        >
                            <NodeCard node={layer[0]} themeIndex={layerIndex} delay={layerIndex * 0.2} />
                        </motion.div>
                    ) : (
                        <LayerGroup
                            nodes={layer}
                            layerIndex={layerIndex}
                            delay={layerIndex * 0.2}
                            isMobile={isMobile}
                        />
                    )}
                </div>
            ))}
        </div>
    );
};

export default ArchitectureFlow;
