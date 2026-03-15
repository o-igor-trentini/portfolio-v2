# Plano de Otimização de Performance

## Contexto

Análise de performance revelou gargalos em animações e re-renderizações. A diferença dev vs prod é esperada (React StrictMode, Vite HMR, sem minificação), mas existem problemas reais a corrigir.

---

## Etapa 1 — Hero: Pausar animações fora do viewport

**Arquivos**: `src/components/sections/Hero/index.tsx`

- [x] Criar hook `useInViewport` usando `IntersectionObserver`
- [x] Usar `useAnimationControls()` do Framer Motion para stop/start das animações quando Hero sai/entra no viewport
- [x] Setar `display: none` nos SVGs `<animate>` (linhas 119-185) quando off-screen
- [ ] Testar: scroll para outras seções e verificar no DevTools Performance que não há scripting do Hero

**Impacto**: Remove ~15 loops de animação concorrentes quando o usuário não está no Hero.

---

## Etapa 2 — Hero: Converter animações simples para CSS puro

**Arquivos**: `src/components/sections/Hero/index.tsx`, `src/styles/globals.css`

- [ ] Converter scan lines (linhas 218-232) de `motion.div` para `@keyframes` CSS
- [ ] Converter dots pattern (linhas 100-116) de `motion.div` para `@keyframes` CSS
- [ ] Converter pulsing dot (linhas 473-478) para `@keyframes` CSS
- [ ] Mesclar os 4 morphing blobs do perfil (linhas 327-397) em 1 `@keyframes` CSS no container pai
- [ ] Reduzir partículas flutuantes de 8 para 4
- [ ] Testar: verificar que o visual permanece idêntico

**Impacto**: Remove ~8 instâncias Framer Motion, substituindo por animações CSS nativas.

---

## Etapa 3 — Hero: Reduzir custo GPU dos orbs blur

**Arquivos**: `src/components/sections/Hero/index.tsx`

- [ ] Escolher abordagem para os 3 orbs com `blur-3xl` (linhas 235-276):
    - Opção A: Substituir por imagens PNG/WebP pré-desfocadas (custo zero de runtime)
    - Opção B: Reduzir de `blur-3xl` (64px) para `blur-xl` (20px)
- [ ] Implementar a opção escolhida
- [ ] Testar: verificar no DevTools → Rendering → Paint flashing que a área de repaint diminuiu

**Impacto**: Reduz significativamente o custo de composição GPU.

---

## Etapa 4 — CustomCursor: Throttle e otimização

**Arquivos**: `src/components/layout/CustomCursor.tsx`

- [ ] Eliminar listener `mouseover` separado (linhas 29-41)
- [ ] Mesclar detecção de hover no handler `mousemove` existente usando `document.elementFromPoint()`
- [ ] Avaliar substituição dos springs Framer Motion por CSS `transition` (50ms e 150ms)
- [ ] Testar: mover cursor rapidamente sobre elementos interativos e verificar fluidez

**Impacto**: Elimina centenas de event handlers/segundo e reduz cálculos JS por frame.

---

## Etapa 5 — Music Hooks: Evitar re-renders desnecessários

**Arquivos**: `src/hooks/useSpotify/index.tsx`, `src/hooks/useLastFM/index.tsx`, `src/hooks/useMusic.tsx`

- [ ] Adicionar comparação de dados antes de `setData` em `useSpotify` (comparar `currentTrack?.name`, `recentTracks.length`)
- [ ] Adicionar comparação de dados antes de `setData` em `useLastFM` (mesma lógica)
- [ ] Defasar intervalos: Spotify 30s, Last.fm 45s
- [ ] Memoizar retorno de `useMusic` com `useMemo`
- [ ] Testar: React DevTools Profiler — verificar que MusicWidget não re-renderiza a cada 30s sem mudança

**Impacto**: Elimina 3-4 re-renders cascading a cada 30 segundos.

---

## Etapa 6 — GitHubWidget: Debounce e heatmap

**Arquivos**: `src/components/sections/Contact/components/GitHubWidget.tsx`

- [ ] Adicionar debounce de 250ms no resize listener (ou usar `ResizeObserver`)
- [ ] Substituir 364 `motion.div` do heatmap por `div` plain com CSS `animation-delay`
- [ ] Testar: redimensionar janela e verificar que não há jank

**Impacto**: Elimina layout reflows repetidos e 364 instâncias Framer Motion.

---

## Etapa 7 — Terminal: Limitar history e cleanup

**Arquivos**: `src/hooks/useTerminal.ts`

- [ ] Limitar array `history` a 100 entradas: `prev.slice(-99)`
- [ ] Armazenar timeout IDs em refs e limpar no cleanup do effect
- [ ] Testar: executar muitos comandos e verificar que memory não cresce indefinidamente

---

## Etapa 8 — About: Desabilitar 3D em mobile

**Arquivos**: `src/components/sections/About/index.tsx`

- [ ] Usar `matchMedia('(hover: hover)')` para detectar dispositivo
- [ ] Em touch devices: substituir `rotateY/rotateX` por simples `scale: 1.02`
- [ ] Testar: DevTools → device emulation → verificar que 3D transforms não aplicam em mobile

---

## Verificação Final

- [ ] `npm run dev` — navegar por todas as seções e verificar fluidez
- [ ] `npm run build && npm run preview` — comparar com dev
- [ ] Chrome DevTools → Performance: gravar 5s de scroll, verificar 60fps consistente
- [ ] Chrome DevTools → Rendering → Paint flashing: verificar áreas de repaint
- [ ] React DevTools → Profiler: confirmar redução de re-renders
- [ ] Lighthouse: audit de Performance em modo mobile
- [ ] `npm test` — garantir que nada quebrou
- [ ] `npm run lint` — sem warnings

---

## Notas

- **Dev vs Prod**: A diferença de performance entre os modos é comportamento esperado do Vite + React StrictMode. Não requer ação específica.
- **Prioridade**: Etapas 1-3 (Hero) são as mais impactantes. Etapas 4-5 são importantes. Etapas 6-8 são melhorias incrementais.
- **Benchmark**: Para monitoramento contínuo, considerar adicionar Lighthouse CI no pipeline Netlify.
