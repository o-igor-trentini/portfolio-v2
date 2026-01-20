export interface Project {
    id: string;
    title: string;
    description: {
        pt: string;
        en: string;
        es: string;
    };
    descriptionSimple: {
        pt: string;
        en: string;
        es: string;
    };
    image: string;
    tags: string[];
    type: 'professional' | 'study';
    problem: {
        pt: string;
        en: string;
        es: string;
    };
    solution: {
        pt: string;
        en: string;
        es: string;
    };
    stack: string[];
    architecture: {
        pt: string;
        en: string;
        es: string;
    };
    highlights: {
        pt: string[];
        en: string[];
        es: string[];
    };
    github?: string;
}

export const projects: Project[] = [
    {
        id: 'realtime-chat',
        title: 'Chat em Tempo Real',
        description: {
            pt: 'Sistema de chat em tempo real com WebSockets, autenticação JWT, e arquitetura de microserviços',
            en: 'Real-time chat system with WebSockets, JWT authentication, and microservices architecture',
            es: 'Sistema de chat en tiempo real con WebSockets, autenticación JWT y arquitectura de microservicios',
        },
        descriptionSimple: {
            pt: 'Um aplicativo de mensagens instantâneas onde você pode conversar em tempo real com outras pessoas',
            en: 'An instant messaging app where you can chat in real-time with other people',
            es: 'Una aplicación de mensajería instantánea donde puedes chatear en tiempo real con otras personas',
        },
        image: 'https://images.unsplash.com/photo-1756903646251-5f9d4154fe80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb21tdW5pY2F0aW9uJTIwdGVjaHxlbnwxfHx8fDE3NjMyMTg3MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['Golang', 'WebSockets', 'React', 'Redis', 'PostgreSQL'],
        type: 'professional',
        problem: {
            pt: 'Empresas precisam de sistemas de comunicação interna escaláveis e seguros que suportem milhares de usuários simultâneos',
            en: 'Companies need scalable and secure internal communication systems that support thousands of simultaneous users',
            es: 'Las empresas necesitan sistemas de comunicación interna escalables y seguros que soporten miles de usuarios simultáneos',
        },
        solution: {
            pt: 'Implementação de WebSockets com Go para comunicação bidirecional, Redis para pub/sub, e PostgreSQL para persistência. Arquitetura de microserviços permite escalar horizontalmente',
            en: 'Implementation of WebSockets with Go for bidirectional communication, Redis for pub/sub, and PostgreSQL for persistence. Microservices architecture allows horizontal scaling',
            es: 'Implementación de WebSockets con Go para comunicación bidireccional, Redis para pub/sub y PostgreSQL para persistencia. La arquitectura de microservicios permite escalar horizontalmente',
        },
        stack: ['Golang', 'WebSockets', 'React', 'TypeScript', 'Redis', 'PostgreSQL', 'Docker'],
        architecture: {
            pt: 'API Gateway → Serviço de Auth → Serviço de Chat (WebSocket) → Redis Pub/Sub → PostgreSQL',
            en: 'API Gateway → Auth Service → Chat Service (WebSocket) → Redis Pub/Sub → PostgreSQL',
            es: 'API Gateway → Servicio de Auth → Servicio de Chat (WebSocket) → Redis Pub/Sub → PostgreSQL',
        },
        highlights: {
            pt: [
                'Suporta 10.000+ conexões simultâneas',
                'Latência média de 50ms',
                'Sistema de presença online em tempo real',
                'Histórico de mensagens com busca full-text',
            ],
            en: [
                'Supports 10,000+ simultaneous connections',
                'Average latency of 50ms',
                'Real-time online presence system',
                'Message history with full-text search',
            ],
            es: [
                'Soporta 10,000+ conexiones simultáneas',
                'Latencia promedio de 50ms',
                'Sistema de presencia online en tiempo real',
                'Historial de mensajes con búsqueda full-text',
            ],
        },
        github: 'https://github.com/igortrentini/realtime-chat',
    },
    {
        id: 'api-analytics',
        title: 'Analytics Dashboard',
        description: {
            pt: 'Dashboard de analytics em tempo real com processamento de eventos e visualizações interativas',
            en: 'Real-time analytics dashboard with event processing and interactive visualizations',
            es: 'Dashboard de analytics en tiempo real con procesamiento de eventos y visualizaciones interactivas',
        },
        descriptionSimple: {
            pt: 'Uma ferramenta que mostra gráficos e estatísticas sobre o uso de aplicativos e websites',
            en: 'A tool that shows graphs and statistics about app and website usage',
            es: 'Una herramienta que muestra gráficos y estadísticas sobre el uso de aplicaciones y sitios web',
        },
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXRhJTIwYW5hbHl0aWNzJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc2MzEyNzc4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['React', 'Golang', 'TimescaleDB', 'Chart.js'],
        type: 'professional',
        problem: {
            pt: 'Necessidade de processar e visualizar milhões de eventos de analytics com baixa latência',
            en: 'Need to process and visualize millions of analytics events with low latency',
            es: 'Necesidad de procesar y visualizar millones de eventos de analytics con baja latencia',
        },
        solution: {
            pt: 'Sistema de ingestão de dados em batch com Go, TimescaleDB para séries temporais, e agregações pré-computadas. Frontend React com visualizações otimizadas',
            en: 'Batch data ingestion system with Go, TimescaleDB for time series, and pre-computed aggregations. React frontend with optimized visualizations',
            es: 'Sistema de ingestión de datos en batch con Go, TimescaleDB para series temporales y agregaciones pre-computadas. Frontend React con visualizaciones optimizadas',
        },
        stack: ['Golang', 'React', 'TypeScript', 'TimescaleDB', 'Redis', 'Recharts'],
        architecture: {
            pt: 'Event Collector → Message Queue → Processing Service → TimescaleDB → API → Dashboard',
            en: 'Event Collector → Message Queue → Processing Service → TimescaleDB → API → Dashboard',
            es: 'Event Collector → Message Queue → Processing Service → TimescaleDB → API → Dashboard',
        },
        highlights: {
            pt: [
                'Processa 1M+ eventos por segundo',
                'Consultas com resposta em <100ms',
                'Gráficos interativos com drill-down',
                'Exportação de relatórios customizados',
            ],
            en: [
                'Processes 1M+ events per second',
                'Queries with <100ms response',
                'Interactive charts with drill-down',
                'Custom report export',
            ],
            es: [
                'Procesa 1M+ eventos por segundo',
                'Consultas con respuesta en <100ms',
                'Gráficos interactivos con drill-down',
                'Exportación de informes personalizados',
            ],
        },
        github: 'https://github.com/igortrentini/analytics-dashboard',
    },
    {
        id: 'task-automation',
        title: 'Task Automation Platform',
        description: {
            pt: 'Plataforma de automação de tarefas com interface visual drag-and-drop e integrações com APIs externas',
            en: 'Task automation platform with visual drag-and-drop interface and external API integrations',
            es: 'Plataforma de automatização de tarefas com interfaz visual drag-and-drop e integraciones com APIs externas',
        },
        descriptionSimple: {
            pt: 'Uma ferramenta que conecta diferentes aplicativos e automatiza tarefas repetitivas sem precisar programar',
            en: 'A tool that connects different apps and automates repetitive tasks without coding',
            es: 'Una herramienta que conecta diferentes aplicaciones y automatiza tarefas repetitivas sin necesidad de programar',
        },
        image: 'https://images.unsplash.com/photo-1563884705074-7c8b15f16295?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXRvbWF0aW9uJTIwd29ya2Zsb3d8ZW58MXx8fHwxNzYzMjE4NzExfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['React', 'Golang', 'PostgreSQL', 'Docker'],
        type: 'study',
        problem: {
            pt: 'Usuários não-técnicos precisam automatizar workflows complexos entre diferentes serviços sem conhecimento de código',
            en: 'Non-technical users need to automate complex workflows between different services without coding knowledge',
            es: 'Usuarios no técnicos necesitan automatizar workflows complejos entre diferentes servicios sin conocimiento de código',
        },
        solution: {
            pt: 'Editor visual drag-and-drop com React Flow, engine de execução em Go com workers paralelos, e sistema de plugins para integrações',
            en: 'Visual drag-and-drop editor with React Flow, execution engine in Go with parallel workers, and plugin system for integrations',
            es: 'Editor visual drag-and-drop con React Flow, motor de ejecución en Go con workers paralelos y sistema de plugins para integraciones',
        },
        stack: ['Golang', 'React', 'TypeScript', 'PostgreSQL', 'Docker', 'React Flow'],
        architecture: {
            pt: 'Visual Editor → Workflow Parser → Job Queue → Worker Pool → Plugin System → External APIs',
            en: 'Visual Editor → Workflow Parser → Job Queue → Worker Pool → Plugin System → External APIs',
            es: 'Visual Editor → Workflow Parser → Job Queue → Worker Pool → Plugin System → External APIs',
        },
        highlights: {
            pt: [
                '50+ integrações prontas para uso',
                'Execuções paralelas com retry automático',
                'Logs detalhados e debugging visual',
                'Webhooks e triggers customizados',
            ],
            en: [
                '50+ ready-to-use integrations',
                'Parallel executions with automatic retry',
                'Detailed logs and visual debugging',
                'Custom webhooks and triggers',
            ],
            es: [
                '50+ integraciones listas para usar',
                'Ejecuciones paralelas con retry automático',
                'Logs detallados y debugging visual',
                'Webhooks y triggers personalizados',
            ],
        },
        github: 'https://github.com/igortrentini/task-automation',
    },
    {
        id: 'social-connect',
        title: 'Social Connect',
        description: {
            pt: 'Clone de rede social com feed em tempo real, sistema de posts, likes e comentários',
            en: 'Social network clone with real-time feed, posts, likes and comments system',
            es: 'Clon de red social con feed en tiempo real, sistema de posts, likes y comentarios',
        },
        descriptionSimple: {
            pt: 'Uma rede social onde você pode postar fotos, curtir e comentar nas publicações de outros usuários',
            en: 'A social network where you can post photos, like and comment on other users posts',
            es: 'Una red social donde puedes publicar fotos, dar like y comentar en las publicaciones de otros usuarios',
        },
        image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NpYWwlMjBtZWRpYSUyMGFwcHxlbnwxfHx8fDE3Njg0NjY1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['React', 'TypeScript', 'Node.js', 'Socket.io'],
        type: 'study',
        problem: {
            pt: 'Aprender sobre otimização de feeds, scroll infinito e interações em tempo real',
            en: 'Learn about feed optimization, infinite scroll and real-time interactions',
            es: 'Aprender sobre optimización de feeds, scroll infinito e interacciones en tiempo real',
        },
        solution: {
            pt: 'Implementação de virtual scrolling para performance, WebSocket para atualizações em tempo real, e sistema de cache com Redis',
            en: 'Implementation of virtual scrolling for performance, WebSocket for real-time updates, and caching system with Redis',
            es: 'Implementación de virtual scrolling para rendimiento, WebSocket para actualizaciones en tiempo real y sistema de caché con Redis',
        },
        stack: ['React', 'TypeScript', 'Node.js', 'Socket.io', 'PostgreSQL', 'Redis'],
        architecture: {
            pt: 'React SPA → REST API → WebSocket Server → PostgreSQL + Redis',
            en: 'React SPA → REST API → WebSocket Server → PostgreSQL + Redis',
            es: 'React SPA → REST API → WebSocket Server → PostgreSQL + Redis',
        },
        highlights: {
            pt: [
                'Feed com scroll infinito otimizado',
                'Atualizações em tempo real de likes/comentários',
                'Upload de imagens com preview',
                'Sistema de seguir/deixar de seguir usuários',
            ],
            en: [
                'Optimized infinite scroll feed',
                'Real-time likes/comments updates',
                'Image upload with preview',
                'Follow/unfollow user system',
            ],
            es: [
                'Feed con scroll infinito optimizado',
                'Actualizaciones en tiempo real de likes/comentarios',
                'Upload de imágenes con preview',
                'Sistema de seguir/dejar de seguir usuarios',
            ],
        },
        github: 'https://github.com/igortrentini/social-connect',
    },
    {
        id: 'crypto-tracker',
        title: 'Crypto Tracker',
        description: {
            pt: 'Aplicativo de acompanhamento de criptomoedas com gráficos em tempo real e alertas de preço',
            en: 'Cryptocurrency tracking app with real-time charts and price alerts',
            es: 'Aplicación de seguimiento de criptomonedas con gráficos en tiempo real y alertas de precio',
        },
        descriptionSimple: {
            pt: 'Um app que mostra os preços de criptomoedas e envia notificações quando o preço muda',
            en: 'An app that shows cryptocurrency prices and sends notifications when prices change',
            es: 'Una app que muestra los precios de criptomonedas y envía notificaciones cuando el precio cambia',
        },
        image: 'https://images.unsplash.com/photo-1666816943035-15c29931e975?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibG9ja2NoYWluJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3Njg0OTQ2ODV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['React', 'TypeScript', 'CoinGecko API', 'Recharts'],
        type: 'study',
        problem: {
            pt: 'Praticar integração com APIs externas e visualização de dados em tempo real',
            en: 'Practice external API integration and real-time data visualization',
            es: 'Practicar integración con APIs externas y visualización de datos en tiempo real',
        },
        solution: {
            pt: 'Integração com CoinGecko API, gráficos interativos com Recharts, e sistema de notificações push',
            en: 'Integration with CoinGecko API, interactive charts with Recharts, and push notification system',
            es: 'Integración con CoinGecko API, gráficos interactivos con Recharts y sistema de notificaciones push',
        },
        stack: ['React', 'TypeScript', 'CoinGecko API', 'Recharts', 'LocalStorage'],
        architecture: {
            pt: 'React App → CoinGecko API → Recharts Visualization → LocalStorage',
            en: 'React App → CoinGecko API → Recharts Visualization → LocalStorage',
            es: 'React App → CoinGecko API → Recharts Visualization → LocalStorage',
        },
        highlights: {
            pt: [
                'Gráficos de preços com múltiplos timeframes',
                'Lista de favoritos persistente',
                'Alertas customizados de preço',
                'Dark mode automático',
            ],
            en: [
                'Price charts with multiple timeframes',
                'Persistent favorites list',
                'Custom price alerts',
                'Automatic dark mode',
            ],
            es: [
                'Gráficos de precios con múltiples timeframes',
                'Lista de favoritos persistente',
                'Alertas personalizados de precio',
                'Dark mode automático',
            ],
        },
        github: 'https://github.com/igortrentini/crypto-tracker',
    },
    {
        id: 'ecommerce-api',
        title: 'E-Commerce API',
        description: {
            pt: 'API RESTful completa para e-commerce com carrinho, checkout e gestão de pedidos',
            en: 'Complete RESTful API for e-commerce with cart, checkout and order management',
            es: 'API RESTful completa para e-commerce con carrito, checkout y gestión de pedidos',
        },
        descriptionSimple: {
            pt: 'Backend de uma loja online com sistema de carrinho de compras e processamento de pedidos',
            en: 'Backend for an online store with shopping cart system and order processing',
            es: 'Backend de una tienda online con sistema de carrito de compras y procesamiento de pedidos',
        },
        image: 'https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwbGF0Zm9ybXxlbnwxfHx8fDE3Njg1MTUzMDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        tags: ['Golang', 'PostgreSQL', 'Redis', 'Stripe API'],
        type: 'professional',
        problem: {
            pt: 'E-commerces precisam de sistemas robustos de processamento de pagamentos e gestão de inventário',
            en: 'E-commerces need robust payment processing and inventory management systems',
            es: 'Los e-commerces necesitan sistemas robustos de procesamiento de pagos y gestión de inventario',
        },
        solution: {
            pt: 'API RESTful em Go com integração Stripe, sistema de cache em Redis, e transações ACID no PostgreSQL',
            en: 'RESTful API in Go with Stripe integration, Redis caching system, and ACID transactions in PostgreSQL',
            es: 'API RESTful en Go con integración Stripe, sistema de caché en Redis y transacciones ACID en PostgreSQL',
        },
        stack: ['Golang', 'PostgreSQL', 'Redis', 'Stripe API', 'JWT', 'Docker'],
        architecture: {
            pt: 'API Gateway → Auth Service → Product Service → Cart Service → Payment Service → PostgreSQL',
            en: 'API Gateway → Auth Service → Product Service → Cart Service → Payment Service → PostgreSQL',
            es: 'API Gateway → Auth Service → Product Service → Cart Service → Payment Service → PostgreSQL',
        },
        highlights: {
            pt: [
                'Processamento de pagamentos com Stripe',
                'Sistema de inventário com controle de estoque',
                'Carrinho de compras com sessão persistente',
                'Histórico completo de pedidos',
            ],
            en: [
                'Payment processing with Stripe',
                'Inventory system with stock control',
                'Shopping cart with persistent session',
                'Complete order history',
            ],
            es: [
                'Procesamiento de pagos con Stripe',
                'Sistema de inventario con control de stock',
                'Carrito de compras con sesión persistente',
                'Historial completo de pedidos',
            ],
        },
        github: 'https://github.com/igortrentini/ecommerce-api',
    },
];
