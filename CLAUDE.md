# CLAUDE.md

Este arquivo fornece orientações ao Claude Code (claude.ai/code) ao trabalhar com o código deste repositório.

Consultar [README.md](README.md) para visão geral, setup e arquitetura. Consultar [CONTRIBUTING.md](CONTRIBUTING.md) para convenções de código e estilo.

## Referência Rápida

```bash
npm run dev              # Servidor de desenvolvimento (porta 3000)
npm run build            # TypeScript check + build
npm run lint             # Lint (zero warnings)
npm run lint:fix         # Auto-fix lint
npm test                 # Roda os testes (Vitest)
npm run test:watch       # Testes em modo watch
npm run test:coverage    # Testes com cobertura
```

## Navegação do Código

- `@/*` mapeia para `src/*` — sempre usar para imports
- `@hooks` mapeia para `src/hooks/` (barrel file) — usar `import { ... } from '@hooks'` para hooks
- `@ui` mapeia para `src/components/ui/` (barrel file) — usar `import { ... } from '@ui'` para componentes UI
- Seções da página: `src/components/sections/` (cada uma com seu diretório)
- Hooks de estado: `src/hooks/` (useTheme, useLanguage, useMusic, useGitHub)
- Traduções: `src/lib/i18n/locales/` (`pt.ts` é a fonte de verdade)
- Variáveis de ambiente prefixadas com `VITE_` (ver `.env.example`)

## Diretrizes

Seguir as convenções definidas em [CONTRIBUTING.md](CONTRIBUTING.md). Resumo essencial:

- Código, pastas e arquivos em **inglês**; documentação, comentários, logs e nomes de teste em **pt-BR** (com acentuação)
- Comentários apenas para lógica complexa, avisos importantes ou algo relevante
- Ao adicionar conteúdo i18n, atualizar os três locales (`pt.ts`, `en.ts`, `es.ts`) mantendo a mesma estrutura
- Seções novas devem usar `React.lazy()` para code splitting
- Componentes de UI seguem o padrão CVA + `cn()` (clsx + tailwind-merge)
- Commits seguem [Conventional Commits](https://www.conventionalcommits.org/) — validado por commitlint via Husky
