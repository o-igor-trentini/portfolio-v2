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

- [ ] Configurar Vitest + React Testing Library
- [ ] Criar testes unitários para hooks críticos (`useMusic`, `useGitHub`, `useTheme`, `useLanguage`)
- [ ] Criar testes de renderização para componentes-chave (Header, Hero, Projects)
- [ ] Adicionar script `test` e `test:coverage` no `package.json`
- [ ] Integrar execução de testes no workflow do GitHub Actions (CI)

---

## Etapa 4 — Acessibilidade (a11y)

- [ ] Desativar custom cursor em dispositivos touch / mobile (media query `hover: none`)
- [ ] Auditar contraste de cores com ferramentas (axe-core, Lighthouse)
- [ ] Garantir navegação completa via teclado em todos os modais e menus
- [ ] Adicionar `aria-label` descritivo em botões de ícone (theme toggle, language switcher)
- [ ] Testar com leitor de tela (NVDA/VoiceOver) e corrigir problemas encontrados
- [ ] Adicionar skip-to-content link para navegação por teclado

---

## Etapa 5 — Performance e Bundle

- [ ] Dividir `main.css` (~4500 linhas) em módulos menores por escopo (layout, animations, theme, components)
- [ ] Auditar dependências não utilizadas com `npx depcheck`
- [ ] Analisar bundle com `npx vite-bundle-visualizer` e identificar oportunidades de redução
- [ ] Implementar cache headers adequados para assets estáticos no deploy
- [ ] Avaliar substituição de animações CSS pesadas por versões mais leves em dispositivos de baixa performance

---

## Etapa 6 — Dados e Integrações

- [ ] Substituir dados mockados de contribuição do GitHub por dados reais via GitHub GraphQL API
- [ ] Adicionar tratamento de rate limit da API do GitHub (exibir aviso ou usar cache local)
- [ ] Implementar cache em memória (ou sessionStorage) para respostas de API, evitando requisições repetidas na mesma sessão
- [ ] Adicionar estados de loading skeleton nos widgets (GitHub stats, Music player)

---

## Etapa 7 — UX e Funcionalidades

- [ ] Expandir comandos do terminal interativo (ex: `projects`, `experience`, `contact`, `theme dark/light`)
- [ ] Adicionar animação de transição entre seções ao navegar pelo header
- [ ] Implementar botão "voltar ao topo" com aparição condicional ao rolar a página
- [ ] Adicionar feedback visual (toast) ao copiar email ou links de contato
- [ ] Melhorar responsividade do modal de projetos em telas muito pequenas (<375px)

---

## Etapa 8 — DX (Developer Experience)

- [ ] Adicionar Husky + lint-staged para lint automático no pre-commit
- [ ] Configurar commitlint para padronizar mensagens de commit (Conventional Commits)
- [ ] Criar arquivo `.env.example` documentando todas as variáveis de ambiente necessárias
- [ ] Adicionar `CONTRIBUTING.md` com instruções de setup local
- [ ] Configurar Renovate ou Dependabot para atualização automática de dependências

---

## Etapa 9 — Monitoramento e Analytics

- [ ] Integrar analytics privacy-friendly (Plausible, Umami ou Vercel Analytics)
- [ ] Adicionar monitoramento de erros em produção (Sentry free tier)
- [ ] Configurar Web Vitals reporting (LCP, FID, CLS) para acompanhar performance real

---

> **Dica:** Priorize as etapas 1 (Segurança) e 2 (SEO) pois têm maior impacto imediato.
> As demais podem ser implementadas conforme disponibilidade.
