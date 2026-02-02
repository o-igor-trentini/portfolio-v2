// Gradient color constants for technologies
export const TECH_COLORS = {
    // Blues and Cyans
    CYAN_BLUE: 'from-cyan-500 to-blue-500',
    BLUE_CYAN: 'from-blue-400 to-cyan-400',
    BLUE_INDIGO: 'from-blue-500 to-indigo-500',
    BLUE_DARK: 'from-blue-600 to-blue-700',
    BLUE: 'from-blue-500 to-blue-600',
    BLUE_LIGHT: 'from-blue-400 to-blue-600',
    BLUE_PURPLE: 'from-blue-600 to-purple-600',
    INDIGO_PURPLE: 'from-indigo-500 to-purple-500',
    INDIGO: 'from-blue-600 to-indigo-600',
    PURPLE_INDIGO: 'from-purple-600 to-indigo-600',

    // Greens
    GREEN_DARK: 'from-green-600 to-green-700',
    GREEN_EMERALD: 'from-green-500 to-emerald-600',
    GREEN: 'from-green-500 to-emerald-500',
    GREEN_TEAL: 'from-green-500 to-teal-500',
    GREEN_TEAL_DARK: 'from-green-600 to-teal-600',
    EMERALD: 'from-green-600 to-emerald-600',

    // Yellows and Oranges
    YELLOW_BLUE: 'from-yellow-500 to-blue-500',
    YELLOW_ORANGE: 'from-yellow-400 to-orange-500',
    YELLOW_GREEN: 'from-yellow-500 to-green-500',
    YELLOW: 'from-yellow-500 to-orange-500',
    ORANGE: 'from-orange-500 to-red-500',
    ORANGE_LIGHT: 'from-orange-400 to-orange-500',
    ORANGE_RED: 'from-orange-600 to-red-600',
    ORANGE_AMBER: 'from-amber-600 to-orange-600',

    // Reds and Pinks
    RED: 'from-red-500 to-rose-500',
    RED_PINK: 'from-red-600 to-pink-600',
    RED_ORANGE: 'from-red-500 to-orange-500',

    // Pinks and Purples
    PINK_PURPLE: 'from-pink-500 to-purple-500',
    PURPLE_PINK: 'from-purple-500 to-pink-500',
    PURPLE_PINK_DARK: 'from-purple-600 to-pink-600',
    PINK_ROSE: 'from-pink-400 to-rose-500',
    PINK: 'from-pink-500 to-purple-600',
    PINK_RED: 'from-red-500 to-pink-500',
    ROSE: 'from-pink-500 to-rose-500',

    // Teals and Cyans
    CYAN_TEAL: 'from-cyan-500 to-teal-500',
    CYAN: 'from-blue-500 to-cyan-500',

    // Grays and Neutrals
    ZINC_DARK: 'from-zinc-700 to-zinc-900',
    ZINC_DARKER: 'from-zinc-800 to-zinc-950',
    ZINC_LIGHT: 'from-zinc-400 to-zinc-600',
} as const;

// Badge type constants
export const BADGE_TYPES = {
    FAVORITE: 'favorite',
    PROFESSIONAL: 'professional',
    LEARNING: 'learning',
    HOBBY: 'hobby',
} as const;

// Badge configurations with colors and icons
export const BADGE_CONFIG = {
    [BADGE_TYPES.FAVORITE]: {
        icon: '⭐',
        color: TECH_COLORS.YELLOW,
    },
    [BADGE_TYPES.PROFESSIONAL]: {
        icon: '💼',
        color: TECH_COLORS.BLUE_INDIGO,
    },
    [BADGE_TYPES.LEARNING]: {
        icon: '📚',
        color: TECH_COLORS.GREEN_EMERALD,
    },
    [BADGE_TYPES.HOBBY]: {
        icon: '🎮',
        color: TECH_COLORS.PURPLE_PINK,
    },
} as const;

// Technology names
export const TECHNOLOGIES = {
    // Backend
    GOLANG: 'Golang',
    NODEJS: 'Node.js',
    PYTHON: 'Python',
    POSTGRESQL: 'PostgreSQL',
    MONGODB: 'MongoDB',
    REDIS: 'Redis',
    MYSQL: 'MySQL',
    GRAPHQL: 'GraphQL',
    REST_APIS: 'REST APIs',
    RABBITMQ: 'RabbitMQ',

    // Frontend
    REACT: 'React',
    TYPESCRIPT: 'TypeScript',
    JAVASCRIPT: 'JavaScript',
    NEXTJS: 'Next.js',
    TAILWIND: 'Tailwind CSS',
    VITE: 'Vite',
    HTML_CSS: 'HTML/CSS',
    FRAMER_MOTION: 'Framer Motion',
    SHADCN: 'shadcn/ui',
    ZUSTAND: 'Zustand',
    REACT_QUERY: 'React Query',
    REACT_HOOK_FORM: 'React Hook Form',

    // DevOps
    DOCKER: 'Docker',
    KUBERNETES: 'Kubernetes',
    NGINX: 'Nginx',
    CI_CD: 'CI/CD',
    AWS: 'AWS',
    GCP: 'GCP',
    CLOUDFLARE: 'Cloudflare',
    DIGITAL_OCEAN: 'Digital Ocean',
    VERCEL: 'Vercel',
    GITHUB_ACTIONS: 'GitHub Actions',
    TERRAFORM: 'Terraform',

    // Versioning
    GIT: 'Git',
    GITHUB: 'GitHub',
    BITBUCKET: 'Bitbucket',

    // AI Tools
    GITHUB_COPILOT: 'GitHub Copilot',
    CLAUDE: 'Claude',
    CHATGPT: 'ChatGPT',
    V0_DEV: 'v0.dev',

    // Operating Systems
    LINUX: 'Linux',
    UBUNTU: 'Ubuntu',
    WINDOWS: 'Windows',

    // Terminals
    WARP: 'Warp',
    TILIX: 'Tilix',
    ZSH: 'Zsh',
    OH_MY_ZSH: 'Oh My Zsh',

    // Testing
    VITEST: 'Vitest',
    CYPRESS: 'Cypress',
    PLAYWRIGHT: 'Playwright',
    TESTING_LIBRARY: 'Testing Library',

    // Others
    MICROSERVICES: 'Microservices',
    EVENT_DRIVEN: 'Event Driven',
    CLEAN_ARCHITECTURE: 'Clean Architecture',
    DESIGN_PATTERNS: 'Design Patterns',
    AGILE_SCRUM: 'Agile/Scrum',
} as const;
