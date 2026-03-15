# CLAUDE.md - Contexto para Claude Code

Este arquivo contém contexto técnico específico para auxiliar o Claude Code a trabalhar eficientemente com este repositório.

> **Para desenvolvedores humanos:** Consulte [CONTRIBUTING.md](./CONTRIBUTING.md) para padrões completos e [README.md](./README.md) para setup inicial.

---

## Arquivos Críticos do Sistema

### Aplicação Principal

- **`src/App.tsx`** - Root component, lazy loading de seções, gerenciamento de modais (Terminal, ProjectDetail)
- **`src/main.tsx`** - Entry point da aplicação

### Estado e Persistência

- **`src/hooks/useTheme.tsx`** - Zustand store + localStorage (tema claro/escuro)
- **`src/hooks/useLanguage.tsx`** - Wrapper i18next (idioma pt/en/es)
- **`src/hooks/useMusic.tsx`** - Hook unificado Spotify/Last.fm (configurável via `VITE_MUSIC_PROVIDER`)

### Backend For Frontend (BFF)

- **`src/lib/api.ts`** - Cliente para Netlify Functions (`fetchFunction<T>`)
- **`netlify/functions/github.ts`** - Repos e contribuições GitHub
- **`netlify/functions/spotify.ts`** - Now playing via Spotify API
- **`netlify/functions/lastfm.ts`** - Now playing via Last.fm API

### Configuração

- **`vite.config.ts`** - Bundler config, vendor splitting, path aliases
- **`vitest.config.ts`** - Testes: jsdom, setup, coverage thresholds
- **`eslint.config.mjs`** - ESLint 9 flat config
- **`netlify.toml`** - Build e dev config do Netlify

---

## ⚠️ Pontos Críticos de Arquitetura

### 1. State Management Pattern

O projeto usa **Zustand** para estado global persistido e **estado local** para o resto:

#### Zustand (Estado Global Persistido)

- **useTheme:** Tema claro/escuro com persist em localStorage
- **Regra:** Novos estados globais que precisam persistir devem usar Zustand + persist middleware

#### Estado Local (useState)

- **App.tsx:** selectedProject, isTerminalOpen
- **Regra:** Estado exclusivo de um componente usa useState normal

#### Context API

- Usado apenas para providers de bibliotecas (i18next)
- **NÃO** criar novos Context providers — preferir Zustand

**Exemplo correto:**

```typescript
// ✅ Zustand para estado persistido
const theme = useTheme((state) => state.theme);

// ✅ Estado local para UI temporária
const [isOpen, setIsOpen] = useState(false);

// ❌ NÃO criar Context providers novos
const MyContext = createContext(...); // Evitar
```

### 2. Code Splitting com React.lazy()

- **TODAS** as seções da página usam lazy loading (ver `App.tsx`)
- Hero é o único componente carregado eagerly (above the fold)
- Seções encapsuladas em `<Suspense>` com fallback

### 3. BFF Pattern (Netlify Functions)

- Chamadas a APIs externas **SEMPRE** passam pelo BFF para proteger tokens
- Fluxo: `Browser → Netlify Function → API Externa (GitHub, Spotify, Last.fm)`
- Client-side usa `fetchFunction<T>()` de `src/lib/api.ts`
- **NUNCA** expor tokens de API no client-side

### 4. Design System: shadcn/ui

- Componentes UI em `src/components/ui/` seguem padrão [shadcn/ui](https://ui.shadcn.com/)
- Primitivos Radix UI + CVA para variantes + `cn()` (clsx + tailwind-merge)
- Barrel file em `src/components/ui/index.ts` → importar via `@ui`

### 5. i18n com Três Locales

- `pt.ts` é a **fonte de verdade** — sempre começar por ele
- Manter **mesma estrutura de chaves** em `pt.ts`, `en.ts` e `es.ts`
- Chaves são objetos aninhados: `t('projects.card.viewProject')`

---

## Estrutura de Pastas

```
src/
├── App.tsx                      # Root + lazy loading de seções
├── main.tsx                     # Entry point
│
├── components/
│   ├── ui/                      # shadcn/ui (CVA + Radix UI primitives)
│   │   ├── button.tsx, badge.tsx, input.tsx, ...
│   │   └── index.ts             # Barrel file → @ui
│   ├── layout/                  # Estrutura da página
│   │   ├── Header.tsx           # Navegação + switchers (tema, idioma)
│   │   ├── Footer.tsx
│   │   ├── CustomCursor.tsx
│   │   ├── Terminal.tsx         # Terminal interativo
│   │   └── SkipToContent.tsx    # Acessibilidade
│   ├── sections/                # Seções lazy-loaded (cada uma com diretório)
│   │   ├── Hero/
│   │   ├── Projects/
│   │   ├── About/
│   │   ├── TechStack/
│   │   ├── Experience/
│   │   └── Contact/
│   └── common/                  # Compartilhados
│       ├── SEO.tsx
│       └── OptimizedImage.tsx
│
├── hooks/                       # Custom hooks
│   ├── useTheme.tsx             # Zustand store (tema)
│   ├── useLanguage.tsx          # i18next wrapper
│   ├── useMusic.tsx             # Spotify/Last.fm unificado
│   ├── useGitHub.tsx            # GitHub API via BFF
│   ├── useTerminal.ts           # Estado do terminal
│   ├── useInViewport.ts         # IntersectionObserver
│   ├── useScrollHighlight.ts
│   └── index.ts                 # Barrel file → @hooks
│
├── lib/
│   ├── api.ts                   # Cliente BFF (fetchFunction)
│   ├── cache.ts                 # Cache utility
│   └── i18n/
│       ├── locales/
│       │   ├── pt.ts            # 🇧🇷 Fonte de verdade
│       │   ├── en.ts            # 🇺🇸
│       │   └── es.ts            # 🇪🇸
│       └── index.ts             # Configuração i18next
│
├── config/
│   └── musicProvider.ts         # Config runtime do provedor de música
│
├── utils/
│   └── imageUtils.ts            # Helpers de otimização de imagem
│
├── styles/
│   └── globals.css              # Diretivas Tailwind
│
└── tests/
    ├── setup.ts                 # Setup global (jest-dom, vitest-axe, mocks)
    ├── a11y.test.tsx             # Testes de acessibilidade
    └── helpers/                 # Helpers de teste

netlify/functions/               # Serverless functions (BFF)
├── github.ts                    # GitHub API (repos + contribuições)
├── spotify.ts                   # Spotify API
└── lastfm.ts                    # Last.fm API
```

---

## Navegação do Código (Path Aliases)

| Alias    | Mapeia para                   | Uso                                                |
| -------- | ----------------------------- | -------------------------------------------------- |
| `@/*`    | `src/*`                       | Imports gerais: `import { cn } from '@/lib/utils'` |
| `@hooks` | `src/hooks/` (barrel)         | Hooks: `import { useTheme } from '@hooks'`         |
| `@ui`    | `src/components/ui/` (barrel) | UI: `import { Button } from '@ui'`                 |

---

## Padrões de Nomenclatura

| Tipo              | Padrão           | Exemplo                              |
| ----------------- | ---------------- | ------------------------------------ |
| Componente        | PascalCase       | `ProjectCard.tsx`                    |
| Hook              | camelCase + use  | `useTheme.tsx`                       |
| Utilitário        | camelCase        | `imageUtils.ts`                      |
| Tipo/Interface    | PascalCase       | `Project`, `ThemeStore`              |
| Constante         | UPPER_SNAKE_CASE | `MUSIC_PROVIDER`, `BASE_PATH`        |
| Seção (diretório) | PascalCase       | `src/components/sections/TechStack/` |

---

## Diretrizes de Código

### Idioma

- **Código, pastas, arquivos:** Inglês
- **Documentação, comentários, logs, nomes de teste:** pt-BR (com acentuação)
- **Comentários:** Apenas para lógica complexa, avisos importantes ou algo relevante

### Componentes

- **SEMPRE** arrow functions: `const Comp: FC = (): ReactElement => { ... }`
- **NUNCA** declaração `function` ou class components
- **Importações diretas** do React: `import { FC, ReactElement } from 'react'` (não `React.FC`)
- **Extrair lógica** em hooks customizados
- **Componentes UI** seguem padrão CVA + `cn()` (shadcn/ui)

### JSX

- Componentes irmãos separados por **linha em branco**
- Somente wrapper direto pode "encostar" no primeiro filho

### Estilo

- **Tailwind CSS 4** para toda estilização (sem CSS separado)
- `cn()` para composição de classes condicionais
- **Não** criar arquivos CSS/LESS para componentes

### i18n

- Atualizar **os três locales** ao adicionar conteúdo (`pt.ts`, `en.ts`, `es.ts`)
- `pt.ts` é a fonte de verdade

### Commits

- [Conventional Commits](https://www.conventionalcommits.org/) — validado por commitlint via Husky
- Exemplos: `feat: adiciona seção de skills`, `fix(header): corrige navegação mobile`

> **Detalhes completos:** [CONTRIBUTING.md](./CONTRIBUTING.md)

---

## Testes

### Setup

- **Framework:** Vitest + React Testing Library
- **Acessibilidade:** vitest-axe (`toHaveNoViolations`)
- **Ambiente:** jsdom
- **Setup file:** `src/tests/setup.ts` (mocks de matchMedia, IntersectionObserver, scrollIntoView, VITE_MUSIC_PROVIDER)

### Thresholds de Cobertura

| Métrica    | Mínimo |
| ---------- | ------ |
| Statements | 60%    |
| Branches   | 50%    |
| Functions  | 60%    |
| Lines      | 60%    |

### Convenções de Teste

- **Nomes** (describe/it) em **pt-BR**
- **Código** de teste em inglês
- **Queries:** `getByRole` > `getByLabelText` > `getByText` > `getByTestId`
- **User events:** Sempre `@testing-library/user-event` (não `fireEvent`)
- **Acessibilidade:** Incluir teste com vitest-axe em componentes visuais
- **Proibido:** Comentários `// Arrange`, `// Act`, `// Assert`

> **Templates e detalhes:** Consulte [subagent_tester.md](./.claude/agents/subagent_tester.md)

---

## Integrações Externas

| Serviço         | Uso                    | Variáveis de Ambiente                                                 |
| --------------- | ---------------------- | --------------------------------------------------------------------- |
| **GitHub API**  | Repos e contribuições  | `GITHUB_TOKEN` (server-side)                                          |
| **Spotify API** | Now playing            | `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN` |
| **Last.fm API** | Now playing (fallback) | `LASTFM_API_KEY`, `LASTFM_USERNAME`                                   |

**Client-side:** `VITE_MUSIC_PROVIDER=spotify|lastfm`

Todas as integrações passam pelo BFF (Netlify Functions) — tokens **nunca** expostos no client.

---

## Comandos Essenciais

### Desenvolvimento

```bash
npm run dev              # Servidor via Netlify CLI (porta 3000)
npm run dev:vite         # Servidor via Vite diretamente
npm run build            # TypeScript check + build
npm run preview          # Pré-visualiza build de produção
```

### Qualidade

```bash
npm run lint             # ESLint (zero warnings)
npm run lint:fix         # Auto-fix lint
npx tsc --noEmit         # TypeScript check
```

### Testes

```bash
npm test                 # Roda testes (single run)
npm run test:watch       # Testes em modo watch
npm run test:coverage    # Testes com cobertura
```

### Utilitários

```bash
npm run optimize-images  # Otimiza imagens (sharp)
npm run deploy           # Build + deploy GitHub Pages
```

---

## Subagentes Especializados

Este projeto utiliza subagentes especializados para tarefas específicas. Todos seguem o padrão `subagent_[nome]` em snake_case.

> **Importante:** Todos os subagentes devem registrar suas interações no [CHANGELOG_AGENTS.md](./CHANGELOG_AGENTS.md).

### Subagentes Disponíveis

| Subagente                    | Arquivo                                               | Especialização                                                  |
| ---------------------------- | ----------------------------------------------------- | --------------------------------------------------------------- |
| **Component Specialist**     | `.claude/agents/subagent_component_specialist.md`     | Componentes React, shadcn/ui, Tailwind, motion/react, hooks     |
| **UI Architect**             | `.claude/agents/subagent_ui_architect.md`             | Arquitetura de UI, design system, state management, performance |
| **Tester**                   | `.claude/agents/subagent_tester.md`                   | Vitest, React Testing Library, vitest-axe, cobertura            |
| **Documentation Specialist** | `.claude/agents/subagent_documentation_specialist.md` | Documentação técnica, i18n, sincronização de docs               |

> **Quando usar e detalhes completos:** Consulte o arquivo específico de cada subagente.

### Como Criar Novos Subagentes

> 📖 **Template:** `.claude/agents/TEMPLATE_SUBAGENT.md`
> **Guia de uso:** `.claude/agents/README_TEMPLATE.md`

**Processo rápido:**

1. Copiar template:

    ```bash
    cp .claude/agents/TEMPLATE_SUBAGENT.md .claude/agents/subagent_[nome].md
    ```

2. Preencher 13 seções obrigatórias (especialização, responsabilidades, integração, princípios, templates, FAQ, etc.)

3. Validar: 400-700 linhas, frontmatter YAML completo, exemplos reais do projeto

4. Documentar nesta seção do CLAUDE.md

### Protocolo Obrigatório

**TODOS os subagentes devem:**

- ✅ Registrar resumo de interação no CHANGELOG_AGENTS.md ao final
- ✅ Usar template padrão de entrada do changelog
- ✅ Incluir tags apropriadas
- ✅ Documentar descobertas e decisões importantes

---

## Comportamentos Técnicos

### Performance

- **Lazy loading:** Todas as seções (exceto Hero)
- **Vendor splitting:** Chunks separados para react, motion, lucide-react, radix-ui, i18n
- **Memoization:** useCallback para handlers em App.tsx
- **Animações:** motion/react com `whileInView` + `viewport={{ once: true }}`

### Acessibilidade

- **SkipToContent** no layout
- **Radix UI** primitives (acessibilidade nativa)
- **vitest-axe** nos testes
- **Semantic HTML** (main, section, headings hierárquicos)

### CI/CD

- **GitHub Actions:** lint, testes e build em PRs para `main`
- **Husky:** pre-commit (lint-staged), commit-msg (commitlint)
- **Dependabot:** atualização semanal de dependências

---

## Referências de Documentação

### Documentos Principais

- **[README.md](./README.md)** - Setup e arquitetura
- **[CONTRIBUTING.md](./CONTRIBUTING.md)** - Convenções de código e estilo
- **[CHANGELOG_AGENTS.md](./CHANGELOG_AGENTS.md)** - Histórico de interações de subagentes

### Documentação Auxiliar (docs/)

- **[DEPLOY_SECRETS.md](./docs/DEPLOY_SECRETS.md)** - Configuração de secrets para deploy
- **[I18N.md](./docs/I18N.md)** - Guia de internacionalização
- **[MUSIC_PROVIDER.md](./docs/MUSIC_PROVIDER.md)** - Configuração do provedor de música
- **[IMAGE_OPTIMIZATION.md](./docs/IMAGE_OPTIMIZATION.md)** - Otimização de imagens
- **[FONT_OPTIMIZATION.md](./docs/FONT_OPTIMIZATION.md)** - Otimização de fontes

---

_Este arquivo é específico para assistentes de IA. Desenvolvedores humanos devem consultar CONTRIBUTING.md._
