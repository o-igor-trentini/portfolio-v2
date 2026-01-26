const es = {
    nav: {
        home: 'Inicio',
        projects: 'Proyectos',
        about: 'Sobre',
        experience: 'Carrera',
        contact: 'Contacto',
    },
    hero: {
        info: {
            title: {
                greeting: 'Hola, soy',
                name: 'Igor Trentini',
                role: 'Full Stack Developer',
                subtitle: 'Golang, React, TypeScript',
            },
            description:
                'Desarrollador apasionado por crear soluciones elegantes y escalables. Especializado en backend con Go y frontend moderno con React.',
            projectButton: 'Ver Proyectos',
            socialButton: 'Contactar',
        },
        connect: 'Conecta conmigo',
        scrollToExplore: 'Desplázate para explorar',
        available: 'Disponible para proyectos',
        specialist: 'Especialista en',
    },
    projects: {
        title: 'Proyectos',
        subtitle: 'Explorando ideas a través del código',
        tags: {
            filterLabel: 'Filtrar',
            all: 'Todos',
            professional: 'Profesionales',
            study: 'Estudios',
        },
        card: {
            viewMore: 'Ver Detalles',
        },
        detail: {
            technicalView: 'Vista Técnica',
            simpleView: 'Vista Simple',
            problem: 'Problema',
            solution: 'Solución',
            stack: 'Stack Tecnológico',
            architecture: 'Arquitectura',
            highlights: 'Destacados',
            viewOnGithub: 'Ver en GitHub',
            backToProjects: 'Volver a Proyectos',
        },
        projectCount: 'proyecto',
        projectsCount: 'proyectos',
        items: {
            'realtime-chat': {
                title: 'Chat en Tiempo Real',
                description:
                    'Sistema de chat en tiempo real con WebSockets, autenticación JWT y arquitectura de microservicios',
                descriptionSimple:
                    'Una aplicación de mensajería instantánea donde puedes chatear en tiempo real con otras personas',
                problem:
                    'Las empresas necesitan sistemas de comunicación interna escalables y seguros que soporten miles de usuarios simultáneos',
                solution:
                    'Implementación de WebSockets con Go para comunicación bidireccional, Redis para pub/sub y PostgreSQL para persistencia. La arquitectura de microservicios permite escalar horizontalmente',
                architecture:
                    'API Gateway → Servicio de Auth → Servicio de Chat (WebSocket) → Redis Pub/Sub → PostgreSQL',
                highlights: [
                    'Soporta 10,000+ conexiones simultáneas',
                    'Latencia promedio de 50ms',
                    'Sistema de presencia online en tiempo real',
                    'Historial de mensajes con búsqueda full-text',
                ],
            },
            'api-analytics': {
                title: 'Dashboard de Analytics',
                description:
                    'Dashboard de analytics en tiempo real con procesamiento de eventos y visualizaciones interactivas',
                descriptionSimple:
                    'Una herramienta que muestra gráficos y estadísticas sobre el uso de aplicaciones y sitios web',
                problem: 'Necesidad de procesar y visualizar millones de eventos de analytics con baja latencia',
                solution:
                    'Sistema de ingestión de datos en batch con Go, TimescaleDB para series temporales y agregaciones pre-computadas. Frontend React con visualizaciones optimizadas',
                architecture: 'Event Collector → Message Queue → Processing Service → TimescaleDB → API → Dashboard',
                highlights: [
                    'Procesa 1M+ eventos por segundo',
                    'Consultas con respuesta en <100ms',
                    'Gráficos interactivos con drill-down',
                    'Exportación de informes personalizados',
                ],
            },
            'task-automation': {
                title: 'Plataforma de Automatización de Tareas',
                description:
                    'Plataforma de automatización de tareas con interfaz visual drag-and-drop e integraciones con APIs externas',
                descriptionSimple:
                    'Una herramienta que conecta diferentes aplicaciones y automatiza tareas repetitivas sin necesidad de programar',
                problem:
                    'Usuarios no técnicos necesitan automatizar workflows complejos entre diferentes servicios sin conocimiento de código',
                solution:
                    'Editor visual drag-and-drop con React Flow, motor de ejecución en Go con workers paralelos y sistema de plugins para integraciones',
                architecture:
                    'Visual Editor → Workflow Parser → Job Queue → Worker Pool → Plugin System → External APIs',
                highlights: [
                    '50+ integraciones listas para usar',
                    'Ejecuciones paralelas con retry automático',
                    'Logs detallados y debugging visual',
                    'Webhooks y triggers personalizados',
                ],
            },
            'social-connect': {
                title: 'Social Connect',
                description: 'Clon de red social con feed en tiempo real, sistema de posts, likes y comentarios',
                descriptionSimple:
                    'Una red social donde puedes publicar fotos, dar like y comentar en las publicaciones de otros usuarios',
                problem: 'Aprender sobre optimización de feeds, scroll infinito e interacciones en tiempo real',
                solution:
                    'Implementación de virtual scrolling para rendimiento, WebSocket para actualizaciones en tiempo real y sistema de caché con Redis',
                architecture: 'React SPA → REST API → WebSocket Server → PostgreSQL + Redis',
                highlights: [
                    'Feed con scroll infinito optimizado',
                    'Actualizaciones en tiempo real de likes/comentarios',
                    'Upload de imágenes con preview',
                    'Sistema de seguir/dejar de seguir usuarios',
                ],
            },
            'crypto-tracker': {
                title: 'Crypto Tracker',
                description:
                    'Aplicación de seguimiento de criptomonedas con gráficos en tiempo real y alertas de precio',
                descriptionSimple:
                    'Una app que muestra los precios de criptomonedas y envía notificaciones cuando el precio cambia',
                problem: 'Practicar integración con APIs externas y visualización de datos en tiempo real',
                solution:
                    'Integración con CoinGecko API, gráficos interactivos con Recharts y sistema de notificaciones push',
                architecture: 'React App → CoinGecko API → Recharts Visualization → LocalStorage',
                highlights: [
                    'Gráficos de precios con múltiples timeframes',
                    'Lista de favoritos persistente',
                    'Alertas personalizados de precio',
                    'Dark mode automático',
                ],
            },
            'ecommerce-api': {
                title: 'API de E-Commerce',
                description: 'API RESTful completa para e-commerce con carrito, checkout y gestión de pedidos',
                descriptionSimple:
                    'Backend de una tienda online con sistema de carrito de compras y procesamiento de pedidos',
                problem:
                    'Los e-commerces necesitan sistemas robustos de procesamiento de pagos y gestión de inventario',
                solution:
                    'API RESTful en Go con integración Stripe, sistema de caché en Redis y transacciones ACID en PostgreSQL',
                architecture:
                    'API Gateway → Auth Service → Product Service → Cart Service → Payment Service → PostgreSQL',
                highlights: [
                    'Procesamiento de pagos con Stripe',
                    'Sistema de inventario con control de stock',
                    'Carrito de compras con sesión persistente',
                    'Historial completo de pedidos',
                ],
            },
        },
    },
    about: {
        title: 'Sobre Mí',
        subtitle: 'Más allá del código',
        interests: {
            coffee: {
                title: 'Café',
                description: 'Amante del café especial y métodos de extracción',
                intro: 'Mi viaje con el café comenzó hace algunos años, y hoy es mucho más que una bebida - es un ritual diario que combina ciencia, arte y paciencia.',
                favoritesTitle: 'Métodos Favoritos',
                favorites: [
                    'V60 - Para destacar notas complejas y afrutadas',
                    'Aeropress - Versatilidad y practicidad en el día a día',
                    'Chemex - Para cafés más limpios y florales',
                    'Espresso - La base perfecta para capuchinos',
                ],
                why: 'Lo que más me fascina es el control sobre cada variable: temperatura, molienda, tiempo de extracción. Es casi como programar, donde pequeños ajustes hacen toda la diferencia en el resultado final.',
                funFact: '☕ Consumo promedio: 3-4 tazas por día | Origen preferido: cafés de Etiopía y Colombia',
            },
            sports: {
                title: 'Deportes',
                description: 'Fútbol, running y entrenamientos funcionales',
                intro: 'El deporte es mi forma de desconectar de la pantalla y liberar la mente. Ya sea en el campo, en la pista o en el gimnasio, siempre busco superar mis propios límites.',
                favoritesTitle: 'Actividades',
                favorites: [
                    'Fútbol - Juego todas las semanas con amigos (posición: medio campo)',
                    'Running - 5k-10k, generalmente por la mañana',
                    'Entrenamiento funcional - 3x por semana para acondicionamiento',
                    'Ciclismo - Paseos de fin de semana',
                ],
                why: 'Además de los beneficios físicos, el deporte me enseña disciplina, trabajo en equipo y resiliencia - cualidades que aplico directamente en el desarrollo de software.',
                funFact:
                    '⚽ Equipo del corazón: Internacional | 🏃 Mejor tiempo 5k: 24min | 🎯 Meta: completar una media maratón',
            },
            anime: {
                title: 'Anime',
                description: 'Attack on Titan, Death Note, Steins;Gate',
                intro: 'Los animes no son solo entretenimiento - son narrativas complejas que exploran filosofía, moral y la naturaleza humana de formas únicas.',
                favoritesTitle: 'Top Animes',
                favorites: [
                    'Attack on Titan - Narrativa épica y plot twists inolvidables',
                    'Death Note - Batalla psicológica y dilemas morales',
                    'Steins;Gate - Viaje en el tiempo y consecuencias devastadoras',
                    'Fullmetal Alchemist: Brotherhood - Historia completa y emocionante',
                    'Code Geass - Estrategia y giros constantes',
                ],
                why: 'Me encantan los animes que me hacen pensar, cuestionar y teorizar. La forma en que construyen mundos complejos y personajes multidimensionales es inspiradora.',
                funFact:
                    '🎌 Animes vistos: 150+ | 🏆 Género favorito: Seinen/Thriller Psicológico | 📚 También leo mangas',
            },
            series: {
                title: 'Series',
                description: 'Breaking Bad, Dark, The Last of Us',
                intro: 'Me atraen las series que tienen guiones bien construidos, desarrollo de personajes profundo y narrativas que te mantienen pensando días después.',
                favoritesTitle: 'Series Favoritas',
                favorites: [
                    'Breaking Bad - La transformación perfecta y actuaciones impecables',
                    'Dark - Paradojas temporales y storytelling no-lineal',
                    'The Last of Us - Adaptación magistral y conexiones emocionales',
                    'Mr. Robot - Hacking realista y crítica social',
                    'Succession - Drama familiar y diálogos afilados',
                ],
                why: 'Busco series que desafían convenciones y no subestiman la inteligencia del público. Me gustan las narrativas densas que recompensan la atención a los detalles.',
                funFact:
                    '📺 Plataforma más usada: Netflix/HBO | 🎬 Prefiero series limitadas/miniseries | ⏸️ Rara vez veo episodios aislados',
            },
            movies: {
                title: 'Películas',
                description: 'Sci-fi, thrillers psicológicos y Nolan',
                intro: 'Me fascinan las películas que exploran conceptos complejos, ya sea a través de ciencia ficción, thrillers psicológicos o narrativas no-lineales.',
                favoritesTitle: 'Películas Favoritas',
                favorites: [
                    'Inception - Capas de realidad y construcción de mundos',
                    'Interstellar - Ciencia, emoción y paradojas temporales',
                    'The Prestige - Obsesión y sacrificio por el arte',
                    'Blade Runner 2049 - Estética visual y cuestionamientos existenciales',
                    'Shutter Island - Misterio psicológico y plot twist magistral',
                ],
                why: 'Christopher Nolan es mi director favorito por cómo combina narrativas complejas con blockbusters accesibles. Admiro películas que funcionan en múltiples capas.',
                funFact:
                    '🎬 Películas vistas por año: ~80 | 🍿 Género favorito: Sci-Fi/Thriller | 📽️ Siempre veo con audio original + subtítulos',
            },
        },
    },
    techStack: {
        title: 'Tech Stack',
        subtitle: 'Herramientas que domino',
        categories: {
            backend: 'Backend',
            frontend: 'Frontend',
            devops: 'DevOps',
            others: 'Otros',
        },
    },
    experience: {
        title: 'Experiencia',
        subtitle: 'Mi trayectoria profesional',
        present: 'Presente',
        viewDetails: 'Ver Detalles',
    },
    contact: {
        title: 'Hablemos',
        subtitle: 'Siempre estoy abierto a nuevas oportunidades',
        socials: {
            title: 'Redes Sociales',
            subtitle: 'Conéctate conmigo en las redes sociales',
            github: 'GitHub',
            linkedin: 'LinkedIn',
            instagram: 'Instagram',
        },
    },
    spotify: {
        title: 'Escuchando Ahora',
        topArtist: 'Artista Favorito',
        weeklyMinutes: 'Minutos Esta Semana',
        recentTracks: 'Tocadas Recientemente',
    },
    github: {
        title: 'GitHub Stats',
        contributions: 'Contribuciones',
        topLanguages: 'Lenguajes Principales',
        topRepos: 'Repositorios Destacados',
    },
    terminal: {
        welcome: 'Terminal Igor Trentini v1.0.0',
        help: 'Comandos disponibles: about, skills, anime, clear, exit',
        aboutAnime: 'Animes favoritos: Attack on Titan, Death Note, Steins;Gate, Fullmetal Alchemist',
        aboutSkills: 'Skills: Golang, React, TypeScript, PostgreSQL, Redis, Docker',
        about: 'Full Stack Developer especializado en Golang y React',
        clear: 'Terminal limpiada',
        unknown: 'Comando no encontrado. Escribe "help" para ver comandos disponibles.',
    },
} as const;

export default es;
