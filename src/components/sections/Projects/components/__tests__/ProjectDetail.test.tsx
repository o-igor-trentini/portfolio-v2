import { createElement } from 'react';
import { render, screen, within } from '@/tests/helpers/render';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import ProjectDetail from '../ProjectDetail';
import type { Project } from '../../projects';

vi.mock('motion/react', () => ({
    motion: new Proxy(
        {},
        {
            get: (_target, prop: string) => {
                return ({ children, ...props }: any) => {
                    const {
                        initial,
                        animate,
                        exit,
                        transition,
                        whileHover,
                        whileTap,
                        whileInView,
                        viewport,
                        layout,
                        variants,
                        style,
                        ...htmlProps
                    } = props;
                    return createElement(prop as string, { ...htmlProps, style }, children);
                };
            },
        },
    ),
    AnimatePresence: ({ children }: any) => children,
}));

vi.mock('../../../../common/OptimizedImage', () => ({
    OptimizedImage: (props: any) => createElement('img', { src: props.src, alt: props.alt }),
    PriorityImage: (props: any) => createElement('img', { src: props.src, alt: props.alt }),
}));

vi.mock('../ArchitectureFlow', () => ({
    default: () => createElement('div', { 'data-testid': 'architecture-flow' }, 'Architecture'),
}));

vi.mock('../ProjectHeroPlaceholder', () => ({
    default: ({ stack }: any) =>
        createElement('div', { 'data-testid': 'hero-placeholder' }, `Placeholder: ${stack.length} techs`),
}));

const mockGeneratedProject: Project = {
    id: 'risk-platform',
    image: '/images/projects/tower.webp',
    imageType: 'generated',
    tags: ['Golang', 'React', 'PostgreSQL', 'RabbitMQ'],
    type: 'professional',
    stack: [
        'Golang',
        'Gin',
        'React',
        'TypeScript',
        'PostgreSQL',
        'RabbitMQ',
        'Docker',
        'AWS',
        'GCP',
        'Firebase',
        'Keycloak',
        'Redis',
        'New Relic',
    ],
};

const mockScreenshotProject: Project = {
    ...mockGeneratedProject,
    imageType: 'screenshot',
};

const mockProjectWithGithub: Project = {
    ...mockGeneratedProject,
    github: 'https://github.com/user/repo',
};

const mockOnClose = vi.fn();

const renderProjectDetail = (project: Project | null = mockGeneratedProject, onClose = mockOnClose) => {
    return render(<ProjectDetail project={project} onClose={onClose} />);
};

beforeEach(() => {
    mockOnClose.mockClear();
});

describe('ProjectDetail', () => {
    describe('renderizacao base', () => {
        it('nao renderiza nada quando project e null', () => {
            const { container } = renderProjectDetail(null);

            expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
        });

        it('renderiza titulo do projeto', () => {
            renderProjectDetail();

            expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
        });

        it('renderiza tags do projeto no header', () => {
            renderProjectDetail();

            for (const tag of mockGeneratedProject.tags) {
                expect(screen.getAllByText(tag).length).toBeGreaterThanOrEqual(1);
            }
        });

        it('renderiza botao de fechar com aria-label', () => {
            renderProjectDetail();

            expect(screen.getByRole('button', { name: 'Fechar' })).toBeInTheDocument();
        });

        it('renderiza botao "Voltar aos Projetos"', () => {
            renderProjectDetail();

            expect(screen.getByRole('button', { name: /voltar aos projetos/i })).toBeInTheDocument();
        });
    });

    describe('view mode: visao geral (default)', () => {
        it('visao geral e o modo default', () => {
            renderProjectDetail();

            const simpleButton = screen.getByRole('button', { name: 'Visão Geral' });
            expect(simpleButton).toHaveClass('bg-purple-500');
        });

        it('exibe descricao simples do projeto', () => {
            renderProjectDetail();

            expect(screen.getByText(/Plataforma SaaS de análise de risco para o setor logístico/)).toBeInTheDocument();
        });

        it('exibe secao "Destaques" com primeiros 4 highlights', () => {
            renderProjectDetail();

            expect(
                screen.getByText(/Evolução de módulo monolítico legado para produto SaaS independente/),
            ).toBeInTheDocument();
        });

        it('exibe tech stack badges', () => {
            renderProjectDetail();

            for (const tech of mockGeneratedProject.stack) {
                expect(screen.getAllByText(tech).length).toBeGreaterThanOrEqual(1);
            }
        });

        it('exibe CTA "Ver detalhes tecnicos"', () => {
            renderProjectDetail();

            expect(screen.getByRole('button', { name: /ver detalhes técnicos/i })).toBeInTheDocument();
        });

        it('clicar no CTA muda para visao tecnica', async () => {
            const user = userEvent.setup();
            renderProjectDetail();

            await user.click(screen.getByRole('button', { name: /ver detalhes técnicos/i }));

            const technicalButton = screen.getByRole('button', { name: 'Detalhes Técnicos' });
            expect(technicalButton).toHaveClass('bg-purple-500');
        });
    });

    describe('view mode: detalhes tecnicos', () => {
        const renderInTechnicalMode = async () => {
            const user = userEvent.setup();
            renderProjectDetail();
            await user.click(screen.getByRole('button', { name: 'Detalhes Técnicos' }));
            return user;
        };

        it('exibe descricao tecnica completa', async () => {
            await renderInTechnicalMode();

            expect(
                screen.getByText(/Plataforma SaaS voltada à análise e validação de risco no setor logístico/),
            ).toBeInTheDocument();
        });

        it('exibe secao "Problema"', async () => {
            await renderInTechnicalMode();

            expect(screen.getByText('Problema')).toBeInTheDocument();
        });

        it('exibe secao "Solução"', async () => {
            await renderInTechnicalMode();

            expect(screen.getByText('Solução')).toBeInTheDocument();
        });

        it('exibe tech stack', async () => {
            await renderInTechnicalMode();

            expect(screen.getByText('Stack Tecnológica')).toBeInTheDocument();
        });

        it('exibe secao "Arquitetura" com mock', async () => {
            await renderInTechnicalMode();

            expect(screen.getByText('Arquitetura')).toBeInTheDocument();
            expect(screen.getByTestId('architecture-flow')).toBeInTheDocument();
        });

        it('exibe secao "Destaques" com highlights', async () => {
            await renderInTechnicalMode();

            expect(screen.getByText('Destaques')).toBeInTheDocument();
        });
    });

    describe('toggle entre modos', () => {
        it('clicar em "Detalhes Técnicos" muda o view mode', async () => {
            const user = userEvent.setup();
            renderProjectDetail();

            await user.click(screen.getByRole('button', { name: 'Detalhes Técnicos' }));

            expect(screen.getByRole('button', { name: 'Detalhes Técnicos' })).toHaveClass('bg-purple-500');
            expect(screen.getByRole('button', { name: 'Visão Geral' })).not.toHaveClass('bg-purple-500');
        });

        it('clicar em "Visão Geral" volta ao modo overview', async () => {
            const user = userEvent.setup();
            renderProjectDetail();

            await user.click(screen.getByRole('button', { name: 'Detalhes Técnicos' }));
            await user.click(screen.getByRole('button', { name: 'Visão Geral' }));

            expect(screen.getByRole('button', { name: 'Visão Geral' })).toHaveClass('bg-purple-500');
            expect(screen.getByRole('button', { name: 'Detalhes Técnicos' })).not.toHaveClass('bg-purple-500');
        });

        it('toggle buttons indicam estado ativo corretamente', async () => {
            const user = userEvent.setup();
            renderProjectDetail();

            expect(screen.getByRole('button', { name: 'Visão Geral' })).toHaveClass('bg-purple-500');
            expect(screen.getByRole('button', { name: 'Detalhes Técnicos' })).not.toHaveClass('bg-purple-500');

            await user.click(screen.getByRole('button', { name: 'Detalhes Técnicos' }));

            expect(screen.getByRole('button', { name: 'Visão Geral' })).not.toHaveClass('bg-purple-500');
            expect(screen.getByRole('button', { name: 'Detalhes Técnicos' })).toHaveClass('bg-purple-500');
        });
    });

    describe('interacao e fechamento', () => {
        it('clicar no backdrop chama onClose', async () => {
            const user = userEvent.setup();
            renderProjectDetail();

            await user.click(screen.getByRole('dialog'));

            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });

        it('clicar no botao X chama onClose', async () => {
            const user = userEvent.setup();
            renderProjectDetail();

            await user.click(screen.getByRole('button', { name: 'Fechar' }));

            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });

        it('pressionar Escape chama onClose', async () => {
            const user = userEvent.setup();
            renderProjectDetail();

            await user.keyboard('{Escape}');

            expect(mockOnClose).toHaveBeenCalledTimes(1);
        });

        it('clicar dentro do modal NAO chama onClose', async () => {
            const user = userEvent.setup();
            renderProjectDetail();

            const heading = screen.getByRole('heading', { level: 2 });
            await user.click(heading);

            expect(mockOnClose).not.toHaveBeenCalled();
        });
    });

    describe('imagem condicional (imageType)', () => {
        it('renderiza ProjectHeroPlaceholder quando imageType === "generated"', () => {
            renderProjectDetail(mockGeneratedProject);

            expect(screen.getByTestId('hero-placeholder')).toBeInTheDocument();
            expect(screen.getByText(/Placeholder: 13 techs/)).toBeInTheDocument();
        });

        it('renderiza OptimizedImage quando imageType === "screenshot"', () => {
            renderProjectDetail(mockScreenshotProject);

            expect(screen.getByRole('img')).toHaveAttribute('src', mockScreenshotProject.image);
            expect(screen.queryByTestId('hero-placeholder')).not.toBeInTheDocument();
        });
    });

    describe('responsividade e overflow', () => {
        it('modal container tem overflow-y-auto', () => {
            renderProjectDetail();

            const dialog = screen.getByRole('dialog');
            expect(dialog).toHaveClass('overflow-y-auto');
        });

        it('content area tem overflow-x-hidden', () => {
            renderProjectDetail();

            const dialog = screen.getByRole('dialog');
            const contentArea = dialog.querySelector('.overflow-x-hidden');
            expect(contentArea).toBeInTheDocument();
        });

        it('header usa aspect ratio responsivo (aspect-[2.5/1])', () => {
            renderProjectDetail();

            const dialog = screen.getByRole('dialog');
            const aspectElement = dialog.querySelector('.aspect-\\[2\\.5\\/1\\]');
            expect(aspectElement).toBeInTheDocument();
        });

        it('modal card tem overflow-hidden', () => {
            renderProjectDetail();

            const dialog = screen.getByRole('dialog');
            const card = dialog.querySelector('.overflow-hidden');
            expect(card).toBeInTheDocument();
        });

        it('titulo do header tem classes responsivas (text-base sm:text-xl)', () => {
            renderProjectDetail();

            const heading = screen.getByRole('heading', { level: 2 });
            expect(heading).toHaveClass('text-base');
            expect(heading).toHaveClass('sm:text-xl');
        });

        it('tags do header tem classes responsivas (text-[10px] sm:text-xs)', () => {
            renderProjectDetail();

            const tagElements = screen.getAllByText(mockGeneratedProject.tags[0]);
            const headerTag = tagElements.find((el) => el.classList.contains('text-[10px]'));
            expect(headerTag).toBeDefined();
            expect(headerTag).toHaveClass('sm:text-xs');
        });

        it('close button tem posicionamento responsivo (top-2 right-2 sm:top-4 sm:right-4)', () => {
            renderProjectDetail();

            const closeButton = screen.getByRole('button', { name: 'Fechar' });
            expect(closeButton).toHaveClass('top-2', 'right-2');
        });
    });

    describe('acessibilidade', () => {
        it('dialog tem role="dialog" e aria-modal="true"', () => {
            renderProjectDetail();

            const dialog = screen.getByRole('dialog');
            expect(dialog).toHaveAttribute('aria-modal', 'true');
        });

        it('dialog tem aria-label com titulo do projeto', () => {
            renderProjectDetail();

            const dialog = screen.getByRole('dialog');
            expect(dialog).toHaveAttribute('aria-label');
            expect(dialog.getAttribute('aria-label')).toBeTruthy();
        });

        it('botao fechar tem aria-label "Fechar"', () => {
            renderProjectDetail();

            const closeButton = screen.getByRole('button', { name: 'Fechar' });
            expect(closeButton).toHaveAttribute('aria-label', 'Fechar');
        });

        it('nao deve ter violacoes de acessibilidade', async () => {
            const { container } = renderProjectDetail();
            const results = await axe(container);

            expect(results).toHaveNoViolations();
        });
    });

    describe('github actions', () => {
        it('nao renderiza botao GitHub quando project.github nao existe', () => {
            renderProjectDetail(mockGeneratedProject);

            expect(screen.queryByRole('button', { name: /github/i })).not.toBeInTheDocument();
        });

        it('renderiza botao GitHub quando project.github existe', () => {
            renderProjectDetail(mockProjectWithGithub);

            expect(screen.getByRole('button', { name: /github/i })).toBeInTheDocument();
        });
    });
});
