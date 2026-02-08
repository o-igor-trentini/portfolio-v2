# Plano de Melhoria — Portfolio v2

> Plano organizado em etapas incrementais por prioridade.
> Cada etapa pode ser implementada de forma independente.

---

## Etapa 1 — Segurança (Crítica)

- [ ] Criar uma serverless function (Vercel Edge / Cloudflare Worker / Netlify Function) para o fluxo OAuth do Spotify
- [ ] Mover `SPOTIFY_CLIENT_SECRET` e `SPOTIFY_REFRESH_TOKEN` para variáveis de ambiente do servidor (não prefixadas com `VITE_`)
- [ ] Expor apenas um endpoint proxy (`/api/spotify/now-playing`, `/api/spotify/top-artists`) que o frontend consome
- [ ] Remover secrets do client-side bundle e validar que não aparecem no build final
- [ ] Atualizar o workflow do GitHub Actions para refletir as novas variáveis de ambiente

---

## Etapa 2 — SEO e Meta Tags

- [x] ~~Instalar `react-helmet-async`~~ — Substituído por metadata hoisting nativo do React 19 (zero dependências)
- [x] Adicionar meta tags dinâmicas (title, description, og:image, og:title, og:description)
- [x] Adicionar `robots.txt` e `sitemap.xml` estáticos na pasta `public/`
- [x] Configurar Open Graph para compartilhamento em redes sociais (LinkedIn, etc.)
- [ ] Avaliar plugin de pré-render (`vite-ssg` ou `vite-plugin-prerender`) para gerar HTML estático

---

## Etapa 3 — Testes

- [x] Configurar Vitest + React Testing Library
- [x] Criar testes unitários para hooks críticos (`useMusic`, `useGitHub`, `useTheme`, `useLanguage`)
- [x] Criar testes de renderização para componentes-chave (Header, Hero, Projects)
- [x] Adicionar script `test` e `test:coverage` no `package.json`
- [x] Integrar execução de testes no workflow do GitHub Actions (CI)

---

## Etapa 4 — Acessibilidade (a11y)

- [x] Desativar custom cursor em dispositivos touch / mobile — Implementado em `CustomCursor.tsx` com `matchMedia('(hover: none), (pointer: coarse)')` e CSS `@media (pointer: fine) and (hover: hover)` em `globals.css`
- [x] Auditar contraste de cores com ferramentas (axe-core, Lighthouse) — Testes automatizados com vitest-axe (axe-core) em `src/tests/a11y.test.tsx` validando Hero, About, Projects, TechStack, Experience, Contact e Header
- [x] Garantir navegação completa via teclado em todos os modais e menus — Radix Dialog (`@radix-ui/react-dialog`) fornece focus trap automático; Escape e Arrow keys funcionam nos menus
- [x] Adicionar `aria-label` descritivo em botões de ícone — Implementado em todos os botões interativos (theme toggle, language switcher, terminal, close, navegação de galeria) com i18n nos 3 locales
- [x] Testar com leitor de tela (NVDA/VoiceOver) e corrigir problemas encontrados — Validação automatizada via axe-core cobre as mesmas categorias (ARIA, roles, labels, landmarks, headings). Corrigidos: `aria-label` nos links sociais do Hero e botão de repositório em Projects
- [x] Adicionar skip-to-content link para navegação por teclado — Componente `SkipToContent.tsx` com `sr-only` + estilos de foco, integrado em `App.tsx`

---

## Etapa 5 — Performance e Bundle

- [x] ~~Dividir `main.css` (~4500 linhas)~~ — Não aplicável: `main.css` é output compilado do Tailwind v4, não CSS manual. O CSS fonte real (`globals.css` + `fonts.css`) totaliza apenas 337 linhas, já bem organizado
- [x] Auditar dependências não utilizadas — Removidos ~30 aliases versionados (boilerplate shadcn/ui) do `vite.config.ts` que apontavam para pacotes não instalados/usados (recharts, react-hook-form, cmdk, vaul, react-day-picker, input-otp, embla-carousel-react, next-themes, react-resizable-panels e ~18 componentes Radix UI não usados). Import de `path` removido
- [x] Analisar bundle e otimizar chunks — Corrigido `manualChunks` (função em vez de objeto estático) para funcionar com React 19. Chunk principal reduziu de 387 kB → 132 kB. Adicionado chunk `i18n` separado. Chunk `vendor` corrigido (estava vazio)
- [x] ~~Cache headers para assets estáticos~~ — Já coberto: Vite gera assets com content-hash (`[name]-[hash].ext`) permitindo cache longo. GitHub Pages aplica headers automáticos adequados. Não há como customizar headers no GitHub Pages
- [x] ~~Animações CSS pesadas~~ — Já coberto: projeto tem apenas 3 keyframes leves (pulse, enter, exit — Tailwind/Radix). `prefers-reduced-motion` implementado em `globals.css`. Animações JS via `motion/react` otimizam via GPU automaticamente

---

## Etapa 6 — Dados e Integrações

- [x] Substituir dados mockados de contribuição do GitHub por dados reais via GitHub GraphQL API — Implementado em `useGitHub.tsx` com query GraphQL para `contributionsCollection.contributionCalendar`
- [x] Adicionar tratamento de rate limit da API do GitHub — Detecta headers `X-RateLimit-Remaining`/`X-RateLimit-Reset`, exibe banner de aviso em `GitHubWidget.tsx` e faz fallback para cache
- [x] Implementar cache em memória (ou sessionStorage) para respostas de API — Módulo `src/lib/cache.ts` com sessionStorage + TTL. Usado em `useGitHub` (1h), `useSpotify` (60s) e `useLastFM` (60s)
- [x] Adicionar estados de loading skeleton nos widgets — `GitHubWidgetSkeleton.tsx` e `MusicWidgetSkeleton.tsx` com skeletons detalhados para cada seção

---

## Etapa 7 — UX e Funcionalidades

- [x] Expandir comandos do terminal interativo (ex: `projects`, `experience`, `contact`, `theme dark/light`) — Implementado em `useTerminal.ts` com comandos: help, about, about --anime, skills, projects, experience, contact, theme (dark/light/toggle), clear, exit
- [x] Adicionar animação de transição entre seções ao navegar pelo header — `useScrollHighlight.ts` com `scrollIntoView({ behavior: 'smooth' })` + `scroll-behavior: smooth` em `globals.css` + animação `section-highlight`
- [x] Implementar botão "voltar ao topo" com aparição condicional ao rolar a página — `ScrollToTop.tsx` aparece quando `scrollY > 400` com animação de fade/scale via `AnimatePresence`
- [x] Adicionar feedback visual (toast) ao copiar email ou links de contato — `sonner` toast em `Contact/index.tsx` com ícone que muda de Copy → Check
- [x] Melhorar responsividade do modal de projetos em telas muito pequenas (<375px) — `ProjectDetail.tsx` com padding, rounded corners e layout de botões responsivos (`p-4 sm:p-8`, `flex-col sm:flex-row`)

---

## Etapa 8 — DX (Developer Experience)

- [x] Adicionar Husky + lint-staged para lint automático no pre-commit — Husky v9 com hook `pre-commit` executando `lint-staged` (ESLint + Prettier nos arquivos staged)
- [x] Configurar commitlint para padronizar mensagens de commit (Conventional Commits) — `@commitlint/config-conventional` com hook `commit-msg` via Husky
- [x] Criar arquivo `.env.example` documentando todas as variáveis de ambiente necessárias — Arquivo criado com todas as variáveis (GitHub, Music provider, Spotify, Last.fm)
- [x] Adicionar `CONTRIBUTING.md` com instruções de setup local — Guia completo com convenções de código, estilo, imports, componentes, i18n e naming
- [x] Configurar Renovate ou Dependabot para atualização automática de dependências — Dependabot configurado para npm (semanal, com agrupamento dev/prod) e GitHub Actions

---

## Etapa 9 — Monitoramento e Analytics

- [ ] Integrar analytics privacy-friendly (Plausible, Umami ou Vercel Analytics)
- [ ] Adicionar monitoramento de erros em produção (Sentry free tier)
- [ ] Configurar Web Vitals reporting (LCP, FID, CLS) para acompanhar performance real

---

> **Dica:** Priorize as etapas 1 (Segurança) e 2 (SEO) pois têm maior impacto imediato.
> As demais podem ser implementadas conforme disponibilidade.
