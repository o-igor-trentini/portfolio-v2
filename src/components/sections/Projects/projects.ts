import { TECHNOLOGIES } from '../TechStack/constants';
import { SocialLinks } from '@/components/sections/Contact/constants';

export interface Project {
    id: string;
    image: string;
    tags: string[];
    type: 'professional' | 'study';
    stack: string[];
    github?: string;
}

export const projects: Project[] = [
    {
        id: 'realtime-chat',
        image: '/images/projects/tower.webp',
        tags: [
            TECHNOLOGIES.GOLANG,
            TECHNOLOGIES.WEBSOCKETS,
            TECHNOLOGIES.REACT,
            TECHNOLOGIES.REDIS,
            TECHNOLOGIES.POSTGRESQL,
        ],
        type: 'professional',
        stack: [
            TECHNOLOGIES.GOLANG,
            TECHNOLOGIES.WEBSOCKETS,
            TECHNOLOGIES.REACT,
            TECHNOLOGIES.TYPESCRIPT,
            TECHNOLOGIES.REDIS,
            TECHNOLOGIES.POSTGRESQL,
            TECHNOLOGIES.DOCKER,
        ],
        github: SocialLinks.Github + '/realtime-chat',
    },
    {
        id: 'api-analytics',
        image: '/images/projects/tower.webp',
        tags: [TECHNOLOGIES.REACT, TECHNOLOGIES.GOLANG, 'TimescaleDB', 'Chart.js'],
        type: 'professional',
        stack: [TECHNOLOGIES.GOLANG, TECHNOLOGIES.REACT, TECHNOLOGIES.TYPESCRIPT, TECHNOLOGIES.REDIS],
        github: SocialLinks.Github + '/analytics-dashboard',
    },
    {
        id: 'task-automation',
        image: '/images/projects/tower.webp',
        tags: [TECHNOLOGIES.REACT, TECHNOLOGIES.GOLANG, TECHNOLOGIES.POSTGRESQL, TECHNOLOGIES.DOCKER],
        type: 'study',
        stack: [
            TECHNOLOGIES.GOLANG,
            TECHNOLOGIES.REACT,
            TECHNOLOGIES.TYPESCRIPT,
            TECHNOLOGIES.POSTGRESQL,
            TECHNOLOGIES.DOCKER,
        ],
        github: SocialLinks.Github + '/task-automation',
    },
    {
        id: 'social-connect',
        image: '/images/projects/tower.webp',
        tags: [TECHNOLOGIES.REACT, TECHNOLOGIES.TYPESCRIPT, TECHNOLOGIES.NODEJS, 'Socket.io'],
        type: 'study',
        stack: [
            TECHNOLOGIES.REACT,
            TECHNOLOGIES.TYPESCRIPT,
            TECHNOLOGIES.NODEJS,
            TECHNOLOGIES.POSTGRESQL,
            TECHNOLOGIES.REDIS,
        ],
        github: SocialLinks.Github + '/social-connect',
    },
    {
        id: 'crypto-tracker',
        image: '/images/projects/tower.webp',
        tags: [TECHNOLOGIES.REACT, TECHNOLOGIES.TYPESCRIPT, 'CoinGecko API', 'Recharts'],
        type: 'study',
        stack: [TECHNOLOGIES.REACT, TECHNOLOGIES.TYPESCRIPT, 'CoinGecko API', 'Recharts', 'LocalStorage'],
        github: SocialLinks.Github + '/crypto-tracker',
    },
    {
        id: 'ecommerce-api',
        image: '/images/projects/tower.webp',
        tags: [TECHNOLOGIES.GOLANG, TECHNOLOGIES.POSTGRESQL, TECHNOLOGIES.REDIS, 'Stripe API'],
        type: 'professional',
        stack: [TECHNOLOGIES.GOLANG, TECHNOLOGIES.POSTGRESQL, TECHNOLOGIES.REDIS, TECHNOLOGIES.DOCKER],
        github: SocialLinks.Github + '/ecommerce-api',
    },
];
