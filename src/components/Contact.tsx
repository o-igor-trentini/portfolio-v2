import { Send, Github, Linkedin, Mail, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { useState, type FormEvent } from 'react';
import { toast } from 'sonner';
import { GitHubWidget } from './GitHubWidget';
import { SpotifyWidget } from './SpotifyWidget';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { translations } from '../data/translations';
import { useLanguage } from '../hooks/useLanguage';

export const Contact = () => {
    const { language } = useLanguage();
    const t = translations[language];
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        toast.success(t.contact.success);
        setIsSubmitting(false);
        setFormData({ name: '', email: '', message: '' });
    };

    const socialLinks = [
        {
            name: 'GitHub',
            icon: Github,
            url: 'https://github.com/igortrentini',
            color: 'from-zinc-700 to-zinc-900',
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            url: 'https://linkedin.com/in/igortrentini',
            color: 'from-blue-600 to-blue-700',
        },
        {
            name: 'Email',
            icon: Mail,
            url: 'mailto:igor@example.com',
            color: 'from-red-500 to-pink-500',
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
                    <h2 className="mb-4">{t.contact.title}</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">{t.contact.subtitle}</p>
                </motion.div>

                <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                    <MessageSquare className="w-5 h-5 text-purple-500" />
                                </div>
                                <h3>{t.contact.send}</h3>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm mb-2 text-zinc-700 dark:text-zinc-300">
                                        {t.contact.name}
                                    </label>
                                    <Input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        required
                                        className="w-full"
                                        placeholder="Igor Trentini"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm mb-2 text-zinc-700 dark:text-zinc-300">
                                        {t.contact.email}
                                    </label>
                                    <Input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        required
                                        className="w-full"
                                        placeholder="igor@example.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm mb-2 text-zinc-700 dark:text-zinc-300">
                                        {t.contact.message}
                                    </label>
                                    <Textarea
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        required
                                        rows={6}
                                        className="w-full resize-none"
                                        placeholder={t.contact.subtitle}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                                    size="lg"
                                >
                                    {isSubmitting ? (
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                        >
                                            <Send className="w-4 h-4" />
                                        </motion.div>
                                    ) : (
                                        <>
                                            {t.contact.send}
                                            <Send className="ml-2 w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            </form>

                            {/* Social Links */}
                            <div className="mt-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">Or connect with me on:</p>
                                <div className="flex gap-3">
                                    {socialLinks.map((social, index) => {
                                        const Icon = social.icon;
                                        return (
                                            <motion.a
                                                key={social.name}
                                                href={social.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                whileHover={{ scale: 1.1, y: -2 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${social.color} flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow`}
                                            >
                                                <Icon className="w-5 h-5" />
                                            </motion.a>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* QR Code */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="mt-8 p-6 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20"
                            >
                                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3 text-center">
                                    LinkedIn QR Code
                                </p>
                                <div className="w-32 h-32 mx-auto bg-white rounded-lg flex items-center justify-center">
                                    <div className="w-24 h-24 bg-zinc-200 rounded" />
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Widgets Column */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        <SpotifyWidget />
                        <GitHubWidget />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
