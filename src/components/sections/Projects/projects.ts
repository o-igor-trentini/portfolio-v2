import { TECHNOLOGIES } from '../TechStack/constants';

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
        id: 'risk-platform',
        image: '/images/projects/tower.webp',
        tags: [TECHNOLOGIES.GOLANG, TECHNOLOGIES.REACT, TECHNOLOGIES.POSTGRESQL, TECHNOLOGIES.RABBITMQ],
        type: 'professional',
        stack: [
            TECHNOLOGIES.GOLANG,
            TECHNOLOGIES.GIN,
            TECHNOLOGIES.REACT,
            TECHNOLOGIES.TYPESCRIPT,
            TECHNOLOGIES.POSTGRESQL,
            TECHNOLOGIES.RABBITMQ,
            TECHNOLOGIES.DOCKER,
            TECHNOLOGIES.AWS,
            TECHNOLOGIES.GCP,
            TECHNOLOGIES.FIREBASE,
            TECHNOLOGIES.KEYCLOAK,
            TECHNOLOGIES.REDIS,
            TECHNOLOGIES.NEW_RELIC,
        ],
    },
];
