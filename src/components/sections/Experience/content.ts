import { TECHNOLOGIES } from '../TechStack/constants';

export interface Experience {
    id: string;
    company: string;
    current: boolean;
    tech: string[];
}

export const experiences: Experience[] = [
    {
        id: 'logae',
        company: 'Logae',
        current: true,
        tech: [
            TECHNOLOGIES.GOLANG,
            TECHNOLOGIES.REACT,
            TECHNOLOGIES.TYPESCRIPT,
            TECHNOLOGIES.POSTGRESQL,
            TECHNOLOGIES.RABBITMQ,
            TECHNOLOGIES.DOCKER,
        ],
    },
];
