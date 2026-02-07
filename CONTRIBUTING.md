# Contribuição

Guia de convenções e padrões para contribuir com o projeto.

## Idioma

- Código, nomes de pastas e arquivos sempre em **inglês**
- Documentação, comentários, logs e nomes de teste sempre em **pt-BR** (com acentuação correta)
- Comentários apenas para lógica complexa, avisos importantes ou algo relevante — evitar comentários óbvios ou desnecessários

## Estilo de Código

### Formatação (Prettier)

- Aspas simples
- Indentação de 4 espaços
- Largura de 120 caracteres
- Trailing commas
- Ponto e vírgula

### Linting (ESLint)

- Flat config (ESLint 9)
- Sem `else return`
- Sem non-null assertions (`!`)
- Sem chaves desnecessárias em JSX

### Ordem de Imports

external → builtin → internal (`@/components`, `@/hooks`) → sibling → parent → index

Alfabético dentro de cada grupo, garantido pelo `eslint-plugin-import-helpers`.

### Nomenclatura

- **Componentes**: Funcionais com hooks, arquivos em PascalCase
- **Hooks**: Prefixo `use`, arquivos em camelCase

## i18n

- `pt.ts` é a fonte de verdade — sempre começar por ele
- Manter a mesma estrutura de chaves nos três locales (`pt.ts`, `en.ts`, `es.ts`)
- Usar `t('chave.aninhada')` com suporte a `returnObjects`
