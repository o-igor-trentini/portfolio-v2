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
        github: 'https://github.com/igortrentini/realtime-chat',
    },
    {
        id: 'api-analytics',
        image: '/images/projects/tower.webp',
        tags: ['React', 'Golang', 'TimescaleDB', 'Chart.js'],
        type: 'professional',
        stack: ['Golang', 'React', 'TypeScript', 'TimescaleDB', 'Redis', 'Recharts'],
        github: 'https://github.com/igortrentini/analytics-dashboard',
    },
    {
        id: 'task-automation',
        image: '/images/projects/tower.webp',
        tags: ['React', 'Golang', 'PostgreSQL', 'Docker'],
        type: 'study',
        stack: ['Golang', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'React Flow'],
        github: 'https://github.com/igortrentini/task-automation',
    },
    {
        id: 'social-connect',
        image: '/images/projects/tower.webp',
        tags: ['React', 'TypeScript', 'Node.js', 'Socket.io'],
        type: 'study',
        stack: ['React', 'TypeScript', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redis'],
        github: 'https://github.com/igortrentini/social-connect',
    },
    {
        id: 'crypto-tracker',
        image: '/images/projects/tower.webp',
        tags: ['React', 'TypeScript', 'CoinGecko API', 'Recharts'],
        type: 'study',
        stack: ['React', 'TypeScript', 'CoinGecko API', 'Recharts', 'LocalStorage'],
        github: 'https://github.com/igortrentini/crypto-tracker',
    },
    {
        id: 'ecommerce-api',
        image: '/images/projects/tower.webp',
        tags: ['Golang', 'PostgreSQL', 'Redis', 'Stripe API'],
        type: 'professional',
        stack: ['Golang', 'PostgreSQL', 'Redis', 'Stripe API', 'JWT', 'Docker'],
        github: 'https://github.com/igortrentini/ecommerce-api',
    },
];
