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
        tech: ['Golang', 'React', 'TypeScript', 'PostgreSQL', 'RabbitMQ', 'Docker'],
    },
];
