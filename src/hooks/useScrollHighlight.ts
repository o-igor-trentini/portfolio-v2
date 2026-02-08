import { useCallback } from 'react';

export const useScrollHighlight = () => {
    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (!element) return;

        element.scrollIntoView({ behavior: 'smooth' });

        element.classList.add('section-highlight');
        const handleAnimationEnd = () => {
            element.classList.remove('section-highlight');
            element.removeEventListener('animationend', handleAnimationEnd);
        };
        element.addEventListener('animationend', handleAnimationEnd);
    }, []);

    return { scrollToSection };
};
