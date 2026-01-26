/**
 * About interests metadata
 * Contains only IDs and image references (non-translatable data)
 * All translatable content is in i18n/locales
 */

export interface AboutInterestImage {
    url: string;
}

export interface AboutInterest {
    id: 'coffee' | 'sports' | 'anime' | 'series' | 'movies';
    images?: AboutInterestImage[];
}

export const aboutInterests: AboutInterest[] = [
    {
        id: 'coffee',
        images: [
            { url: '/images/about/coffee.webp' },
            { url: '/images/about/coffee.webp' },
            { url: '/images/about/coffee.webp' },
        ],
    },
    {
        id: 'sports',
        images: [
            { url: '/images/about/coffee.webp' },
            { url: '/images/about/coffee.webp' },
            { url: '/images/about/coffee.webp' },
        ],
    },
    {
        id: 'anime',
    },
    {
        id: 'series',
    },
    {
        id: 'movies',
    },
];
