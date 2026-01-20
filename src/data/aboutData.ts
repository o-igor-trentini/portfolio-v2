export interface AboutInterest {
    id: string;
    title: {
        pt: string;
        en: string;
        es: string;
    };
    description: {
        pt: string;
        en: string;
        es: string;
    };
    details: {
        pt: {
            intro: string;
            favorites: { title: string; items: string[] };
            why: string;
            funFact: string;
        };
        en: {
            intro: string;
            favorites: { title: string; items: string[] };
            why: string;
            funFact: string;
        };
        es: {
            intro: string;
            favorites: { title: string; items: string[] };
            why: string;
            funFact: string;
        };
    };
    images?: {
        url: string;
        caption: {
            pt: string;
            en: string;
            es: string;
        };
    }[];
}

export const aboutInterests: AboutInterest[] = [
    {
        id: 'coffee',
        title: {
            pt: 'Café',
            en: 'Coffee',
            es: 'Café',
        },
        description: {
            pt: 'Amante de café especial e métodos de extração',
            en: 'Specialty coffee lover and brewing methods',
            es: 'Amante del café especial y métodos de extracción',
        },
        details: {
            pt: {
                intro: 'Minha jornada com café começou há alguns anos, e hoje é muito mais que uma bebida - é um ritual diário que combina ciência, arte e paciência.',
                favorites: {
                    title: 'Métodos Favoritos',
                    items: [
                        'V60 - Para destacar notas complexas e frutadas',
                        'Aeropress - Versatilidade e praticidade no dia a dia',
                        'Chemex - Para cafés mais limpos e florais',
                        'Espresso - A base perfeita para cappuccinos',
                    ],
                },
                why: 'O que mais me fascina é o controle sobre cada variável: temperatura, moagem, tempo de extração. É quase como programar, onde pequenos ajustes fazem toda diferença no resultado final.',
                funFact: '☕ Consumo médio: 3-4 xícaras por dia | Origem preferida: cafés da Etiópia e Colômbia',
            },
            en: {
                intro: "My coffee journey started a few years ago, and today it's much more than a drink - it's a daily ritual that combines science, art and patience.",
                favorites: {
                    title: 'Favorite Methods',
                    items: [
                        'V60 - To highlight complex and fruity notes',
                        'Aeropress - Versatility and practicality in daily life',
                        'Chemex - For cleaner and floral coffees',
                        'Espresso - The perfect base for cappuccinos',
                    ],
                },
                why: "What fascinates me most is the control over each variable: temperature, grind, extraction time. It's almost like programming, where small adjustments make all the difference in the final result.",
                funFact: '☕ Average consumption: 3-4 cups per day | Preferred origin: Ethiopian and Colombian coffees',
            },
            es: {
                intro: 'Mi viaje con el café comenzó hace algunos años, y hoy es mucho más que una bebida - es un ritual diario que combina ciencia, arte y paciencia.',
                favorites: {
                    title: 'Métodos Favoritos',
                    items: [
                        'V60 - Para destacar notas complejas y afrutadas',
                        'Aeropress - Versatilidad y practicidad en el día a día',
                        'Chemex - Para cafés más limpios y florales',
                        'Espresso - La base perfecta para capuchinos',
                    ],
                },
                why: 'Lo que más me fascina es el control sobre cada variable: temperatura, molienda, tiempo de extracción. Es casi como programar, donde pequeños ajustes hacen toda la diferencia en el resultado final.',
                funFact: '☕ Consumo promedio: 3-4 tazas por día | Origen preferido: cafés de Etiopía y Colombia',
            },
        },
        images: [
            {
                url: '/images/about/coffee.webp',
                caption: {
                    pt: 'Visitando cafeterias especializadas',
                    en: 'Visiting specialty coffee shops',
                    es: 'Visitando cafeterías especializadas',
                },
            },
            {
                url: '/images/about/coffee.webp',
                caption: {
                    pt: 'Workshop de métodos de extração',
                    en: 'Brewing methods workshop',
                    es: 'Workshop de métodos de extracción',
                },
            },
            {
                url: '/images/about/coffee.webp',
                caption: {
                    pt: 'Treinamento de latte art',
                    en: 'Latte art training',
                    es: 'Entrenamiento de latte art',
                },
            },
        ],
    },
    {
        id: 'sports',
        title: {
            pt: 'Esportes',
            en: 'Sports',
            es: 'Deportes',
        },
        description: {
            pt: 'Futebol, corrida e treinos funcionais',
            en: 'Soccer, running and functional training',
            es: 'Fútbol, running y entrenamientos funcionales',
        },
        details: {
            pt: {
                intro: 'Esporte é minha forma de desligar da tela e liberar a mente. Seja no campo, na pista ou na academia, sempre busco superar meus próprios limites.',
                favorites: {
                    title: 'Atividades',
                    items: [
                        'Futebol - Jogo toda semana com amigos (posição: meio-campo)',
                        'Corrida - 5k-10k, geralmente pela manhã',
                        'Treino funcional - 3x por semana para condicionamento',
                        'Ciclismo - Passeios de fim de semana',
                    ],
                },
                why: 'Além dos benefícios físicos, o esporte me ensina disciplina, trabalho em equipe e resiliência - qualidades que aplico diretamente no desenvolvimento de software.',
                funFact:
                    '⚽ Time do coração: Internacional | 🏃 Melhor tempo 5k: 24min | 🎯 Meta: completar uma meia-maratona',
            },
            en: {
                intro: 'Sports are my way of disconnecting from screens and clearing my mind. Whether on the field, track or gym, I always seek to surpass my own limits.',
                favorites: {
                    title: 'Activities',
                    items: [
                        'Soccer - Play weekly with friends (position: midfielder)',
                        'Running - 5k-10k, usually in the morning',
                        'Functional training - 3x per week for conditioning',
                        'Cycling - Weekend rides',
                    ],
                },
                why: 'Beyond physical benefits, sports teach me discipline, teamwork and resilience - qualities I apply directly to software development.',
                funFact: '⚽ Favorite team: Internacional | 🏃 Best 5k time: 24min | 🎯 Goal: complete a half-marathon',
            },
            es: {
                intro: 'El deporte es mi forma de desconectar de la pantalla y liberar la mente. Ya sea en el campo, en la pista o en el gimnasio, siempre busco superar mis propios límites.',
                favorites: {
                    title: 'Actividades',
                    items: [
                        'Fútbol - Juego todas las semanas con amigos (posición: medio campo)',
                        'Running - 5k-10k, generalmente por la mañana',
                        'Entrenamiento funcional - 3x por semana para acondicionamiento',
                        'Ciclismo - Paseos de fin de semana',
                    ],
                },
                why: 'Además de los beneficios físicos, el deporte me enseña disciplina, trabajo en equipo y resiliencia - cualidades que aplico directamente en el desarrollo de software.',
                funFact:
                    '⚽ Equipo del corazón: Internacional | 🏃 Mejor tiempo 5k: 24min | 🎯 Meta: completar una media maratón',
            },
        },
        images: [
            {
                url: '/images/about/coffee.webp',
                caption: {
                    pt: 'Campeonatos de padel',
                    en: 'Padel tournaments',
                    es: 'Campeonatos de pádel',
                },
            },
            {
                url: '/images/about/coffee.webp',
                caption: {
                    pt: 'Provas de corrida',
                    en: 'Running races',
                    es: 'Carreras de running',
                },
            },
            {
                url: '/images/about/coffee.webp',
                caption: {
                    pt: 'Conquistas em competições',
                    en: 'Competition achievements',
                    es: 'Logros en competiciones',
                },
            },
        ],
    },
    {
        id: 'anime',
        title: {
            pt: 'Anime',
            en: 'Anime',
            es: 'Anime',
        },
        description: {
            pt: 'Attack on Titan, Death Note, Steins;Gate',
            en: 'Attack on Titan, Death Note, Steins;Gate',
            es: 'Attack on Titan, Death Note, Steins;Gate',
        },
        details: {
            pt: {
                intro: 'Animes não são só entretenimento - são narrativas complexas que exploram filosofia, moral e a natureza humana de formas únicas.',
                favorites: {
                    title: 'Top Animes',
                    items: [
                        'Attack on Titan - Narrativa épica e plot twists inesquecíveis',
                        'Death Note - Batalha psicológica e dilemas morais',
                        'Steins;Gate - Viagem no tempo e consequências devastadoras',
                        'Fullmetal Alchemist: Brotherhood - História completa e emocionante',
                        'Code Geass - Estratégia e reviravoltas constantes',
                    ],
                },
                why: 'Adoro animes que me fazem pensar, questionar e teorizar. A forma como constroem mundos complexos e personagens multidimensionais é inspiradora.',
                funFact:
                    '🎌 Animes assistidos: 150+ | 🏆 Gênero favorito: Seinen/Thriller Psicológico | 📚 Também leio mangas',
            },
            en: {
                intro: "Anime isn't just entertainment - they're complex narratives that explore philosophy, morality and human nature in unique ways.",
                favorites: {
                    title: 'Top Anime',
                    items: [
                        'Attack on Titan - Epic narrative and unforgettable plot twists',
                        'Death Note - Psychological battle and moral dilemmas',
                        'Steins;Gate - Time travel and devastating consequences',
                        'Fullmetal Alchemist: Brotherhood - Complete and emotional story',
                        'Code Geass - Strategy and constant plot twists',
                    ],
                },
                why: 'I love anime that makes me think, question and theorize. The way they build complex worlds and multidimensional characters is inspiring.',
                funFact:
                    '🎌 Anime watched: 150+ | 🏆 Favorite genre: Seinen/Psychological Thriller | 📚 I also read manga',
            },
            es: {
                intro: 'Los animes no son solo entretenimiento - son narrativas complejas que exploran filosofía, moral y la naturaleza humana de formas únicas.',
                favorites: {
                    title: 'Top Animes',
                    items: [
                        'Attack on Titan - Narrativa épica y plot twists inolvidables',
                        'Death Note - Batalla psicológica y dilemas morales',
                        'Steins;Gate - Viaje en el tiempo y consecuencias devastadoras',
                        'Fullmetal Alchemist: Brotherhood - Historia completa y emocionante',
                        'Code Geass - Estrategia y giros constantes',
                    ],
                },
                why: 'Me encantan los animes que me hacen pensar, cuestionar y teorizar. La forma en que construyen mundos complejos y personajes multidimensionales es inspiradora.',
                funFact:
                    '🎌 Animes vistos: 150+ | 🏆 Género favorito: Seinen/Thriller Psicológico | 📚 También leo mangas',
            },
        },
    },
    {
        id: 'series',
        title: {
            pt: 'Séries',
            en: 'Series',
            es: 'Series',
        },
        description: {
            pt: 'Breaking Bad, Dark, The Last of Us',
            en: 'Breaking Bad, Dark, The Last of Us',
            es: 'Breaking Bad, Dark, The Last of Us',
        },
        details: {
            pt: {
                intro: 'Sou atraído por séries que têm roteiros bem construídos, desenvolvimento de personagens profundo e narrativas que te mantêm pensando dias depois.',
                favorites: {
                    title: 'Séries Favoritas',
                    items: [
                        'Breaking Bad - A transformação perfeita e atuações impecáveis',
                        'Dark - Paradoxos temporais e storytelling não-linear',
                        'The Last of Us - Adaptação magistral e conexões emocionais',
                        'Mr. Robot - Hacking realista e crítica social',
                        'Succession - Drama familiar e diálogos afiados',
                    ],
                },
                why: 'Busco séries que desafiam convenções e não subestimam a inteligência do público. Gosto de narrativas densas que recompensam atenção aos detalhes.',
                funFact:
                    '📺 Plataforma mais usada: Netflix/HBO | 🎬 Prefiro séries limitadas/minisséries | ⏸️ Raramente assisto episódios isolados',
            },
            en: {
                intro: "I'm drawn to series with well-constructed scripts, deep character development and narratives that keep you thinking days later.",
                favorites: {
                    title: 'Favorite Series',
                    items: [
                        'Breaking Bad - Perfect transformation and impeccable performances',
                        'Dark - Time paradoxes and non-linear storytelling',
                        'The Last of Us - Masterful adaptation and emotional connections',
                        'Mr. Robot - Realistic hacking and social critique',
                        'Succession - Family drama and sharp dialogues',
                    ],
                },
                why: "I seek series that challenge conventions and don't underestimate audience intelligence. I like dense narratives that reward attention to detail.",
                funFact:
                    '📺 Most used platform: Netflix/HBO | 🎬 I prefer limited series/miniseries | ⏸️ I rarely watch isolated episodes',
            },
            es: {
                intro: 'Me atraen las series que tienen guiones bien construidos, desarrollo de personajes profundo y narrativas que te mantienen pensando días después.',
                favorites: {
                    title: 'Series Favoritas',
                    items: [
                        'Breaking Bad - La transformación perfecta y actuaciones impecables',
                        'Dark - Paradojas temporales y storytelling no-lineal',
                        'The Last of Us - Adaptación magistral y conexiones emocionales',
                        'Mr. Robot - Hacking realista y crítica social',
                        'Succession - Drama familiar y diálogos afilados',
                    ],
                },
                why: 'Busco series que desafían convenciones y no subestiman la inteligencia del público. Me gustan las narrativas densas que recompensan la atención a los detalles.',
                funFact:
                    '📺 Plataforma más usada: Netflix/HBO | 🎬 Prefiero series limitadas/miniseries | ⏸️ Rara vez veo episodios aislados',
            },
        },
    },
    {
        id: 'movies',
        title: {
            pt: 'Filmes',
            en: 'Movies',
            es: 'Películas',
        },
        description: {
            pt: 'Sci-fi, thrillers psicológicos e Nolan',
            en: 'Sci-fi, psychological thrillers and Nolan',
            es: 'Sci-fi, thrillers psicológicos y Nolan',
        },
        details: {
            pt: {
                intro: 'Sou fascinado por filmes que exploram conceitos complexos, seja através de ficção científica, thrillers psicológicos ou narrativas não-lineares.',
                favorites: {
                    title: 'Filmes Favoritos',
                    items: [
                        'Inception - Camadas de realidade e construção de mundos',
                        'Interstellar - Ciência, emoção e paradoxos temporais',
                        'The Prestige - Obsessão e sacrifício pela arte',
                        'Blade Runner 2049 - Estética visual e questionamentos existenciais',
                        'Shutter Island - Mistério psicológico e plot twist magistral',
                    ],
                },
                why: 'Christopher Nolan é meu diretor favorito pela forma como combina narrativas complexas com blockbusters acessíveis. Admiro filmes que funcionam em múltiplas camadas.',
                funFact:
                    '🎬 Filmes assistidos por ano: ~80 | 🍿 Gênero favorito: Sci-Fi/Thriller | 📽️ Sempre assisto com áudio original + legendas',
            },
            en: {
                intro: "I'm fascinated by films that explore complex concepts, whether through science fiction, psychological thrillers or non-linear narratives.",
                favorites: {
                    title: 'Favorite Movies',
                    items: [
                        'Inception - Layers of reality and world-building',
                        'Interstellar - Science, emotion and time paradoxes',
                        'The Prestige - Obsession and sacrifice for art',
                        'Blade Runner 2049 - Visual aesthetics and existential questions',
                        'Shutter Island - Psychological mystery and masterful plot twist',
                    ],
                },
                why: 'Christopher Nolan is my favorite director for how he combines complex narratives with accessible blockbusters. I admire films that work on multiple layers.',
                funFact:
                    '🎬 Movies watched per year: ~80 | 🍿 Favorite genre: Sci-Fi/Thriller | 📽️ Always watch with original audio + subtitles',
            },
            es: {
                intro: 'Me fascinan las películas que exploran conceptos complejos, ya sea a través de ciencia ficción, thrillers psicológicos o narrativas no-lineales.',
                favorites: {
                    title: 'Películas Favoritas',
                    items: [
                        'Inception - Capas de realidad y construcción de mundos',
                        'Interstellar - Ciencia, emoción y paradojas temporales',
                        'The Prestige - Obsesión y sacrificio por el arte',
                        'Blade Runner 2049 - Estética visual y cuestionamientos existenciales',
                        'Shutter Island - Misterio psicológico y plot twist magistral',
                    ],
                },
                why: 'Christopher Nolan es mi director favorito por cómo combina narrativas complejas con blockbusters accesibles. Admiro películas que funcionan en múltiples capas.',
                funFact:
                    '🎬 Películas vistas por año: ~80 | 🍿 Género favorito: Sci-Fi/Thriller | 📽️ Siempre veo con audio original + subtítulos',
            },
        },
    },
];
