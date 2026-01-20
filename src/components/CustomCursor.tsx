import { motion } from 'motion/react';
import { useEffect, useState, useRef } from 'react';

export const CustomCursor = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const rafId = useRef<number | undefined>(undefined);

    useEffect(() => {
        const updateMousePosition = (e: MouseEvent) => {
            // Throttle usando requestAnimationFrame para 60fps
            if (rafId.current) return;
            rafId.current = requestAnimationFrame(() => {
                setMousePosition({ x: e.clientX, y: e.clientY });
                rafId.current = undefined;
            });
        };

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', updateMousePosition);
        window.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', updateMousePosition);
            window.removeEventListener('mouseover', handleMouseOver);
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, []);

    return (
        <>
            <motion.div
                className="fixed top-0 left-0 w-4 h-4 bg-purple-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{ willChange: 'transform' }}
                animate={{
                    x: mousePosition.x - 8,
                    y: mousePosition.y - 8,
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            />

            <motion.div
                className="fixed top-0 left-0 w-8 h-8 border-2 border-purple-500/50 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{ willChange: 'transform' }}
                animate={{
                    x: mousePosition.x - 16,
                    y: mousePosition.y - 16,
                    scale: isHovering ? 1.5 : 1,
                }}
                transition={{ type: 'spring', stiffness: 150, damping: 15 }}
            />
        </>
    );
};
