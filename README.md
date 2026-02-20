# Portfolio V2

Site de portfólio moderno construído com React 19, TypeScript (modo strict), Vite e Tailwind CSS 4. Possui suporte a múltiplos idiomas (pt/en/es), tema claro/escuro, integração com Spotify/Last.fm, widget do GitHub e animações com Motion.

Design original no [Figma](https://www.figma.com/design/Oelxd8sakmkRCCLffAuBuW/Portfolio-v2).

## Setup

```bash
npm install
cp .env.example .env     # Configurar variáveis de ambiente
npm run dev              # Servidor de desenvolvimento na porta 3000
```

## Comandos

```bash
npm run dev              # Inicia o servidor de desenvolvimento
npm run build            # Verificação TypeScript + build Vite
npm run preview          # Pré-visualiza o build de produção
npm run lint             # ESLint (zero warnings permitidos)
npm run lint:fix         # Corrige problemas de lint automaticamente
npm test                 # Roda os testes (Vitest)
npm run test:watch       # Testes em modo watch
npm run test:coverage    # Testes com cobertura
npm run optimize-images  # Otimiza imagens em src/ (sharp)
npm run deploy           # Build + deploy no GitHub Pages
```

## Variáveis de Ambiente

Server-side (Netlify Functions):

```
SPOTIFY_CLIENT_ID
SPOTIFY_CLIENT_SECRET
SPOTIFY_REFRESH_TOKEN
GITHUB_TOKEN
LASTFM_API_KEY
LASTFM_USERNAME
```

Client-side (prefixo `VITE_`):

```
VITE_MUSIC_PROVIDER=spotify|lastfm
```

## Arquitetura

### Path Alias

`@/*` mapeia para `src/*`.

### Estrutura de Diretórios

- `src/components/ui/` — Primitivos atômicos de UI (Radix UI + CVA, padrão shadcn/ui)
- `src/components/layout/` — Estrutura da página: Header, Footer, CustomCursor, Terminal, ImageGallery
- `src/components/sections/` — Seções (Hero, Projects, About, TechStack, Experience, Contact), cada uma com seu diretório
- `src/components/common/` — Utilitários compartilhados: SEO, OptimizedImage
- `src/hooks/` — Hooks customizados (tema, idioma, música, GitHub)
- `src/lib/i18n/` — Configuração do i18next e arquivos de locale
- `src/config/` — Configuração em tempo de execução
- `src/utils/` — Funções utilitárias

### Gerenciamento de Estado

- **Tema**: Store Zustand com persistência em localStorage (`useTheme`)
- **Idioma**: i18next com persistência em localStorage, via hook `useI18n()`
- **Música**: Hook unificado `useMusic()` com fallback (Spotify → Last.fm)

### Padrões Principais

- Seções carregadas sob demanda com `React.lazy()` e Suspense
- Chunks de vendor separados: react, motion, lucide-react, radix-ui
- Animações com `motion/react` (efeitos de stagger)
- Componentes de UI usam CVA para variantes e `cn()` (clsx + tailwind-merge)

### i18n

Português (`pt.ts`) é o idioma padrão e de fallback. Chaves de tradução são objetos aninhados (ex: `t('projects.card.viewProject')`). Ao adicionar conteúdo, atualizar os três arquivos de locale (`pt.ts`, `en.ts`, `es.ts`) mantendo a mesma estrutura.

## Qualidade e Automação

- **Git hooks** (Husky): `pre-commit` roda lint-staged (ESLint + Prettier nos arquivos staged); `commit-msg` valida [Conventional Commits](https://www.conventionalcommits.org/) via commitlint
- **CI** (GitHub Actions): lint, testes e build em PRs para `main`; deploy no GitHub Pages ao push na `main` (Node 24, `npm ci --legacy-peer-deps`)
- **Dependabot**: atualização semanal de dependências npm e GitHub Actions

## Contribuição

Consultar [CONTRIBUTING.md](CONTRIBUTING.md) para convenções de código, estilo, fluxo de commits e workflow de desenvolvimento.
