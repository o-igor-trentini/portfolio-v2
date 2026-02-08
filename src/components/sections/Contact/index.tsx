import { Github, Instagram, Linkedin, Share2 } from 'lucide-react';
import { motion } from 'motion/react';
import type { FC, ReactElement } from 'react';
import { GitHubWidget } from './components/GitHubWidget';
import { SpotifyWidget } from './components/SpotifyWidget';
import { SocialLinks } from './constants';
import { useLanguage } from '../../../hooks/useLanguage';

const Contact: FC = (): ReactElement => {
    const { t } = useLanguage();

    const socialLinks = [
        {
            name: t('contact.socials.github'),
            icon: Github,
            url: SocialLinks.Github,
            color: 'from-zinc-700 to-zinc-900',
            hoverColor: 'hover:from-zinc-600 hover:to-zinc-800',
        },
        {
            name: t('contact.socials.linkedin'),
            icon: Linkedin,
            url: SocialLinks.Linkedin,
            color: 'from-blue-600 to-blue-700',
            hoverColor: 'hover:from-blue-500 hover:to-blue-600',
        },
        {
            name: t('contact.socials.instagram'),
            icon: Instagram,
            url: SocialLinks.Instagram,
            color: 'from-red-500 to-pink-500',
            hoverColor: 'hover:from-red-400 hover:to-pink-400',
        },
    ];

    return (
        <section id="contact" className="py-32">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="mb-4">{t('contact.title')}</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">{t('contact.subtitle')}</p>
                </motion.div>

                <div className="space-y-6 max-w-7xl mx-auto">
                    {/* Social Networks Card - Linha Inteira */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                    <Share2 className="w-5 h-5 text-purple-500" />
                                </div>
                                <div>
                                    <h3>{t('contact.socials.title')}</h3>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                                        {t('contact.socials.subtitle')}
                                    </p>
                                </div>
                            </div>

                            {/* Mini Cards de Redes Sociais */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {socialLinks.map((social, index) => {
                                    const Icon = social.icon;
                                    return (
                                        <motion.a
                                            key={social.name}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            whileHover={{ scale: 1.02, y: -4 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-800 dark:to-zinc-900 border border-zinc-200 dark:border-zinc-700 p-6 transition-all hover:shadow-lg"
                                        >
                                            {/* Background Gradient on Hover */}
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-br ${social.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                                            />

                                            {/* Content */}
                                            <div className="relative flex items-center gap-4">
                                                <div
                                                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${social.color} ${social.hoverColor} flex items-center justify-center text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}
                                                >
                                                    <Icon className="w-6 h-6" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-medium text-zinc-900 dark:text-zinc-100 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                                        {social.name}
                                                    </p>
                                                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                                        {social.url.replace('https://', '').replace('mailto:', '')}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.a>
                                    );
                                })}
                            </div>
                        </div>
                    </motion.div>

                    {/* Widgets Row - Spotify e GitHub lado a lado */}
                    <div className="grid lg:grid-cols-2 gap-6">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <SpotifyWidget />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <GitHubWidget />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
