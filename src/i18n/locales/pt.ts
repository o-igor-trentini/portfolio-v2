const pt = {
    nav: {
        home: 'Início',
        projects: 'Projetos',
        about: 'Sobre',
        experience: 'Carreira',
        contact: 'Contato',
    },
    hero: {
        info: {
            title: {
                greeting: 'Olá, eu sou',
                name: 'Igor Trentini',
                role: 'Full Stack Developer',
                subtitle: 'Golang, React, TypeScript',
            },
            description:
                'Desenvolvedor apaixonado por criar soluções elegantes e escaláveis. Especializado em backend com Go e frontend moderno com React.',
            projectButton: 'Ver Projetos',
            socialButton: 'Entrar em Contato',
        },
        connect: 'Conecte-se comigo',
        scrollToExplore: 'Scroll para explorar',
        available: 'Disponível para projetos',
        specialist: 'Especialista em',
    },
    projects: {
        title: 'Projetos',
        subtitle: 'Explorando ideias através do código',
        tags: {
            filterLabel: 'Filtrar',
            all: 'Todos',
            professional: 'Profissionais',
            study: 'Estudos',
        },
        card: {
            viewMore: 'Ver Detalhes',
        },
        detail: {
            technicalView: 'Visão Técnica',
            simpleView: 'Visão Simples',
            problem: 'Problema',
            solution: 'Solução',
            stack: 'Stack Tecnológica',
            architecture: 'Arquitetura',
            highlights: 'Destaques',
            viewOnGithub: 'Ver no GitHub',
            backToProjects: 'Voltar aos Projetos',
        },
        projectCount: 'projeto',
        projectsCount: 'projetos',
        items: {
            'realtime-chat': {
                title: 'Chat em Tempo Real',
                description:
                    'Sistema de chat em tempo real com WebSockets, autenticação JWT, e arquitetura de microserviços',
                descriptionSimple:
                    'Um aplicativo de mensagens instantâneas onde você pode conversar em tempo real com outras pessoas',
                problem:
                    'Empresas precisam de sistemas de comunicação interna escaláveis e seguros que suportem milhares de usuários simultâneos',
                solution:
                    'Implementação de WebSockets com Go para comunicação bidirecional, Redis para pub/sub, e PostgreSQL para persistência. Arquitetura de microserviços permite escalar horizontalmente',
                architecture:
                    'API Gateway → Serviço de Auth → Serviço de Chat (WebSocket) → Redis Pub/Sub → PostgreSQL',
                highlights: [
                    'Suporta 10.000+ conexões simultâneas',
                    'Latência média de 50ms',
                    'Sistema de presença online em tempo real',
                    'Histórico de mensagens com busca full-text',
                ],
            },
            'api-analytics': {
                title: 'Analytics Dashboard',
                description:
                    'Dashboard de analytics em tempo real com processamento de eventos e visualizações interativas',
                descriptionSimple:
                    'Um painel que mostra gráficos e estatísticas em tempo real sobre o uso do seu aplicativo',
                problem:
                    'Necessidade de processar milhões de eventos por dia e apresentar insights em tempo real para tomada de decisões',
                solution:
                    'Pipeline de dados usando Kafka para ingestão, ClickHouse para armazenamento analítico, e React com WebSockets para visualização em tempo real',
                architecture: 'Kafka → Stream Processing → ClickHouse → API GraphQL → React Dashboard',
                highlights: [
                    'Processa 1M+ eventos/dia',
                    'Queries sub-segundo em bilhões de registros',
                    'Dashboards customizáveis e interativos',
                    'Alertas em tempo real via WebSocket',
                ],
            },
            'microservices-ecommerce': {
                title: 'E-commerce Microservices',
                description: 'Plataforma de e-commerce completa usando arquitetura de microserviços e event-driven',
                descriptionSimple:
                    'Uma loja online completa onde você pode comprar produtos, fazer pagamentos e acompanhar entregas',
                problem:
                    'Necessidade de sistema de e-commerce altamente escalável que suporte picos de tráfego e mantenha consistência entre serviços',
                solution:
                    'Arquitetura de microserviços com CQRS/Event Sourcing, usando RabbitMQ para comunicação assíncrona e Redis para cache distribuído',
                architecture:
                    'API Gateway → Catálogo | Pedidos | Pagamento | Inventário → Event Bus (RabbitMQ) → PostgreSQL/MongoDB',
                highlights: [
                    'Alta disponibilidade (99.9% uptime)',
                    'Escalabilidade horizontal automática',
                    'Processamento de pagamentos PCI-compliant',
                    'Sistema de inventário com eventual consistency',
                ],
            },
            'blockchain-voting': {
                title: 'Sistema de Votação Blockchain',
                description:
                    'Sistema de votação descentralizado usando blockchain para garantir transparência e imutabilidade',
                descriptionSimple:
                    'Um sistema de votação digital onde cada voto é registrado de forma segura e não pode ser alterado',
                problem: 'Sistemas de votação tradicionais carecem de transparência e são vulneráveis a fraudes',
                solution:
                    'Implementação de smart contracts em Ethereum para registro imutável de votos, com frontend React e backend Go para gerenciamento',
                architecture: 'Frontend React → API Go → Ethereum Smart Contracts → IPFS (armazenamento)',
                highlights: [
                    'Votos criptograficamente seguros',
                    'Auditoria pública e transparente',
                    'Impossível alterar votos após registro',
                    'Zero-knowledge proofs para privacidade',
                ],
            },
            'ml-recommendation': {
                title: 'Sistema de Recomendação ML',
                description: 'Motor de recomendação usando Machine Learning com atualização em tempo real',
                descriptionSimple:
                    'Um sistema que aprende o que você gosta e sugere produtos ou conteúdos personalizados para você',
                problem: 'E-commerces precisam de recomendações personalizadas em tempo real para aumentar conversão',
                solution:
                    'Implementação de algoritmos de collaborative filtering e deep learning usando TensorFlow, com pipeline MLOps completo',
                architecture: 'Data Lake → Feature Store → ML Pipeline (TensorFlow) → Model Serving → API',
                highlights: [
                    'Predições em <100ms',
                    'A/B testing automatizado',
                    'Retreinamento contínuo com novos dados',
                    'Aumento de 40% em conversão',
                ],
            },
            'iot-monitoring': {
                title: 'IoT Monitoring Platform',
                description: 'Plataforma de monitoramento IoT para gerenciar milhares de dispositivos simultaneamente',
                descriptionSimple:
                    'Um sistema que monitora e controla dispositivos conectados, como sensores e câmeras, em tempo real',
                problem:
                    'Necessidade de coletar, processar e visualizar dados de milhares de dispositivos IoT em tempo real',
                solution:
                    'Arquitetura serverless com AWS IoT Core, Lambda para processamento, e DynamoDB para armazenamento de séries temporais',
                architecture: 'Dispositivos IoT → MQTT Broker → Lambda Functions → DynamoDB/TimeStream → Dashboard',
                highlights: [
                    'Suporta 10.000+ dispositivos',
                    'Latência média de 200ms',
                    'Alertas automáticos baseados em regras',
                    'Visualização geolocalizada em tempo real',
                ],
            },
        },
    },
    about: {
        title: 'Sobre Mim',
        subtitle: 'Além do código',
        interests: {
            coffee: {
                title: 'Café',
                description: 'Amante de café especial e métodos de extração',
            },
            sports: {
                title: 'Esportes',
                description: 'Futebol, corrida e treinos funcionais',
            },
            anime: {
                title: 'Anime',
                description: 'Attack on Titan, Death Note, Steins;Gate',
            },
            series: {
                title: 'Séries',
                description: 'Breaking Bad, Dark, The Last of Us',
            },
            movies: {
                title: 'Filmes',
                description: 'Sci-fi, thrillers psicológicos e Nolan',
            },
        },
    },
    techStack: {
        title: 'Tech Stack',
        subtitle: 'Ferramentas que domino',
        categories: {
            backend: 'Backend',
            frontend: 'Frontend',
            devops: 'DevOps',
            others: 'Outros',
        },
    },
    experience: {
        title: 'Experiência',
        subtitle: 'Minha jornada profissional',
        present: 'Presente',
        viewDetails: 'Ver Detalhes',
    },
    contact: {
        title: 'Vamos Conversar',
        subtitle: 'Estou sempre aberto a novas oportunidades',
        form: {
            name: 'Nome',
            email: 'Email',
            message: 'Mensagem',
            send: 'Enviar Mensagem',
            sending: 'Enviando...',
        },
        messages: {
            success: 'Mensagem enviada com sucesso!',
            error: 'Erro ao enviar mensagem. Tente novamente.',
        },
    },
    spotify: {
        title: 'Ouvindo Agora',
        topArtist: 'Artista Favorito',
        weeklyMinutes: 'Minutos Esta Semana',
        recentTracks: 'Tocadas Recentemente',
    },
    github: {
        title: 'GitHub Stats',
        contributions: 'Contribuições',
        topLanguages: 'Linguagens Principais',
        topRepos: 'Repositórios Destacados',
    },
    terminal: {
        welcome: 'Terminal Igor Trentini v1.0.0',
        help: 'Comandos disponíveis: about, skills, anime, clear, exit',
        aboutAnime: 'Animes favoritos: Attack on Titan, Death Note, Steins;Gate, Fullmetal Alchemist',
        aboutSkills: 'Skills: Golang, React, TypeScript, PostgreSQL, Redis, Docker',
        about: 'Full Stack Developer especializado em Golang e React',
        clear: 'Terminal limpo',
        unknown: 'Comando não encontrado. Digite "help" para ver comandos disponíveis.',
    },
} as const;

export default pt;
