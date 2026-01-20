import { Briefcase, Calendar, MapPin, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';
import { Button } from './ui/button';
import { translations } from '../data/translations';
import { useLanguage } from '../hooks/useLanguage';

export function Experience() {
    const { language } = useLanguage();
    const t = translations[language];
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const experiences = [
        {
            id: 'logae',
            company: 'Logae',
            position: {
                pt: 'Full Stack Developer',
                en: 'Full Stack Developer',
                es: 'Full Stack Developer',
            },
            period: {
                pt: '2023 - Presente',
                en: '2023 - Present',
                es: '2023 - Presente',
            },
            current: true,
            location: {
                pt: 'Remoto',
                en: 'Remote',
                es: 'Remoto',
            },
            description: {
                pt: 'Desenvolvimento de sistemas escaláveis com Golang e React. Implementação de microserviços, APIs RESTful e interfaces modernas.',
                en: 'Development of scalable systems with Golang and React. Implementation of microservices, RESTful APIs and modern interfaces.',
                es: 'Desarrollo de sistemas escalables con Golang y React. Implementación de microservicios, APIs RESTful e interfaces modernas.',
            },
            achievements: {
                pt: [
                    'Reduziu latência de APIs em 40% através de otimizações',
                    'Implementou sistema de cache com Redis',
                    'Desenvolveu dashboard analytics com 100k+ eventos/dia',
                    'Migrou monolito para arquitetura de microserviços',
                ],
                en: [
                    'Reduced API latency by 40% through optimizations',
                    'Implemented caching system with Redis',
                    'Developed analytics dashboard with 100k+ events/day',
                    'Migrated monolith to microservices architecture',
                ],
                es: [
                    'Redujo latencia de APIs en 40% mediante optimizaciones',
                    'Implementó sistema de cache con Redis',
                    'Desarrolló dashboard analytics con 100k+ eventos/día',
                    'Migró monolito a arquitectura de microservicios',
                ],
            },
            tech: ['Golang', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker'],
        },
        {
            id: 'previous-2',
            company: 'Tech Solutions',
            position: {
                pt: 'Desenvolvedor Backend',
                en: 'Backend Developer',
                es: 'Desarrollador Backend',
            },
            period: {
                pt: '2021 - 2023',
                en: '2021 - 2023',
                es: '2021 - 2023',
            },
            current: false,
            location: {
                pt: 'São Paulo, Brasil',
                en: 'São Paulo, Brazil',
                es: 'São Paulo, Brasil',
            },
            description: {
                pt: 'Focado em desenvolvimento backend com Golang, criação de APIs e integração com serviços externos.',
                en: 'Focused on backend development with Golang, API creation and integration with external services.',
                es: 'Enfocado en desarrollo backend con Golang, creación de APIs e integración con servicios externos.',
            },
            achievements: {
                pt: [
                    'Desenvolveu API gateway para 15+ microserviços',
                    'Implementou autenticação JWT e OAuth2',
                    'Criou sistema de mensageria com RabbitMQ',
                ],
                en: [
                    'Developed API gateway for 15+ microservices',
                    'Implemented JWT and OAuth2 authentication',
                    'Created messaging system with RabbitMQ',
                ],
                es: [
                    'Desarrolló API gateway para 15+ microservicios',
                    'Implementó autenticación JWT y OAuth2',
                    'Creó sistema de mensajería con RabbitMQ',
                ],
            },
            tech: ['Golang', 'Node.js', 'MongoDB', 'RabbitMQ', 'Kubernetes'],
        },
        {
            id: 'previous-1',
            company: 'StartupXYZ',
            position: {
                pt: 'Desenvolvedor Full Stack Junior',
                en: 'Junior Full Stack Developer',
                es: 'Desarrollador Full Stack Junior',
            },
            period: {
                pt: '2020 - 2021',
                en: '2020 - 2021',
                es: '2020 - 2021',
            },
            current: false,
            location: {
                pt: 'São Paulo, Brasil',
                en: 'São Paulo, Brazil',
                es: 'São Paulo, Brasil',
            },
            description: {
                pt: 'Início da carreira desenvolvendo aplicações web com React e Node.js.',
                en: 'Career start developing web applications with React and Node.js.',
                es: 'Inicio de carrera desarrollando aplicaciones web con React y Node.js.',
            },
            achievements: {
                pt: [
                    'Desenvolveu 5+ features críticas do produto',
                    'Implementou testes automatizados (Jest/Cypress)',
                    'Colaborou em código reviews e pair programming',
                ],
                en: [
                    'Developed 5+ critical product features',
                    'Implemented automated tests (Jest/Cypress)',
                    'Collaborated on code reviews and pair programming',
                ],
                es: [
                    'Desarrolló 5+ features críticas del producto',
                    'Implementó tests automatizados (Jest/Cypress)',
                    'Colaboró en code reviews y pair programming',
                ],
            },
            tech: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
        },
    ];

    return (
        <section id="experience" className="py-32 bg-zinc-50 dark:bg-zinc-900/50">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="mb-4">{t.experience.title}</h2>
                    <p className="text-zinc-600 dark:text-zinc-400">{t.experience.subtitle}</p>
                </motion.div>

                <div className="max-w-4xl mx-auto relative">
                    {/* Vertical line */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 hidden md:block" />

                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={exp.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative"
                            >
                                {/* Timeline dot */}
                                <div
                                    className={`absolute left-8 top-8 w-4 h-4 rounded-full ${
                                        exp.current
                                            ? 'bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse'
                                            : 'bg-purple-500'
                                    } border-4 border-white dark:border-zinc-900 shadow-lg shadow-purple-500/50 -translate-x-1/2 hidden md:block z-10`}
                                />

                                <div
                                    className={`md:ml-20 bg-white dark:bg-zinc-900 rounded-2xl border ${
                                        exp.current
                                            ? 'border-purple-500 shadow-xl shadow-purple-500/20'
                                            : 'border-zinc-200 dark:border-zinc-800'
                                    } overflow-hidden hover:border-purple-500/50 transition-all duration-300 ${
                                        exp.current ? 'ring-2 ring-purple-500/20' : ''
                                    }`}
                                >
                                    {/* Badge "Atual" para o trabalho atual */}
                                    {exp.current && (
                                        <div className="absolute top-0 right-0 z-10">
                                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1.5 rounded-bl-2xl text-xs font-medium shadow-lg flex items-center gap-1.5">
                                                <motion.div
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: 'easeInOut',
                                                    }}
                                                    className="w-2 h-2 bg-white rounded-full"
                                                />
                                                {t.experience.present}
                                            </div>
                                        </div>
                                    )}

                                    <div className="p-6">
                                        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                                            <div>
                                                <h3 className="mb-1">{exp.company}</h3>
                                                <p className="text-purple-500 mb-2">{exp.position[language]}</p>
                                                <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        {exp.period[language]}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <MapPin className="w-4 h-4" />
                                                        {exp.location[language]}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                                <Briefcase className="w-6 h-6 text-purple-500" />
                                            </div>
                                        </div>

                                        <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                                            {exp.description[language]}
                                        </p>

                                        {/* Tech stack */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {exp.tech.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-500 text-sm"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Expandable achievements */}
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                                            className="gap-2"
                                        >
                                            {t.experience.viewDetails}
                                            <motion.div
                                                animate={{ rotate: expandedId === exp.id ? 180 : 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <ChevronDown className="w-4 h-4" />
                                            </motion.div>
                                        </Button>

                                        <motion.div
                                            initial={false}
                                            animate={{
                                                height: expandedId === exp.id ? 'auto' : 0,
                                                opacity: expandedId === exp.id ? 1 : 0,
                                            }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-4 mt-4 border-t border-zinc-200 dark:border-zinc-800">
                                                <ul className="space-y-2">
                                                    {exp.achievements[language].map((achievement, i) => (
                                                        <motion.li
                                                            key={i}
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: i * 0.1 }}
                                                            className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400"
                                                        >
                                                            <span className="text-purple-500 mt-1">→</span>
                                                            {achievement}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </motion.div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
