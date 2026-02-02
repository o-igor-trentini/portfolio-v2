const en = {
    nav: {
        home: 'Home',
        projects: 'Projects',
        about: 'About',
        experience: 'Experience',
        contact: 'Contact',
    },
    hero: {
        info: {
            title: {
                greeting: 'Hello, I am',
                name: 'Igor Trentini',
                role: 'Full Stack Developer',
                subtitle: 'Golang, React, TypeScript',
            },
            description:
                'Developer passionate about creating elegant and scalable solutions. Specialized in backend with Go and modern frontend with React.',
            projectButton: 'View Projects',
            socialButton: 'Get in Touch',
        },
        connect: 'Connect with me',
        scrollToExplore: 'Scroll to explore',
        available: 'Available for projects',
        specialist: 'Specialist in',
    },
    projects: {
        title: 'Projects',
        subtitle: 'Exploring ideas through code',
        tags: {
            filterLabel: 'Filter',
            all: 'All',
            professional: 'Professional',
            study: 'Study',
        },
        card: {
            viewMore: 'View Details',
        },
        detail: {
            technicalView: 'Technical View',
            simpleView: 'Simple View',
            problem: 'Problem',
            solution: 'Solution',
            stack: 'Tech Stack',
            architecture: 'Architecture',
            highlights: 'Highlights',
            viewOnGithub: 'View on GitHub',
            backToProjects: 'Back to Projects',
        },
        projectCount: 'project',
        projectsCount: 'projects',
        items: {
            'realtime-chat': {
                title: 'Real-time Chat',
                description:
                    'Real-time chat system with WebSockets, JWT authentication, and microservices architecture',
                descriptionSimple: 'An instant messaging app where you can chat in real-time with other people',
                problem:
                    'Companies need scalable and secure internal communication systems that support thousands of simultaneous users',
                solution:
                    'Implementation of WebSockets with Go for bidirectional communication, Redis for pub/sub, and PostgreSQL for persistence. Microservices architecture allows horizontal scaling',
                architecture: 'API Gateway → Auth Service → Chat Service (WebSocket) → Redis Pub/Sub → PostgreSQL',
                highlights: [
                    'Supports 10,000+ simultaneous connections',
                    'Average latency of 50ms',
                    'Real-time online presence system',
                    'Message history with full-text search',
                ],
            },
            'api-analytics': {
                title: 'Analytics Dashboard',
                description: 'Real-time analytics dashboard with event processing and interactive visualizations',
                descriptionSimple: 'A tool that shows graphs and statistics about app and website usage',
                problem: 'Need to process and visualize millions of analytics events with low latency',
                solution:
                    'Batch data ingestion system with Go, TimescaleDB for time series, and pre-computed aggregations. React frontend with optimized visualizations',
                architecture: 'Event Collector → Message Queue → Processing Service → TimescaleDB → API → Dashboard',
                highlights: [
                    'Processes 1M+ events per second',
                    'Queries with <100ms response',
                    'Interactive charts with drill-down',
                    'Custom report export',
                ],
            },
            'task-automation': {
                title: 'Task Automation Platform',
                description:
                    'Task automation platform with visual drag-and-drop interface and external API integrations',
                descriptionSimple: 'A tool that connects different apps and automates repetitive tasks without coding',
                problem:
                    'Non-technical users need to automate complex workflows between different services without coding knowledge',
                solution:
                    'Visual drag-and-drop editor with React Flow, execution engine in Go with parallel workers, and plugin system for integrations',
                architecture:
                    'Visual Editor → Workflow Parser → Job Queue → Worker Pool → Plugin System → External APIs',
                highlights: [
                    '50+ ready-to-use integrations',
                    'Parallel executions with automatic retry',
                    'Detailed logs and visual debugging',
                    'Custom webhooks and triggers',
                ],
            },
            'social-connect': {
                title: 'Social Connect',
                description: 'Social network clone with real-time feed, posts, likes and comments system',
                descriptionSimple: 'A social network where you can post photos, like and comment on other users posts',
                problem: 'Learn about feed optimization, infinite scroll and real-time interactions',
                solution:
                    'Implementation of virtual scrolling for performance, WebSocket for real-time updates, and caching system with Redis',
                architecture: 'React SPA → REST API → WebSocket Server → PostgreSQL + Redis',
                highlights: [
                    'Optimized infinite scroll feed',
                    'Real-time likes/comments updates',
                    'Image upload with preview',
                    'Follow/unfollow user system',
                ],
            },
            'crypto-tracker': {
                title: 'Crypto Tracker',
                description: 'Cryptocurrency tracking app with real-time charts and price alerts',
                descriptionSimple: 'An app that shows cryptocurrency prices and sends notifications when prices change',
                problem: 'Practice external API integration and real-time data visualization',
                solution:
                    'Integration with CoinGecko API, interactive charts with Recharts, and push notification system',
                architecture: 'React App → CoinGecko API → Recharts Visualization → LocalStorage',
                highlights: [
                    'Price charts with multiple timeframes',
                    'Persistent favorites list',
                    'Custom price alerts',
                    'Automatic dark mode',
                ],
            },
            'ecommerce-api': {
                title: 'E-Commerce API',
                description: 'Complete RESTful API for e-commerce with cart, checkout and order management',
                descriptionSimple: 'Backend for an online store with shopping cart system and order processing',
                problem: 'E-commerces need robust payment processing and inventory management systems',
                solution:
                    'RESTful API in Go with Stripe integration, Redis caching system, and ACID transactions in PostgreSQL',
                architecture:
                    'API Gateway → Auth Service → Product Service → Cart Service → Payment Service → PostgreSQL',
                highlights: [
                    'Payment processing with Stripe',
                    'Inventory system with stock control',
                    'Shopping cart with persistent session',
                    'Complete order history',
                ],
            },
        },
    },
    about: {
        title: 'About Me',
        subtitle: 'Beyond the code',
        interests: {
            coffee: {
                title: 'Coffee',
                description: 'Specialty coffee lover and brewing methods',
                intro: "My coffee journey started a few years ago, and today it's much more than a drink - it's a daily ritual that combines science, art and patience.",
                favoritesTitle: 'Favorite Methods',
                favorites: [
                    'V60 - To highlight complex and fruity notes',
                    'Aeropress - Versatility and practicality in daily life',
                    'Chemex - For cleaner and floral coffees',
                    'Espresso - The perfect base for cappuccinos',
                ],
                why: "What fascinates me most is the control over each variable: temperature, grind, extraction time. It's almost like programming, where small adjustments make all the difference in the final result.",
                funFact: '☕ Average consumption: 3-4 cups per day | Preferred origin: Ethiopian and Colombian coffees',
            },
            sports: {
                title: 'Sports',
                description: 'Soccer, running and functional training',
                intro: 'Sports are my way of disconnecting from screens and clearing my mind. Whether on the field, track or gym, I always seek to surpass my own limits.',
                favoritesTitle: 'Activities',
                favorites: [
                    'Soccer - Play weekly with friends (position: midfielder)',
                    'Running - 5k-10k, usually in the morning',
                    'Functional training - 3x per week for conditioning',
                    'Cycling - Weekend rides',
                ],
                why: 'Beyond physical benefits, sports teach me discipline, teamwork and resilience - qualities I apply directly to software development.',
                funFact: '⚽ Favorite team: Internacional | 🏃 Best 5k time: 24min | 🎯 Goal: complete a half-marathon',
            },
            anime: {
                title: 'Anime',
                description: 'Attack on Titan, Death Note, Steins;Gate',
                intro: "Anime isn't just entertainment - they're complex narratives that explore philosophy, morality and human nature in unique ways.",
                favoritesTitle: 'Top Anime',
                favorites: [
                    'Attack on Titan - Epic narrative and unforgettable plot twists',
                    'Death Note - Psychological battle and moral dilemmas',
                    'Steins;Gate - Time travel and devastating consequences',
                    'Fullmetal Alchemist: Brotherhood - Complete and emotional story',
                    'Code Geass - Strategy and constant plot twists',
                ],
                why: 'I love anime that makes me think, question and theorize. The way they build complex worlds and multidimensional characters is inspiring.',
                funFact:
                    '🎌 Anime watched: 150+ | 🏆 Favorite genre: Seinen/Psychological Thriller | 📚 I also read manga',
            },
            series: {
                title: 'Series',
                description: 'Breaking Bad, Dark, The Last of Us',
                intro: "I'm drawn to series with well-constructed scripts, deep character development and narratives that keep you thinking days later.",
                favoritesTitle: 'Favorite Series',
                favorites: [
                    'Breaking Bad - Perfect transformation and impeccable performances',
                    'Dark - Time paradoxes and non-linear storytelling',
                    'The Last of Us - Masterful adaptation and emotional connections',
                    'Mr. Robot - Realistic hacking and social critique',
                    'Succession - Family drama and sharp dialogues',
                ],
                why: "I seek series that challenge conventions and don't underestimate audience intelligence. I like dense narratives that reward attention to detail.",
                funFact:
                    '📺 Most used platform: Netflix/HBO | 🎬 I prefer limited series/miniseries | ⏸️ I rarely watch isolated episodes',
            },
            movies: {
                title: 'Movies',
                description: 'Sci-fi, psychological thrillers and Nolan',
                intro: "I'm fascinated by films that explore complex concepts, whether through science fiction, psychological thrillers or non-linear narratives.",
                favoritesTitle: 'Favorite Movies',
                favorites: [
                    'Inception - Layers of reality and world-building',
                    'Interstellar - Science, emotion and time paradoxes',
                    'The Prestige - Obsession and sacrifice for art',
                    'Blade Runner 2049 - Visual aesthetics and existential questions',
                    'Shutter Island - Psychological mystery and masterful plot twist',
                ],
                why: 'Christopher Nolan is my favorite director for how he combines complex narratives with accessible blockbusters. I admire films that work on multiple layers.',
                funFact:
                    '🎬 Movies watched per year: ~80 | 🍿 Favorite genre: Sci-Fi/Thriller | 📽️ Always watch with original audio + subtitles',
            },
        },
    },
    techStack: {
        title: 'Tech Stack',
        subtitle: 'Tools I master',
        filterLabel: 'Filter',
        all: 'All',
        item: 'item',
        items: 'items',
        badges: {
            favorite: 'Favorite',
            professional: 'Professional',
            learning: 'Learning',
            hobby: 'Hobby',
        },
        categories: {
            backend: 'Backend',
            frontend: 'Frontend',
            devops: 'DevOps & Cloud',
            versioning: 'Version Control',
            'ai-tools': 'AI Tools',
            os: 'Operating Systems',
            terminals: 'Terminals',
            testing: 'Testing',
            others: 'Other Technologies',
        },
    },
    experience: {
        title: 'Experience',
        subtitle: 'My professional journey',
        present: 'Present',
        viewDetails: 'View Details',
        items: {
            logae: {
                position: 'Full Stack Developer',
                period: '2021 - Present',
                location: 'Remote',
                description:
                    'Development of scalable systems with Golang and React. Implementation of microservices, RESTful APIs and modern interfaces.',
                achievements: [
                    'Reduced API latency by 40% through optimizations',
                    'Implemented caching system with Redis',
                    'Developed analytics dashboard with 100k+ events/day',
                    'Migrated monolith to microservices architecture',
                ],
            },
        },
    },
    contact: {
        title: "Let's Talk",
        subtitle: "I'm always open to new opportunities",
        socials: {
            title: 'Social Networks',
            subtitle: 'Connect with me on social media',
            github: 'GitHub',
            linkedin: 'LinkedIn',
            instagram: 'Instagram',
        },
    },
    spotify: {
        title: 'Now Playing',
        topArtist: 'Top Artist',
        weeklyMinutes: 'Minutes This Week',
        recentTracks: 'Recently Played',
        providerAvailable: 'Use',
        providerOffline: 'Service unavailable',
    },
    github: {
        title: 'GitHub Stats',
        contributions: 'Contributions',
        topLanguages: 'Top Languages',
        topRepos: 'Featured Repositories',
    },
    terminal: {
        welcome: 'Igor Trentini Terminal v1.0.0',
        help: 'Available commands: about, skills, anime, clear, exit',
        aboutAnime: 'Favorite anime: Attack on Titan, Death Note, Steins;Gate, Fullmetal Alchemist',
        aboutSkills: 'Skills: Golang, React, TypeScript, PostgreSQL, Redis, Docker',
        about: 'Full Stack Developer specialized in Golang and React',
        clear: 'Terminal cleared',
        unknown: 'Command not found. Type "help" to see available commands.',
    },
} as const;

export default en;
