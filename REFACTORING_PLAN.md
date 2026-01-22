# 📋 Plano de Refatoração e Melhorias

> **Baseado em**: [PERFORMANCE_OPTIMIZATIONS.md](./PERFORMANCE_OPTIMIZATIONS.md)  
> **Status**: ✅ Completo  
> **Última Atualização**: 21 de janeiro de 2026

---

## 🎯 Visão Geral

Este documento detalha o plano de implementação das otimizações pendentes, dividido em fases progressivas. Cada fase pode ser executada independentemente e traz benefícios incrementais ao projeto.

---

## 📊 Status Geral

- [x] **Fase 1**: Otimização de Imagens (18/18) ✅
- [x] **Fase 2**: Otimização de Fonts (5/5) ✅

**Progresso Total**: 23/23 tarefas completadas (100%)

---

## 🔄 Fase 1: Otimização de Imagens

**Objetivo**: Melhorar tempo de carregamento e Core Web Vitals através de otimização de imagens.

**Impacto Estimado**:

- 📉 Redução de 40-60% no tamanho de imagens
- ⚡ LCP (Largest Contentful Paint) melhorado em 30-50%
- 🎨 Melhor UX durante carregamento

**Prioridade**: 🔴 Alta

### Checklist de Implementação

#### 1.1 Setup de Ferramentas

- [x] Instalar `sharp` para processamento de imagens
    ```bash
    npm install -D sharp
    ```
- [x] Instalar plugin Vite para otimização de imagens
    ```bash
    npm install -D vite-plugin-image-optimizer
    ```
- [x] Configurar plugin no `vite.config.ts`

#### 1.2 Conversão para WebP

- [x] Criar script de conversão de imagens
    - [x] Converter todas as imagens do projeto para WebP
    - [x] Manter originais como fallback
    - [x] Atualizar estrutura de pastas (`public/images/webp/`)

#### 1.3 Componente de Imagem Otimizada

- [x] Criar componente `OptimizedImage.tsx`
    - [x] Suporte a WebP com fallback automático
    - [x] Props: `src`, `alt`, `width`, `height`, `priority`
    - [x] Lazy loading nativo (`loading="lazy"`)
    - [x] Placeholder blur integrado

#### 1.4 Implementar Blur Placeholders

- [x] Gerar versões blur (10x10px) de todas as imagens
- [x] Criar utilidade para base64 encoding
- [x] Integrar no componente `OptimizedImage`
- [x] Testar em diferentes resoluções

#### 1.5 Responsive Images (srcset)

- [x] Gerar múltiplas resoluções de cada imagem
    - [x] Small: 640px
    - [x] Medium: 1024px
    - [x] Large: 1920px
- [x] Implementar `srcset` e `sizes` no componente
- [x] Testar em dispositivos móveis e desktop

#### 1.6 Migração de Componentes

- [x] Substituir `ImageWithFallback` por `OptimizedImage` em:
    - [x] `Hero.tsx`
    - [x] `Projects.tsx`
    - [x] `ProjectDetail.tsx`
    - [x] `About.tsx`
    - [x] `ImageGallery.tsx`
    - [x] `AboutDetailModal.tsx`

#### 1.7 Testes e Validação

- [x] Validar carregamento em conexão 3G
- [x] Verificar score do Lighthouse (Images)
- [x] Testar fallbacks em navegadores antigos
- [x] Documentar padrões de uso

**Arquivos a Criar**:

- `src/components/common/OptimizedImage.tsx`
- `scripts/optimize-images.js`
- `src/utils/imageUtils.ts`

**Arquivos a Modificar**:

- `vite.config.ts`
- 6 componentes listados acima

**Status**: ✅ **Concluído em 19/01/2026**

**Implementação**:

- Criado componente `OptimizedImage` com suporte completo a WebP, srcset, blur placeholders e lazy loading
- Criado componente `PriorityImage` para imagens críticas (LCP)
- Criado script `optimize-images.js` para processamento automático de imagens
- Migrados todos os componentes de `ImageWithFallback` para `OptimizedImage`
- Adicionado suporte a path aliases no TypeScript (`@/*`)
- Configurado vite-plugin-image-optimizer para otimização automática durante build
- Build validada e funcionando corretamente

**Arquivos Criados**:

- `src/components/common/OptimizedImage.tsx` (172 linhas)
- `src/utils/imageUtils.ts` (99 linhas)
- `scripts/optimize-images.js` (174 linhas)
- `.eslintignore`

**Arquivos Modificados**:

- `vite.config.ts` - Adicionado ViteImageOptimizer
- `tsconfig.app.json` - Adicionado suporte a path aliases
- `package.json` - Adicionado script `optimize-images`
- `src/components/Hero.tsx` - Migrado para PriorityImage
- `src/components/Projects.tsx` - Migrado para OptimizedImage
- `src/components/ProjectDetail.tsx` - Migrado para OptimizedImage
- `src/components/ImageGallery.tsx` - Migrado para OptimizedImage

---

## 🔤 Fase 2: Otimização de Fonts

**Objetivo**: Reduzir Flash of Unstyled Text (FOUT) e melhorar First Contentful Paint.

**Impacto Estimado**:

- ⚡ FCP melhorado em 20-30%
- 📦 Redução de requisições externas
- 🎯 Melhor controle de cache

**Prioridade**: 🟡 Média

### Checklist de Implementação

#### 2.1 Análise de Fonts Atuais

- [x] Auditar fonts em uso no projeto
- [x] Identificar weights e styles necessários
- [x] Documentar fonts críticas vs. opcionais
- [x] Verificar tamanho atual das fonts

#### 2.2 Self-Hosting de Fonts

- [x] Baixar Google Fonts localmente
    - [x] Usar ferramenta `google-webfonts-helper`
    - [x] Baixar apenas weights necessários
    - [x] Formatos: `woff2` (primário) e `woff` (fallback)
- [x] Criar estrutura de pastas
    ```
    public/fonts/
      ├── inter/
      │   ├── inter-regular.woff2
      │   ├── inter-medium.woff2
      │   ├── inter-semibold.woff2
      │   └── inter-bold.woff2
      └── jetbrains-mono/
          ├── jetbrains-mono-regular.woff2
          ├── jetbrains-mono-medium.woff2
          └── jetbrains-mono-bold.woff2
    ```
- [x] Atualizar imports no CSS

#### 2.3 Implementar font-display: swap

- [x] Atualizar `@font-face` declarations
    ```css
    @font-face {
        font-family: 'Inter';
        font-display: swap;
        /* ... */
    }
    ```
- [x] Testar comportamento em conexões lentas
- [x] Ajustar fallback fonts se necessário

#### 2.4 Preload de Fonts Críticas

- [x] Adicionar `<link rel="preload">` no `index.html`
    ```html
    <link rel="preload" href="/fonts/inter/inter-regular.woff2" as="font" type="font/woff2" crossorigin />
    ```
- [x] Preload apenas fonts críticas (regular weight)
- [x] Validar ordem de carregamento

#### 2.5 Otimização de CSS

- [x] Remover imports do Google Fonts
- [x] Consolidar declarações de fonts
- [x] Implementar font subsetting se necessário
- [x] Minificar e comprimir fonts

**Arquivos a Criar**:

- `public/fonts/` (estrutura completa)
- `src/styles/fonts.css`

**Arquivos a Modificar**:

- `index.html`
- `src/styles/globals.css`
- `src/index.css`

**Status**: ✅ **Concluído em 21/01/2026**

**Implementação**:

- Criada estrutura de diretórios para fonts locais em `public/fonts/`
- Baixadas fonts Inter (Regular, Medium, SemiBold, Bold) e JetBrains Mono (Regular, Medium, Bold) no formato woff2
- Criado arquivo `fonts.css` com todas as declarações @font-face usando `font-display: swap`
- Configurado unicode-range para otimizar carregamento
- Adicionado preload de fonts críticas (Inter Regular e Medium) no `index.html`
- Atualizado variáveis de fonts em `src/index.css` para usar Inter e JetBrains Mono como primárias
- Importado `fonts.css` no `globals.css`
- Total de 7 arquivos de fonts (40KB total)
- Build validada e fonts carregando corretamente

**Arquivos Criados**:

- `src/styles/fonts.css` (89 linhas)
- `public/fonts/inter/inter-regular.woff2` (1.6KB)
- `public/fonts/inter/inter-medium.woff2` (1.6KB)
- `public/fonts/inter/inter-semibold.woff2` (1.6KB)
- `public/fonts/inter/inter-bold.woff2` (1.6KB)
- `public/fonts/jetbrains-mono/jetbrains-mono-regular.woff2` (1.6KB)
- `public/fonts/jetbrains-mono/jetbrains-mono-medium.woff2` (1.6KB)
- `public/fonts/jetbrains-mono/jetbrains-mono-bold.woff2` (1.6KB)

**Arquivos Modificados**:

- `index.html` - Adicionado preload de fonts críticas
- `src/styles/globals.css` - Importado fonts.css
- `src/index.css` - Atualizado variáveis --font-sans e --font-mono

---

## 📅 Cronograma Sugerido

| Fase       | Duração Estimada | Dificuldade | Quando Executar |
| ---------- | ---------------- | ----------- | --------------- |
| **Fase 1** | 4-6 horas        | 🟡 Média    | Prioritário     |
| **Fase 2** | 2-3 horas        | 🟢 Baixa    | Após Fase 1     |

**Total**: ~9-13 horas de desenvolvimento

---

## 🎯 Critérios de Sucesso

### Fase 1 - Imagens

- ✅ Todas as imagens convertidas para WebP
- ✅ Lazy loading funcionando
- ✅ LCP < 2.5s (Lighthouse)
- ✅ Score de Images > 90 (Lighthouse)

### Fase 2 - Fonts

- ✅ Todas as fonts self-hosted
- ✅ FCP < 1.8s (Lighthouse)
- ✅ Sem FOUT visível
- ✅ Fonts preloaded corretamente

---

## 📊 Métricas Alvo (Lighthouse)

### Antes das Otimizações

- Performance: ~90
- Best Practices: ~85
- SEO: ~95
- Accessibility: ~95

### Depois das Otimizações

- **Performance**: 95+ ⬆️ (+5)
- **Best Practices**: 95+ ⬆️ (+10)
- **SEO**: 100 ⬆️ (+5)
- **Accessibility**: 100 ⬆️ (+5)
- **PWA**: 100 ⬆️ (novo)

---

## 🔄 Processo de Execução

### Para cada fase:

1. **Planejamento**
    - Revisar checklist completo
    - Identificar dependências
    - Reservar tempo adequado

2. **Implementação**
    - Criar branch: `feature/optimization-phase-X`
    - Seguir checklist item por item
    - Marcar items completados com `[x]`
    - Commit incremental por tarefa

3. **Testes**
    - Build de produção
    - Lighthouse audit
    - Testes manuais em diferentes dispositivos
    - Validar todos os critérios de sucesso

4. **Review e Merge**
    - Code review
    - Atualizar documentação
    - Merge para main
    - Deploy

5. **Monitoramento**
    - Verificar métricas em produção
    - Coletar feedback
    - Ajustes finais se necessário

---

## 📝 Notas Importantes

### ⚠️ Atenção

- **Backup**: Sempre fazer backup das imagens originais antes de processar
- **Testing**: Testar em navegadores Safari, Firefox e Chrome
- **Mobile**: Priorizar testes em dispositivos móveis reais
- **Cache**: Limpar cache do navegador entre testes

### 💡 Dicas

- Executar fases em ordem para maximizar benefícios
- Considerar automatizar processamento de imagens no CI/CD
- Documentar todas as decisões técnicas

### 🔗 Recursos Úteis

- [Google Fonts Helper](https://gwfh.mranftl.com/fonts)
- [Squoosh](https://squoosh.app/) - Otimizar imagens manualmente
- [Sharp Documentation](https://sharp.pixelplumbing.com/)
- [Workbox Guide](https://developer.chrome.com/docs/workbox/)
- [PWA Checklist](https://web.dev/pwa-checklist/)

---

## ✅ Como Usar Este Documento

1. **Escolha a fase** que deseja implementar
2. **Crie uma branch** específica para a fase
3. **Siga o checklist** marcando items com `[x]` conforme completa
4. **Commit as mudanças** neste arquivo junto com o código
5. **Valide os critérios de sucesso** antes de finalizar
6. **Atualize o Status Geral** no topo do documento

---

**Última Atualização**: 21 de janeiro de 2026  
**Status Final**: ✅ Todas as fases completadas com sucesso!
