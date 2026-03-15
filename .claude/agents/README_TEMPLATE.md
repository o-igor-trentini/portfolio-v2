# Guia de Uso do Template de Subagentes

Este guia explica como usar o `TEMPLATE_SUBAGENT.md` para criar novos subagentes padronizados para o Portfolio.

## 📋 Visão Geral

O template fornece uma estrutura padronizada com **13 seções principais** que garantem consistência entre todos os subagentes do projeto.

## 🎯 Quando Usar

Use o template ao criar um novo subagente especializado para:

- Nova área técnica frontend (ex: Performance Optimizer, Animation Specialist)
- Nova responsabilidade (ex: Accessibility Auditor, SEO Specialist)
- Nova tecnologia (ex: PWA Specialist, Analytics Expert)

## 🚀 Como Usar

### Passo 1: Copiar o Template

```bash
cp .claude/agents/TEMPLATE_SUBAGENT.md .claude/agents/subagent_[nome].md
```

### Passo 2: Substituir Placeholders

| Placeholder           | Substituir por                  | Exemplo                                              |
| --------------------- | ------------------------------- | ---------------------------------------------------- |
| `[nome]`              | Nome do subagente em snake_case | `performance_optimizer`                              |
| `[Nome do Subagente]` | Nome legível                    | `Performance Optimizer`                              |
| `[Área de Expertise]` | Área de conhecimento            | `Otimização de Performance React`                    |
| `[Conhecimento X]`    | Expertise específica            | `React.memo, useMemo, useCallback`, `Code splitting` |
| `[Campo específico]`  | Campo único do subagente        | `Melhorias Aplicadas`, `Performance Metrics`         |

### Passo 3: Preencher Seções

#### Seções Obrigatórias

✅ **Todas as 13 seções devem ser preenchidas:**

1. **Especialização** - Listar 5-7 áreas de conhecimento
2. **Índice de Navegação** - Ajustar links internos
3. **Quando Invocar** - Situações obrigatórias e recomendadas
4. **Responsabilidades** - 5-6 responsabilidades principais
5. **Integração com Outros Subagentes** - Quando chamar/ser chamado
6. **Princípios Obrigatórios** - Boas práticas específicas
7. **Templates e Exemplos** - Pelo menos 2 templates com exemplos do Portfolio
8. **Comandos Úteis** - Comandos npm específicos
9. **Fluxo de Trabalho** - Processos padrão
10. **Contexto Portfolio** - Estrutura de pastas, convenções, arquivos críticos
11. **FAQ** - 3-5 perguntas frequentes
12. **Protocolo Obrigatório** - Campos customizados para CHANGELOG
13. **Lembrete Final** - Checklist de conclusão

### Passo 4: Customizar Protocolo de CHANGELOG

**Campos obrigatórios variam por subagente:**

- **Component Specialist**: Componentes Criados/Modificados, Hooks, Otimizações
- **UI Architect**: Decisão Arquitetural, Justificativa, Impacto
- **Tester**: Tipo de Teste, Cobertura, Componentes Testados
- **Documentation Specialist**: Ação Realizada, Descobertas

### Passo 5: Adicionar Exemplos Reais do Portfolio

Substitua exemplos genéricos por casos reais:

```typescript
// Exemplo real de useTheme (Zustand)
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useTheme = create<ThemeStore>()(
    persist(
        (set) => ({
            theme: 'dark',
            toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
        }),
        { name: 'theme-storage' },
    ),
);
```

### Passo 6: Validar Estrutura

**Checklist de validação:**

- [ ] Frontmatter YAML completo (name, description, tools, coordinator)
- [ ] 13 seções obrigatórias presentes
- [ ] 5-7 áreas de especialização listadas
- [ ] Integração com outros subagentes definida
- [ ] Pelo menos 2 templates com exemplos do Portfolio
- [ ] FAQ com 3-5 perguntas
- [ ] Protocolo CHANGELOG customizado
- [ ] Tamanho entre 400-600 linhas

### Passo 7: Documentar no CLAUDE.md

Adicione o novo subagente na seção de subagentes do CLAUDE.md.

---

## 📚 Exemplos de Customização

### Exemplo 1: Performance Optimizer

**Campos customizados do CHANGELOG:**

```markdown
**Métricas Anteriores**: Bundle: 1.5MB, FCP: 2.8s
**Melhorias Aplicadas**: Code splitting, lazy loading de imagens
**Métricas Finais**: Bundle: 1.1MB, FCP: 1.9s
```

### Exemplo 2: Accessibility Auditor

**Campos customizados do CHANGELOG:**

```markdown
**Problemas Encontrados**: 8 issues de contraste, 3 labels faltando
**Correções Aplicadas**: Ajustes de cores, adição de aria-labels
**Score vitest-axe**: 0 violações
```

---

## 🎯 Padrões de Qualidade

### Tamanho Ideal

- **Mínimo:** 400 linhas
- **Ideal:** 450-600 linhas
- **Máximo:** 700 linhas

### Consistência

- Seguir estrutura dos 4 subagentes existentes
- Manter tom e formato semelhantes
- Usar exemplos reais do Portfolio

### Integração

- Definir claramente quando chamar outros subagentes
- Especificar contexto esperado ao receber chamadas
- Documentar entregáveis esperados

---

## 📖 Referências

### Subagentes Existentes

1. **Component Specialist** (`.claude/agents/subagent_component_specialist.md`)
    - Componentes React, hooks, shadcn/ui, animações

2. **UI Architect** (`.claude/agents/subagent_ui_architect.md`)
    - Arquitetura, design system, state management

3. **Tester** (`.claude/agents/subagent_tester.md`)
    - Vitest, Testing Library, vitest-axe, cobertura

4. **Documentation Specialist** (`.claude/agents/subagent_documentation_specialist.md`)
    - Documentação técnica, i18n, sincronização

### Documentação do Projeto

- **CLAUDE.md** - Contexto geral do projeto
- **CONTRIBUTING.md** - Padrões de código
- **README.md** - Setup e quick start

---

_Para dúvidas, consulte CLAUDE.md ou os subagentes existentes como referência._
