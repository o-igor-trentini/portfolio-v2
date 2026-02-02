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
            'task-automation': {
                title: 'Task Automation Platform',
                description:
                    'Plataforma de automação de tarefas com interface visual drag-and-drop e integrações com APIs externas',
                descriptionSimple:
                    'Uma ferramenta que conecta diferentes aplicativos e automatiza tarefas repetitivas sem precisar programar',
                problem:
                    'Usuários não-técnicos precisam automatizar workflows complexos entre diferentes serviços sem conhecimento de código',
                solution:
                    'Editor visual drag-and-drop com React Flow, engine de execução em Go com workers paralelos, e sistema de plugins para integrações',
                architecture:
                    'Visual Editor → Workflow Parser → Job Queue → Worker Pool → Plugin System → External APIs',
                highlights: [
                    '50+ integrações prontas para uso',
                    'Execuções paralelas com retry automático',
                    'Logs detalhados e debugging visual',
                    'Webhooks e triggers customizados',
                ],
            },
            'social-connect': {
                title: 'Social Connect',
                description: 'Clone de rede social com feed em tempo real, sistema de posts, likes e comentários',
                descriptionSimple:
                    'Uma rede social onde você pode postar fotos, curtir e comentar nas publicações de outros usuários',
                problem: 'Aprender sobre otimização de feeds, scroll infinito e interações em tempo real',
                solution:
                    'Implementação de virtual scrolling para performance, WebSocket para atualizações em tempo real, e sistema de cache com Redis',
                architecture: 'React SPA → REST API → WebSocket Server → PostgreSQL + Redis',
                highlights: [
                    'Feed com scroll infinito otimizado',
                    'Atualizações em tempo real de likes/comentários',
                    'Upload de imagens com preview',
                    'Sistema de seguir/deixar de seguir usuários',
                ],
            },
            'crypto-tracker': {
                title: 'Crypto Tracker',
                description:
                    'Aplicativo de acompanhamento de criptomoedas com gráficos em tempo real e alertas de preço',
                descriptionSimple:
                    'Um app que mostra os preços de criptomoedas e envia notificações quando o preço muda',
                problem: 'Praticar integração com APIs externas e visualização de dados em tempo real',
                solution:
                    'Integração com CoinGecko API, gráficos interativos com Recharts, e sistema de notificações push',
                architecture: 'React App → CoinGecko API → Recharts Visualization → LocalStorage',
                highlights: [
                    'Gráficos de preços com múltiplos timeframes',
                    'Lista de favoritos persistente',
                    'Alertas customizados de preço',
                    'Dark mode automático',
                ],
            },
            'ecommerce-api': {
                title: 'E-Commerce API',
                description: 'API RESTful completa para e-commerce com carrinho, checkout e gestão de pedidos',
                descriptionSimple:
                    'Backend de uma loja online com sistema de carrinho de compras e processamento de pedidos',
                problem:
                    'E-commerces precisam de sistemas robustos de processamento de pagamentos e gestão de inventário',
                solution:
                    'API RESTful em Go com integração Stripe, sistema de cache em Redis, e transações ACID no PostgreSQL',
                architecture:
                    'API Gateway → Auth Service → Product Service → Cart Service → Payment Service → PostgreSQL',
                highlights: [
                    'Processamento de pagamentos com Stripe',
                    'Sistema de inventário com controle de estoque',
                    'Carrinho de compras com sessão persistente',
                    'Histórico completo de pedidos',
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
                intro: 'Minha jornada com café começou há alguns anos, e hoje é muito mais que uma bebida - é um ritual diário que combina ciência, arte e paciência.',
                favoritesTitle: 'Métodos Favoritos',
                favorites: [
                    'V60 - Para destacar notas complexas e frutadas',
                    'Aeropress - Versatilidade e praticidade no dia a dia',
                    'Chemex - Para cafés mais limpos e florais',
                    'Espresso - A base perfeita para cappuccinos',
                ],
                why: 'O que mais me fascina é o controle sobre cada variável: temperatura, moagem, tempo de extração. É quase como programar, onde pequenos ajustes fazem toda diferença no resultado final.',
                funFact: '☕ Consumo médio: 3-4 xícaras por dia | Origem preferida: cafés da Etiópia e Colômbia',
            },
            sports: {
                title: 'Esportes',
                description: 'Futebol, corrida e treinos funcionais',
                intro: 'Esporte é minha forma de desligar da tela e liberar a mente. Seja no campo, na pista ou na academia, sempre busco superar meus próprios limites.',
                favoritesTitle: 'Atividades',
                favorites: [
                    'Futebol - Jogo toda semana com amigos (posição: meio-campo)',
                    'Corrida - 5k-10k, geralmente pela manhã',
                    'Treino funcional - 3x por semana para condicionamento',
                    'Ciclismo - Passeios de fim de semana',
                ],
                why: 'Além dos benefícios físicos, o esporte me ensina disciplina, trabalho em equipe e resiliência - qualidades que aplico diretamente no desenvolvimento de software.',
                funFact:
                    '⚽ Time do coração: Internacional | 🏃 Melhor tempo 5k: 24min | 🎯 Meta: completar uma meia-maratona',
            },
            anime: {
                title: 'Anime',
                description: 'Attack on Titan, Death Note, Steins;Gate',
                intro: 'Animes não são só entretenimento - são narrativas complexas que exploram filosofia, moral e a natureza humana de formas únicas.',
                favoritesTitle: 'Top Animes',
                favorites: [
                    'Attack on Titan - Narrativa épica e plot twists inesquecíveis',
                    'Death Note - Batalha psicológica e dilemas morais',
                    'Steins;Gate - Viagem no tempo e consequências devastadoras',
                    'Fullmetal Alchemist: Brotherhood - História completa e emocionante',
                    'Code Geass - Estratégia e reviravoltas constantes',
                ],
                why: 'Adoro animes que me fazem pensar, questionar e teorizar. A forma como constroem mundos complexos e personagens multidimensionais é inspiradora.',
                funFact:
                    '🎌 Animes assistidos: 150+ | 🏆 Gênero favorito: Seinen/Thriller Psicológico | 📚 Também leio mangas',
            },
            series: {
                title: 'Séries',
                description: 'Breaking Bad, Dark, The Last of Us',
                intro: 'Sou atraído por séries que têm roteiros bem construídos, desenvolvimento de personagens profundo e narrativas que te mantêm pensando dias depois.',
                favoritesTitle: 'Séries Favoritas',
                favorites: [
                    'Breaking Bad - A transformação perfeita e atuações impecáveis',
                    'Dark - Paradoxos temporais e storytelling não-linear',
                    'The Last of Us - Adaptação magistral e conexões emocionais',
                    'Mr. Robot - Hacking realista e crítica social',
                    'Succession - Drama familiar e diálogos afiados',
                ],
                why: 'Busco séries que desafiam convenções e não subestimam a inteligência do público. Gosto de narrativas densas que recompensam atenção aos detalhes.',
                funFact:
                    '📺 Plataforma mais usada: Netflix/HBO | 🎬 Prefiro séries limitadas/minisséries | ⏸️ Raramente assisto episódios isolados',
            },
            movies: {
                title: 'Filmes',
                description: 'Sci-fi, thrillers psicológicos e Nolan',
                intro: 'Sou fascinado por filmes que exploram conceitos complexos, seja através de ficção científica, thrillers psicológicos ou narrativas não-lineares.',
                favoritesTitle: 'Filmes Favoritos',
                favorites: [
                    'Inception - Camadas de realidade e construção de mundos',
                    'Interstellar - Ciência, emoção e paradoxos temporais',
                    'The Prestige - Obsessão e sacrifício pela arte',
                    'Blade Runner 2049 - Estética visual e questionamentos existenciais',
                    'Shutter Island - Mistério psicológico e plot twist magistral',
                ],
                why: 'Christopher Nolan é meu diretor favorito pela forma como combina narrativas complexas com blockbusters acessíveis. Admiro filmes que funcionam em múltiplas camadas.',
                funFact:
                    '🎬 Filmes assistidos por ano: ~80 | 🍿 Gênero favorito: Sci-Fi/Thriller | 📽️ Sempre assisto com áudio original + legendas',
            },
        },
    },
    techStack: {
        title: 'Tech Stack',
        subtitle: 'Ferramentas que domino',
        filterLabel: 'Filtrar',
        all: 'Todos',
        item: 'item',
        items: 'itens',
        badges: {
            favorite: 'Favorito',
            professional: 'Profissional',
            learning: 'Aprendendo',
            hobby: 'Hobby',
        },
        categories: {
            backend: 'Backend',
            frontend: 'Frontend',
            devops: 'DevOps & Cloud',
            versioning: 'Versionamento',
            'ai-tools': 'Ferramentas de IA',
            os: 'Sistemas Operacionais',
            terminals: 'Terminais',
            testing: 'Testes',
            others: 'Outras Tecnologias',
        },
    },
    experience: {
        title: 'Experiência',
        subtitle: 'Minha jornada profissional',
        present: 'Presente',
        viewDetails: 'Ver Detalhes',
        items: {
            logae: {
                position: 'Full Stack Developer',
                period: '2021 - Presente',
                location: 'Remoto',
                description:
                    'Desenvolvimento de sistemas escaláveis com Golang e React. Implementação de microserviços, APIs RESTful e interfaces modernas.',
                achievements: [
                    'Reduziu latência de APIs em 40% através de otimizações',
                    'Implementou sistema de cache com Redis',
                    'Desenvolveu dashboard analytics com 100k+ eventos/dia',
                    'Migrou monolito para arquitetura de microserviços',
                ],
            },
        },
    },
    contact: {
        title: 'Vamos Conversar',
        subtitle: 'Estou sempre aberto a novas oportunidades',
        socials: {
            title: 'Redes Sociais',
            subtitle: 'Conecte-se comigo nas redes sociais',
            github: 'GitHub',
            linkedin: 'LinkedIn',
            instagram: 'Instagram',
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
