import { useEffect, useRef, useState, type RefObject } from 'react';

interface UseInViewportOptions {
    threshold?: number;
    rootMargin?: string;
}

/**
 * Observa se um elemento está visível no viewport usando IntersectionObserver.
 */
export const useInViewport = <T extends HTMLElement = HTMLElement>(
    options: UseInViewportOptions = {},
): { ref: RefObject<T | null>; isInViewport: boolean } => {
    const { threshold = 0, rootMargin = '0px' } = options;
    const ref = useRef<T | null>(null);
    const [isInViewport, setIsInViewport] = useState(true);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInViewport(entry.isIntersecting);
            },
            { threshold, rootMargin },
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [threshold, rootMargin]);

    return { ref, isInViewport };
};
