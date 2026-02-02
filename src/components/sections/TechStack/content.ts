import { BADGE_TYPES, TECH_COLORS, TECHNOLOGIES } from './constants';

export type TechBadge = 'favorite' | 'professional' | 'learning' | 'hobby';

export interface TechItem {
    name: string;
    badges?: TechBadge[];
    color: string;
}

export interface TechCategory {
    id: string;
    icon: string;
    items: TechItem[];
}

export const techStackCategories: TechCategory[] = [
    {
        id: 'backend',
        icon: 'Server',
        items: [
            {
                name: TECHNOLOGIES.GOLANG,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.CYAN_BLUE,
            },
            { name: TECHNOLOGIES.NODEJS, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.GREEN_DARK },
            { name: TECHNOLOGIES.PYTHON, badges: [BADGE_TYPES.HOBBY], color: TECH_COLORS.YELLOW_BLUE },
            {
                name: TECHNOLOGIES.POSTGRESQL,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.BLUE_INDIGO,
            },
            { name: TECHNOLOGIES.MONGODB, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.GREEN_EMERALD },
            {
                name: TECHNOLOGIES.REDIS,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.RED,
            },
            { name: TECHNOLOGIES.MYSQL, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.BLUE_LIGHT },
            { name: TECHNOLOGIES.GRAPHQL, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.PINK_PURPLE },
            {
                name: TECHNOLOGIES.REST_APIS,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.INDIGO_PURPLE,
            },
            { name: TECHNOLOGIES.WEBSOCKETS, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.GREEN },
            { name: TECHNOLOGIES.GRPC, badges: [BADGE_TYPES.LEARNING], color: TECH_COLORS.INDIGO },
            { name: TECHNOLOGIES.RABBITMQ, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.ORANGE },
        ],
    },
    {
        id: 'frontend',
        icon: 'Code2',
        items: [
            {
                name: TECHNOLOGIES.REACT,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.BLUE_CYAN,
            },
            {
                name: TECHNOLOGIES.TYPESCRIPT,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.BLUE_DARK,
            },
            { name: TECHNOLOGIES.JAVASCRIPT, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.YELLOW_ORANGE },
            { name: TECHNOLOGIES.NEXTJS, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.ZINC_DARK },
            {
                name: TECHNOLOGIES.TAILWIND,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.CYAN_TEAL,
            },
            {
                name: TECHNOLOGIES.VITE,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.PURPLE_PINK,
            },
            { name: TECHNOLOGIES.HTML_CSS, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.ORANGE },
            {
                name: TECHNOLOGIES.FRAMER_MOTION,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.PINK,
            },
            {
                name: TECHNOLOGIES.SHADCN,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.ZINC_DARKER,
            },
            { name: TECHNOLOGIES.ZUSTAND, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.ORANGE_AMBER },
            { name: TECHNOLOGIES.REACT_QUERY, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.PINK_RED },
            { name: TECHNOLOGIES.REACT_HOOK_FORM, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.PINK_ROSE },
        ],
    },
    {
        id: 'devops',
        icon: 'Cloud',
        items: [
            {
                name: TECHNOLOGIES.DOCKER,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.BLUE,
            },
            { name: TECHNOLOGIES.KUBERNETES, badges: [BADGE_TYPES.LEARNING], color: TECH_COLORS.INDIGO },
            { name: TECHNOLOGIES.NGINX, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.GREEN_DARK },
            { name: TECHNOLOGIES.CI_CD, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.ORANGE },
            { name: TECHNOLOGIES.AWS, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.ORANGE_LIGHT },
            { name: TECHNOLOGIES.DIGITAL_OCEAN, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.BLUE },
            { name: TECHNOLOGIES.VERCEL, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.ZINC_DARKER },
            { name: TECHNOLOGIES.GITHUB_ACTIONS, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.BLUE_PURPLE },
            { name: TECHNOLOGIES.TERRAFORM, badges: [BADGE_TYPES.LEARNING], color: TECH_COLORS.PURPLE_INDIGO },
        ],
    },
    {
        id: 'versioning',
        icon: 'GitBranch',
        items: [
            {
                name: TECHNOLOGIES.GIT,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.ORANGE_RED,
            },
            {
                name: TECHNOLOGIES.GITHUB,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.ZINC_DARK,
            },
            { name: TECHNOLOGIES.BITBUCKET, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.BLUE_DARK },
            { name: TECHNOLOGIES.GITLAB, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.ORANGE },
        ],
    },
    {
        id: 'ai-tools',
        icon: 'Sparkles',
        items: [
            {
                name: TECHNOLOGIES.GITHUB_COPILOT,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.PURPLE_PINK_DARK,
            },
            {
                name: TECHNOLOGIES.CLAUDE,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.ORANGE_AMBER,
            },
            { name: TECHNOLOGIES.CHATGPT, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.GREEN_EMERALD },
            { name: TECHNOLOGIES.CURSOR, badges: [BADGE_TYPES.LEARNING], color: TECH_COLORS.INDIGO },
            { name: TECHNOLOGIES.V0_DEV, badges: [BADGE_TYPES.HOBBY], color: TECH_COLORS.ZINC_DARKER },
        ],
    },
    {
        id: 'os',
        icon: 'Monitor',
        items: [
            {
                name: TECHNOLOGIES.LINUX,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.YELLOW,
            },
            {
                name: TECHNOLOGIES.UBUNTU,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.ORANGE,
            },
            { name: TECHNOLOGIES.MACOS, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.ZINC_LIGHT },
            { name: TECHNOLOGIES.WINDOWS, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.BLUE },
        ],
    },
    {
        id: 'terminals',
        icon: 'Terminal',
        items: [
            {
                name: TECHNOLOGIES.WARP,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.CYAN,
            },
            { name: TECHNOLOGIES.TILIX, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.EMERALD },
            { name: TECHNOLOGIES.ITERM2, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.GREEN_TEAL },
            {
                name: TECHNOLOGIES.ZSH,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.PURPLE_PINK,
            },
            {
                name: TECHNOLOGIES.OH_MY_ZSH,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.ROSE,
            },
        ],
    },
    {
        id: 'testing',
        icon: 'CheckCircle',
        items: [
            { name: TECHNOLOGIES.JEST, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.RED_PINK },
            { name: TECHNOLOGIES.VITEST, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.YELLOW_GREEN },
            { name: TECHNOLOGIES.CYPRESS, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.GREEN_TEAL_DARK },
            { name: TECHNOLOGIES.PLAYWRIGHT, badges: [BADGE_TYPES.LEARNING], color: TECH_COLORS.GREEN_EMERALD },
            { name: TECHNOLOGIES.TESTING_LIBRARY, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.RED_ORANGE },
        ],
    },
    {
        id: 'others',
        icon: 'Boxes',
        items: [
            { name: TECHNOLOGIES.WEBSOCKETS, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.GREEN },
            { name: TECHNOLOGIES.MICROSERVICES, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.INDIGO_PURPLE },
            { name: TECHNOLOGIES.EVENT_DRIVEN, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.PURPLE_PINK },
            {
                name: TECHNOLOGIES.CLEAN_ARCHITECTURE,
                badges: [BADGE_TYPES.FAVORITE, BADGE_TYPES.PROFESSIONAL],
                color: TECH_COLORS.INDIGO,
            },
            { name: TECHNOLOGIES.DESIGN_PATTERNS, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.ROSE },
            { name: TECHNOLOGIES.AGILE_SCRUM, badges: [BADGE_TYPES.PROFESSIONAL], color: TECH_COLORS.ORANGE },
        ],
    },
];
