import { Heart, Code } from 'lucide-react';
import { motion } from 'motion/react';
import type { ReactElement } from 'react';

const Footer = (): ReactElement => {
    return (
        <footer className="border-t border-zinc-200 dark:border-zinc-800 py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400"
                    >
                        <Code className="w-4 h-4" />
                        <span className="text-sm">© 2025 Igor Trentini. All rights reserved.</span>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400"
                    >
                        <span className="text-sm">Made with</span>
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                            }}
                            transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                        >
                            <Heart className="w-4 h-4 text-purple-500 fill-purple-500" />
                        </motion.div>
                        <span className="text-sm">using React, TypeScript & Tailwind</span>
                    </motion.div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
