import { useLanguage, useTheme } from '@hooks';
import { Moon, Sun, Globe, Menu, X, Terminal as TerminalIcon } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, type FC, type ReactElement } from 'react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';

interface HeaderProps {
    onTerminalToggle: () => void;
}

export const Header: FC<HeaderProps> = ({ onTerminalToggle }): ReactElement => {
    const { theme, toggleTheme } = useTheme();
    const { t, language, setLanguage } = useLanguage();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    };

    const languages = [
        { code: 'pt' as const, label: 'PT', flag: '🇧🇷' },
        { code: 'en' as const, label: 'EN', flag: '🇺🇸' },
        { code: 'es' as const, label: 'ES', flag: '🇪🇸' },
    ];

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-lg border-b border-zinc-200 dark:border-zinc-800"
        >
            <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="tracking-tight"
                >
                    Igor Trentini
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    <button onClick={() => scrollToSection('home')} className="hover:text-purple-500 transition-colors">
                        {t('nav.home')}
                    </button>
                    <button
                        onClick={() => scrollToSection('projects')}
                        className="hover:text-purple-500 transition-colors"
                    >
                        {t('nav.projects')}
                    </button>
                    <button
                        onClick={() => scrollToSection('about')}
                        className="hover:text-purple-500 transition-colors"
                    >
                        {t('nav.about')}
                    </button>
                    <button
                        onClick={() => scrollToSection('experience')}
                        className="hover:text-purple-500 transition-colors"
                    >
                        {t('nav.experience')}
                    </button>
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="hover:text-purple-500 transition-colors"
                    >
                        {t('nav.contact')}
                    </button>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleTheme}
                        className="hidden md:flex"
                        aria-label={t('accessibility.toggleTheme')}
                    >
                        {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="hidden md:flex"
                                aria-label={t('accessibility.selectLanguage')}
                            >
                                <Globe className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {languages.map((lang) => (
                                <DropdownMenuItem
                                    key={lang.code}
                                    onClick={() => setLanguage(lang.code)}
                                    className={language === lang.code ? 'bg-purple-500/10' : ''}
                                >
                                    <span className="mr-2">{lang.flag}</span>
                                    {lang.label}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={onTerminalToggle}
                        className="hidden md:flex"
                        aria-label={t('accessibility.openTerminal')}
                    >
                        <TerminalIcon className="w-4 h-4" />
                    </Button>

                    {/* Mobile Menu Button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden"
                        aria-label={mobileMenuOpen ? t('accessibility.closeMenu') : t('accessibility.openMenu')}
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </Button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950"
                >
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
                        <button
                            onClick={() => scrollToSection('home')}
                            className="text-left hover:text-purple-500 transition-colors"
                        >
                            {t('nav.home')}
                        </button>
                        <button
                            onClick={() => scrollToSection('projects')}
                            className="text-left hover:text-purple-500 transition-colors"
                        >
                            {t('nav.projects')}
                        </button>
                        <button
                            onClick={() => scrollToSection('about')}
                            className="text-left hover:text-purple-500 transition-colors"
                        >
                            {t('nav.about')}
                        </button>
                        <button
                            onClick={() => scrollToSection('experience')}
                            className="text-left hover:text-purple-500 transition-colors"
                        >
                            {t('nav.experience')}
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="text-left hover:text-purple-500 transition-colors"
                        >
                            {t('nav.contact')}
                        </button>
                        <div className="flex items-center gap-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                aria-label={t('accessibility.toggleTheme')}
                            >
                                {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="icon" aria-label={t('accessibility.selectLanguage')}>
                                        <Globe className="w-4 h-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    {languages.map((lang) => (
                                        <DropdownMenuItem
                                            key={lang.code}
                                            onClick={() => setLanguage(lang.code)}
                                            className={language === lang.code ? 'bg-purple-500/10' : ''}
                                        >
                                            <span className="mr-2">{lang.flag}</span>
                                            {lang.label}
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onTerminalToggle}
                                aria-label={t('accessibility.openTerminal')}
                            >
                                <TerminalIcon className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.header>
    );
};
