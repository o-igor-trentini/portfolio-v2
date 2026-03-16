import { motion } from 'motion/react';
import { type FC, type ReactElement } from 'react';

interface ProjectHeroPlaceholderProps {
    stack: string[];
    className?: string;
}

const FLOAT_VARIANTS = [
    { y: [0, -6, 0], duration: 4.5 },
    { y: [0, -8, 0], duration: 5.2 },
    { y: [0, -5, 0], duration: 3.8 },
    { y: [0, -7, 0], duration: 4.8 },
];

const ProjectHeroPlaceholder: FC<ProjectHeroPlaceholderProps> = ({ stack, className = '' }): ReactElement => {
    const displayStack = stack.slice(0, 6);

    return (
        <div
            className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-zinc-900 via-purple-950/40 to-zinc-900 ${className}`}
        >
            {/* Grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage:
                        'linear-gradient(rgba(168,85,247,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.4) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                }}
            />

            {/* Radial glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.15)_0%,transparent_70%)]" />

            {/* Tech badges */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 max-w-[85%] px-2 sm:px-4">
                    {displayStack.map((tech, index) => {
                        const variant = FLOAT_VARIANTS[index % FLOAT_VARIANTS.length];
                        return (
                            <motion.span
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{
                                    opacity: [0.6, 0.9, 0.6],
                                    scale: 1,
                                    y: variant.y,
                                }}
                                transition={{
                                    opacity: { duration: variant.duration, repeat: Infinity, ease: 'easeInOut' },
                                    y: {
                                        duration: variant.duration,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                        delay: index * 0.3,
                                    },
                                    scale: { duration: 0.5, delay: index * 0.08 },
                                }}
                                className="px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg text-[10px] sm:text-sm font-medium text-purple-200/90 border border-purple-500/20 bg-purple-500/10 backdrop-blur-sm shadow-[0_0_15px_rgba(168,85,247,0.1)]"
                            >
                                {tech}
                            </motion.span>
                        );
                    })}
                </div>
            </div>

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-purple-500/20 rounded-tl-2xl" />
            <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-purple-500/20 rounded-br-2xl" />
        </div>
    );
};

export default ProjectHeroPlaceholder;
