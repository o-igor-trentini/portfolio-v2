export type TechBadge = 'favorite' | 'professional' | 'learning' | 'hobby';

export interface TechItem {
    name: string;
    badges?: TechBadge[];
    color: string;
}

export interface TechCategory {
    id: string;
    title: {
        pt: string;
        en: string;
        es: string;
    };
    icon: string;
    items: TechItem[];
}

export const techStackCategories: TechCategory[] = [
    {
        id: 'backend',
        title: {
            pt: 'Backend',
            en: 'Backend',
            es: 'Backend',
        },
        icon: 'Server',
        items: [
            { name: 'Golang', badges: ['favorite', 'professional'], color: 'from-cyan-500 to-blue-500' },
            { name: 'Node.js', badges: ['professional'], color: 'from-green-600 to-green-700' },
            { name: 'Python', badges: ['hobby'], color: 'from-yellow-500 to-blue-500' },
            { name: 'PostgreSQL', badges: ['favorite', 'professional'], color: 'from-blue-500 to-indigo-500' },
            { name: 'MongoDB', badges: ['professional'], color: 'from-green-500 to-emerald-600' },
            { name: 'Redis', badges: ['favorite', 'professional'], color: 'from-red-500 to-rose-500' },
            { name: 'MySQL', badges: ['professional'], color: 'from-blue-400 to-blue-600' },
            { name: 'GraphQL', badges: ['professional'], color: 'from-pink-500 to-purple-500' },
            { name: 'REST APIs', badges: ['favorite', 'professional'], color: 'from-indigo-500 to-purple-500' },
            { name: 'WebSockets', badges: ['professional'], color: 'from-green-500 to-emerald-500' },
            { name: 'gRPC', badges: ['learning'], color: 'from-blue-600 to-indigo-600' },
            { name: 'RabbitMQ', badges: ['professional'], color: 'from-orange-500 to-red-500' },
        ],
    },
    {
        id: 'frontend',
        title: {
            pt: 'Frontend',
            en: 'Frontend',
            es: 'Frontend',
        },
        icon: 'Code2',
        items: [
            { name: 'React', badges: ['favorite', 'professional'], color: 'from-blue-400 to-cyan-400' },
            { name: 'TypeScript', badges: ['favorite', 'professional'], color: 'from-blue-600 to-blue-700' },
            { name: 'JavaScript', badges: ['professional'], color: 'from-yellow-400 to-orange-500' },
            { name: 'Next.js', badges: ['professional'], color: 'from-zinc-700 to-zinc-900' },
            { name: 'Tailwind CSS', badges: ['favorite', 'professional'], color: 'from-cyan-500 to-teal-500' },
            { name: 'Vite', badges: ['favorite', 'professional'], color: 'from-purple-500 to-pink-500' },
            { name: 'HTML/CSS', badges: ['professional'], color: 'from-orange-500 to-red-500' },
            { name: 'Framer Motion', badges: ['favorite', 'professional'], color: 'from-pink-500 to-purple-600' },
            { name: 'shadcn/ui', badges: ['favorite', 'professional'], color: 'from-zinc-800 to-zinc-950' },
            { name: 'Zustand', badges: ['professional'], color: 'from-amber-600 to-orange-600' },
            { name: 'React Query', badges: ['professional'], color: 'from-red-500 to-pink-500' },
            { name: 'React Hook Form', badges: ['professional'], color: 'from-pink-400 to-rose-500' },
        ],
    },
    {
        id: 'devops',
        title: {
            pt: 'DevOps & Cloud',
            en: 'DevOps & Cloud',
            es: 'DevOps & Cloud',
        },
        icon: 'Cloud',
        items: [
            { name: 'Docker', badges: ['favorite', 'professional'], color: 'from-blue-500 to-blue-600' },
            { name: 'Kubernetes', badges: ['learning'], color: 'from-blue-600 to-indigo-600' },
            { name: 'Nginx', badges: ['professional'], color: 'from-green-600 to-green-700' },
            { name: 'CI/CD', badges: ['professional'], color: 'from-orange-500 to-red-500' },
            { name: 'AWS', badges: ['professional'], color: 'from-orange-400 to-orange-500' },
            { name: 'Digital Ocean', badges: ['professional'], color: 'from-blue-500 to-blue-600' },
            { name: 'Vercel', badges: ['professional'], color: 'from-zinc-800 to-zinc-950' },
            { name: 'GitHub Actions', badges: ['professional'], color: 'from-blue-600 to-purple-600' },
            { name: 'Terraform', badges: ['learning'], color: 'from-purple-600 to-indigo-600' },
        ],
    },
    {
        id: 'versioning',
        title: {
            pt: 'Versionamento',
            en: 'Version Control',
            es: 'Control de Versiones',
        },
        icon: 'GitBranch',
        items: [
            { name: 'Git', badges: ['favorite', 'professional'], color: 'from-orange-600 to-red-600' },
            { name: 'GitHub', badges: ['favorite', 'professional'], color: 'from-zinc-700 to-zinc-900' },
            { name: 'Bitbucket', badges: ['professional'], color: 'from-blue-600 to-blue-700' },
            { name: 'GitLab', badges: ['professional'], color: 'from-orange-500 to-red-600' },
        ],
    },
    {
        id: 'ai-tools',
        title: {
            pt: 'Ferramentas de IA',
            en: 'AI Tools',
            es: 'Herramientas de IA',
        },
        icon: 'Sparkles',
        items: [
            { name: 'GitHub Copilot', badges: ['favorite', 'professional'], color: 'from-purple-600 to-pink-600' },
            { name: 'Claude', badges: ['favorite', 'professional'], color: 'from-amber-600 to-orange-600' },
            { name: 'ChatGPT', badges: ['professional'], color: 'from-green-500 to-emerald-600' },
            { name: 'Cursor', badges: ['learning'], color: 'from-blue-500 to-indigo-600' },
            { name: 'v0.dev', badges: ['hobby'], color: 'from-zinc-800 to-zinc-950' },
        ],
    },
    {
        id: 'os',
        title: {
            pt: 'Sistemas Operacionais',
            en: 'Operating Systems',
            es: 'Sistemas Operativos',
        },
        icon: 'Monitor',
        items: [
            { name: 'Linux', badges: ['favorite', 'professional'], color: 'from-yellow-500 to-orange-500' },
            { name: 'Ubuntu', badges: ['favorite', 'professional'], color: 'from-orange-500 to-red-500' },
            { name: 'macOS', badges: ['professional'], color: 'from-zinc-400 to-zinc-600' },
            { name: 'Windows', badges: ['professional'], color: 'from-blue-500 to-blue-600' },
        ],
    },
    {
        id: 'terminals',
        title: {
            pt: 'Terminais',
            en: 'Terminals',
            es: 'Terminales',
        },
        icon: 'Terminal',
        items: [
            { name: 'Warp', badges: ['favorite', 'professional'], color: 'from-blue-500 to-cyan-500' },
            { name: 'Tilix', badges: ['professional'], color: 'from-green-600 to-emerald-600' },
            { name: 'iTerm2', badges: ['professional'], color: 'from-green-500 to-teal-500' },
            { name: 'Zsh', badges: ['favorite', 'professional'], color: 'from-purple-500 to-pink-500' },
            { name: 'Oh My Zsh', badges: ['favorite', 'professional'], color: 'from-pink-500 to-rose-500' },
        ],
    },
    {
        id: 'testing',
        title: {
            pt: 'Testes',
            en: 'Testing',
            es: 'Testing',
        },
        icon: 'CheckCircle',
        items: [
            { name: 'Jest', badges: ['professional'], color: 'from-red-600 to-pink-600' },
            { name: 'Vitest', badges: ['professional'], color: 'from-yellow-500 to-green-500' },
            { name: 'Cypress', badges: ['professional'], color: 'from-green-600 to-teal-600' },
            { name: 'Playwright', badges: ['learning'], color: 'from-green-500 to-emerald-600' },
            { name: 'Testing Library', badges: ['professional'], color: 'from-red-500 to-orange-500' },
        ],
    },
    {
        id: 'others',
        title: {
            pt: 'Outras Tecnologias',
            en: 'Other Technologies',
            es: 'Otras Tecnologías',
        },
        icon: 'Boxes',
        items: [
            { name: 'Websockets', badges: ['professional'], color: 'from-green-500 to-emerald-500' },
            { name: 'Microservices', badges: ['professional'], color: 'from-indigo-500 to-purple-500' },
            { name: 'Event Driven', badges: ['professional'], color: 'from-purple-500 to-pink-500' },
            { name: 'Clean Architecture', badges: ['favorite', 'professional'], color: 'from-blue-600 to-indigo-600' },
            { name: 'Design Patterns', badges: ['professional'], color: 'from-pink-500 to-rose-500' },
            { name: 'Agile/Scrum', badges: ['professional'], color: 'from-orange-500 to-red-500' },
        ],
    },
];

export const badgeLabels = {
    favorite: {
        pt: 'Favorito',
        en: 'Favorite',
        es: 'Favorito',
        icon: '⭐',
        color: 'from-yellow-500 to-orange-500',
    },
    professional: {
        pt: 'Profissional',
        en: 'Professional',
        es: 'Profesional',
        icon: '💼',
        color: 'from-blue-500 to-indigo-500',
    },
    learning: {
        pt: 'Aprendendo',
        en: 'Learning',
        es: 'Aprendiendo',
        icon: '📚',
        color: 'from-green-500 to-emerald-500',
    },
    hobby: {
        pt: 'Hobby',
        en: 'Hobby',
        es: 'Hobby',
        icon: '🎮',
        color: 'from-purple-500 to-pink-500',
    },
};
