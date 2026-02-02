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
        tags: ['Golang', 'WebSockets', 'React', 'Redis', 'PostgreSQL'],
        type: 'professional',
        stack: ['Golang', 'WebSockets', 'React', 'TypeScript', 'Redis', 'PostgreSQL', 'Docker'],
        github: SocialLinks.Github + '/realtime-chat',
    },
    {
        id: 'api-analytics',
        image: '/images/projects/tower.webp',
        tags: ['React', 'Golang', 'TimescaleDB', 'Chart.js'],
        type: 'professional',
        stack: ['Golang', 'React', 'TypeScript', 'TimescaleDB', 'Redis', 'Recharts'],
        github: SocialLinks.Github + '/analytics-dashboard',
    },
    {
        id: 'task-automation',
        image: '/images/projects/tower.webp',
        tags: ['React', 'Golang', 'PostgreSQL', 'Docker'],
        type: 'study',
        stack: ['Golang', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'React Flow'],
        github: SocialLinks.Github + '/task-automation',
    },
    {
        id: 'social-connect',
        image: '/images/projects/tower.webp',
        tags: ['React', 'TypeScript', 'Node.js', 'Socket.io'],
        type: 'study',
        stack: ['React', 'TypeScript', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redis'],
        github: SocialLinks.Github + '/social-connect',
    },
    {
        id: 'crypto-tracker',
        image: '/images/projects/tower.webp',
        tags: ['React', 'TypeScript', 'CoinGecko API', 'Recharts'],
        type: 'study',
        stack: ['React', 'TypeScript', 'CoinGecko API', 'Recharts', 'LocalStorage'],
        github: SocialLinks.Github + '/crypto-tracker',
    },
    {
        id: 'ecommerce-api',
        image: '/images/projects/tower.webp',
        tags: ['Golang', 'PostgreSQL', 'Redis', 'Stripe API'],
        type: 'professional',
        stack: ['Golang', 'PostgreSQL', 'Redis', 'Stripe API', 'JWT', 'Docker'],
        github: SocialLinks.Github + '/ecommerce-api',
    },
];
