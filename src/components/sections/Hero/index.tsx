import { useLanguage } from '@hooks';
import { Button } from '@ui';
import { ArrowRight, Mail, Github, Linkedin } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState, useRef, useCallback, type ReactElement } from 'react';
import { PriorityImage } from '../../common/OptimizedImage';
import { SocialLinks } from '../Contact/constants';

export const Hero = (): ReactElement => {
    const { t } = useLanguage();
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const rafId = useRef<number | undefined>(undefined);

    const scrollToSection = useCallback((id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Throttle usando RAF para desktop apenas
            if (rafId.current) return;
            rafId.current = requestAnimationFrame(() => {
                setMousePosition({
                    x: (e.clientX / window.innerWidth) * 100,
                    y: (e.clientY / window.innerHeight) * 100,
                });
                rafId.current = undefined;
            });
        };

        // Apenas em desktop
        if (window.innerWidth >= 768) {
            window.addEventListener('mousemove', handleMouseMove, { passive: true });
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (rafId.current) {
                cancelAnimationFrame(rafId.current);
            }
        };
    }, []);

    return (
        <section
            id="home"
            className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white dark:bg-zinc-950"
        >
            {/* Animated Mesh Gradient Background */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                {/* Multiple layered animated gradients for depth */}
                <motion.div
                    animate={{
                        backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute inset-0 opacity-30 md:opacity-50"
                    style={{
                        willChange: 'background-position',
                        backgroundImage:
                            'radial-gradient(at 20% 30%, rgba(124, 58, 237, 0.12) 0px, transparent 50%), radial-gradient(at 80% 70%, rgba(236, 72, 153, 0.1) 0px, transparent 50%)',
                        backgroundSize: '300% 300%',
                    }}
                />

                {/* Secondary gradient layer with different timing */}
                <motion.div
                    animate={{
                        backgroundPosition: ['100% 100%', '0% 0%', '100% 100%'],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute inset-0 opacity-20 md:opacity-40"
                    style={{
                        willChange: 'background-position',
                        backgroundImage:
                            'radial-gradient(at 60% 40%, rgba(124, 58, 237, 0.08) 0px, transparent 60%), radial-gradient(at 30% 80%, rgba(236, 72, 153, 0.08) 0px, transparent 60%)',
                        backgroundSize: '250% 250%',
                    }}
                />

                {/* Interactive gradient that follows mouse - Hidden on mobile */}
                <div
                    className="absolute inset-0 opacity-50 transition-all duration-700 hidden md:block"
                    style={{
                        background: `radial-gradient(700px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(124, 58, 237, 0.15), transparent 50%)`,
                    }}
                />

                {/* Animated dots pattern - Smaller on mobile */}
                <motion.div
                    animate={{
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute inset-0"
                    style={{
                        willChange: 'opacity',
                        backgroundImage:
                            'radial-gradient(circle at 2px 2px, rgba(124, 58, 237, 0.15) 1px, transparent 0)',
                        backgroundSize: '30px 30px',
                    }}
                />

                {/* Animated mesh grid with SVG - Reduced opacity on mobile */}
                <svg
                    className="absolute inset-0 w-full h-full opacity-10 md:opacity-20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient id="grid-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.3">
                                <animate
                                    attributeName="stop-opacity"
                                    values="0.3;0.6;0.3"
                                    dur="3s"
                                    repeatCount="indefinite"
                                />
                            </stop>
                            <stop offset="50%" stopColor="#ec4899" stopOpacity="0.2">
                                <animate
                                    attributeName="stop-opacity"
                                    values="0.2;0.4;0.2"
                                    dur="3s"
                                    repeatCount="indefinite"
                                />
                            </stop>
                            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.3">
                                <animate
                                    attributeName="stop-opacity"
                                    values="0.3;0.6;0.3"
                                    dur="3s"
                                    repeatCount="indefinite"
                                />
                            </stop>
                        </linearGradient>
                        <pattern id="grid-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
                            <circle cx="40" cy="40" r="1.5" fill="url(#grid-gradient)">
                                <animate attributeName="r" values="1;2.5;1" dur="5s" repeatCount="indefinite" />
                            </circle>
                            <path
                                d="M 0 40 Q 20 35, 40 40 T 80 40"
                                stroke="url(#grid-gradient)"
                                strokeWidth="0.5"
                                fill="none"
                                opacity="0.4"
                            >
                                <animate
                                    attributeName="d"
                                    values="M 0 40 Q 20 35, 40 40 T 80 40;M 0 40 Q 20 45, 40 40 T 80 40;M 0 40 Q 20 35, 40 40 T 80 40"
                                    dur="6s"
                                    repeatCount="indefinite"
                                />
                            </path>
                            <path
                                d="M 40 0 Q 35 20, 40 40 T 40 80"
                                stroke="url(#grid-gradient)"
                                strokeWidth="0.5"
                                fill="none"
                                opacity="0.4"
                            >
                                <animate
                                    attributeName="d"
                                    values="M 40 0 Q 35 20, 40 40 T 40 80;M 40 0 Q 45 20, 40 40 T 40 80;M 40 0 Q 35 20, 40 40 T 40 80"
                                    dur="6s"
                                    repeatCount="indefinite"
                                />
                            </path>
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                </svg>

                {/* Floating organic shapes */}
                <motion.div
                    animate={{
                        x: [0, 120, 0],
                        y: [0, -80, 0],
                        rotate: [0, 180, 360],
                        borderRadius: ['30% 70% 70% 30%', '70% 30% 30% 70%', '30% 70% 70% 30%'],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute top-20 left-[15%] w-40 h-40 border border-purple-500/15"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 100, 0],
                        rotate: [0, -180, -360],
                        borderRadius: ['60% 40% 40% 60%', '40% 60% 60% 40%', '60% 40% 40% 60%'],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute bottom-32 right-[15%] w-32 h-32 border border-pink-500/15"
                />

                {/* Animated scan lines for tech feel */}
                <motion.div
                    animate={{
                        y: ['0%', '100%'],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(124, 58, 237, 0.03) 2px, rgba(124, 58, 237, 0.03) 4px)',
                    }}
                />

                {/* Large gradient orbs with complex animation */}
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.2, 1],
                        opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute top-10 right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-purple-500 to-pink-500 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 50, 0],
                        scale: [1, 1.3, 1],
                        opacity: [0.15, 0.3, 0.15],
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute bottom-10 left-[10%] w-[500px] h-[500px] bg-gradient-to-tr from-pink-500 via-purple-500 to-pink-600 rounded-full blur-3xl"
                />

                {/* Additional smaller orbs for depth */}
                <motion.div
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.1, 0.2, 0.1],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                    className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-400 rounded-full blur-3xl"
                />

                {/* Noise texture overlay for depth */}
                <div
                    className="absolute inset-0 opacity-[0.02] dark:opacity-[0.03]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
                    }}
                />
            </div>

            {/* Minimalist Gray Grid Lines - SEPARATE LAYER ABOVE BACKGROUND */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
                {/* Vertical lines */}
                <div
                    className="absolute inset-0 opacity-20 dark:opacity-15"
                    style={{
                        backgroundImage:
                            'repeating-linear-gradient(90deg, transparent, transparent 99px, #71717a 99px, #71717a 100px)',
                    }}
                />
                {/* Horizontal lines */}
                <div
                    className="absolute inset-0 opacity-20 dark:opacity-15"
                    style={{
                        backgroundImage:
                            'repeating-linear-gradient(0deg, transparent, transparent 99px, #71717a 99px, #71717a 100px)',
                    }}
                />
                {/* Diagonal grid overlay - subtle */}
                <div
                    className="absolute inset-0 opacity-10 dark:opacity-8"
                    style={{
                        backgroundImage:
                            'repeating-linear-gradient(45deg, transparent, transparent 149px, #71717a 149px, #71717a 150px)',
                    }}
                />
            </div>

            <div className="container mx-auto px-4 py-20">
                <div className="max-w-6xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        {/* Left Column - Profile Image with unique design */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, type: 'spring' }}
                            className="relative order-2 lg:order-1"
                        >
                            <div className="relative w-full max-w-md mx-auto aspect-square">
                                {/* Animated blob shape background */}
                                <motion.div
                                    animate={{
                                        borderRadius: [
                                            '60% 40% 30% 70% / 60% 30% 70% 40%',
                                            '30% 60% 70% 40% / 50% 60% 30% 60%',
                                            '60% 40% 30% 70% / 60% 30% 70% 40%',
                                        ],
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: 'easeInOut',
                                    }}
                                    className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 opacity-20 blur-2xl"
                                />

                                {/* Main image container with morphing border */}
                                <div className="relative w-full h-full">
                                    {/* Gradient border with morphing */}
                                    <motion.div
                                        animate={{
                                            borderRadius: [
                                                '60% 40% 30% 70% / 60% 30% 70% 40%',
                                                '30% 60% 70% 40% / 50% 60% 30% 60%',
                                                '60% 40% 30% 70% / 60% 30% 70% 40%',
                                            ],
                                        }}
                                        transition={{
                                            duration: 8,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                        className="absolute inset-0 p-1"
                                        style={{
                                            background:
                                                'linear-gradient(135deg, #7c3aed 0%, #ec4899 50%, #7c3aed 100%)',
                                        }}
                                    >
                                        {/* Inner background with same morphing shape - SEMI-TRANSPARENT GRADIENT */}
                                        <motion.div
                                            animate={{
                                                borderRadius: [
                                                    '60% 40% 30% 70% / 60% 30% 70% 40%',
                                                    '30% 60% 70% 40% / 50% 60% 30% 60%',
                                                    '60% 40% 30% 70% / 60% 30% 70% 40%',
                                                ],
                                            }}
                                            transition={{
                                                duration: 8,
                                                repeat: Infinity,
                                                ease: 'easeInOut',
                                            }}
                                            className="w-full h-full bg-gradient-to-br from-white/95 via-white/98 to-white/95 dark:from-zinc-950/95 dark:via-zinc-950/98 dark:to-zinc-950/95"
                                        />
                                    </motion.div>

                                    {/* Profile image with same morphing */}
                                    <motion.div
                                        animate={{
                                            borderRadius: [
                                                '60% 40% 30% 70% / 60% 30% 70% 40%',
                                                '30% 60% 70% 40% / 50% 60% 30% 60%',
                                                '60% 40% 30% 70% / 60% 30% 70% 40%',
                                            ],
                                        }}
                                        transition={{
                                            duration: 8,
                                            repeat: Infinity,
                                            ease: 'easeInOut',
                                        }}
                                        className="absolute inset-3 overflow-hidden bg-zinc-100 dark:bg-zinc-900 shadow-2xl"
                                    >
                                        <PriorityImage
                                            src="/images/perfil.webp"
                                            alt="Igor Trentini"
                                            className="w-full h-full object-cover scale-110"
                                            noSrcSet
                                        />
                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/30 via-transparent to-transparent" />
                                    </motion.div>

                                    {/* Floating particles around image */}
                                    {[...Array(8)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            animate={{
                                                y: [0, -30, 0],
                                                opacity: [0.3, 1, 0.3],
                                            }}
                                            transition={{
                                                duration: 3 + i * 0.5,
                                                repeat: Infinity,
                                                delay: i * 0.4,
                                            }}
                                            className="absolute w-2 h-2 bg-purple-500 rounded-full"
                                            style={{
                                                top: `${10 + i * 12}%`,
                                                left: i % 2 === 0 ? '-5%' : '105%',
                                            }}
                                        />
                                    ))}
                                </div>

                                {/* Floating info cards */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="absolute -top-4 -right-2 md:-top-6 md:-right-6 bg-white dark:bg-zinc-900 rounded-xl md:rounded-2xl px-3 py-2 md:px-4 md:py-3 shadow-xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm"
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                        <span className="text-xs md:text-sm whitespace-nowrap">
                                            {t('hero.available')}
                                        </span>
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 1 }}
                                    whileHover={{ scale: 1.05 }}
                                    className="absolute -bottom-4 -left-2 md:-bottom-6 md:-left-6 bg-white dark:bg-zinc-900 rounded-xl md:rounded-2xl px-3 py-2 md:px-4 md:py-3 shadow-xl border border-zinc-200 dark:border-zinc-800 backdrop-blur-sm"
                                >
                                    <div className="flex items-center gap-2 md:gap-3">
                                        <div className="text-xl md:text-2xl">💻</div>
                                        <div>
                                            <p className="text-xs text-zinc-500">{t('hero.specialist')}</p>
                                            <p className="text-xs md:text-sm">Go • React • TS</p>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Right Column - Text Content */}
                        <div className="order-1 lg:order-2 text-center lg:text-left">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6 backdrop-blur-sm"
                            >
                                <motion.div
                                    animate={{ scale: [1, 1.2, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-2 h-2 bg-purple-500 rounded-full"
                                />
                                <span className="text-purple-500">{t('hero.info.title.greeting')}</span>
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mb-4 bg-gradient-to-r from-zinc-900 via-purple-900 to-zinc-900 dark:from-white dark:via-purple-200 dark:to-white bg-clip-text text-transparent"
                            >
                                Igor Trentini
                            </motion.h1>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="mb-6"
                            >
                                <h2 className="text-purple-500 mb-2">{t('hero.info.title.role')}</h2>
                                <p className="text-zinc-600 dark:text-zinc-400">{t('hero.info.title.subtitle')}</p>
                            </motion.div>

                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-lg mx-auto lg:mx-0"
                            >
                                {t('hero.info.description')}
                            </motion.p>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8"
                            >
                                <Button
                                    size="lg"
                                    onClick={() => scrollToSection('projects')}
                                    className="bg-purple-500 hover:bg-purple-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
                                >
                                    {t('hero.info.projectButton')}
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    onClick={() => scrollToSection('contact')}
                                    className="border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-500/5"
                                >
                                    <Mail className="mr-2 w-4 h-4" />
                                    {t('hero.info.socialButton')}
                                </Button>
                            </motion.div>

                            {/* Social Links */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                                className="flex flex-wrap items-center justify-center lg:justify-start gap-3 md:gap-4"
                            >
                                <motion.a
                                    href={SocialLinks.Github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:border-purple-500/50 transition-colors"
                                    aria-label={t('accessibility.visitGitHub')}
                                >
                                    <Github className="w-5 h-5" />
                                </motion.a>
                                <motion.a
                                    href={SocialLinks.Linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-10 h-10 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center justify-center hover:border-purple-500/50 transition-colors"
                                    aria-label={t('accessibility.visitLinkedIn')}
                                >
                                    <Linkedin className="w-5 h-5" />
                                </motion.a>
                                <div className="hidden sm:block h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
                                <span className="hidden sm:inline text-sm text-zinc-500">{t('hero.connect')}</span>
                            </motion.div>

                            {/* Tech stack badges */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className="mt-8 md:mt-12 flex flex-wrap gap-2 md:gap-3 justify-center lg:justify-start"
                            >
                                {['Golang', 'React', 'TypeScript', 'PostgreSQL', 'Docker'].map((tech, i) => (
                                    <motion.div
                                        key={tech}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 1 + i * 0.1 }}
                                        whileHover={{ y: -4 }}
                                        className="px-3 md:px-4 py-1.5 md:py-2 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md hover:border-purple-500/50 transition-all"
                                    >
                                        <code className="text-xs md:text-sm text-purple-500">{tech}</code>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 1.5, y: { duration: 2, repeat: Infinity } }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-zinc-400"
            >
                <span className="text-xs">{t('hero.scrollToExplore')}</span>
                <div className="w-6 h-10 rounded-full border-2 border-zinc-300 dark:border-zinc-700 flex items-start justify-center p-2">
                    <motion.div
                        animate={{ y: [0, 12, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="w-1 h-2 bg-purple-500 rounded-full"
                    />
                </div>
            </motion.div>
        </section>
    );
};
