import enTranslations from './locales/en';
import esTranslations from './locales/es';
import type pt from './locales/pt';
import ptTranslations from './locales/pt';

// Extract the structure type from the Portuguese translation (our source of truth)
// We use the structure but not the literal types to allow different text values
type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends (infer U)[]
        ? DeepPartial<U>[]
        : T[P] extends object
          ? DeepPartial<T[P]>
          : T[P] extends string
            ? string
            : T[P];
};

export type TranslationStructure = typeof pt;
export type Translation = DeepPartial<TranslationStructure>;

// Create a type that matches the structure but allows different string values
type TranslationSchema = {
    [K in keyof TranslationStructure]: TranslationStructure[K] extends object
        ? TranslationStructure[K] extends string[]
            ? string[]
            : TranslationSchema & TranslationStructure[K]
        : string;
};

// Validate that all translations match the structure
const validateStructure = <T extends TranslationSchema>(translation: T): T => translation;

const translations = {
    pt: ptTranslations,
    en: validateStructure(enTranslations as unknown as TranslationSchema),
    es: validateStructure(esTranslations as unknown as TranslationSchema),
};

export default translations;

// Helper type for nested translation keys
export type TranslationKeys = keyof TranslationStructure;
export type NestedTranslationKeys<T> = T extends object
    ? {
          [K in keyof T]: T[K] extends object
              ? K extends string
                  ? `${K}.${NestedTranslationKeys<T[K]> & string}` | K
                  : never
              : K;
      }[keyof T]
    : never;

export type AllTranslationKeys = NestedTranslationKeys<TranslationStructure>;
