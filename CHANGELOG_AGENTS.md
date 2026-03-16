# CHANGELOG de Subagentes

Registro de interações dos subagentes especializados do projeto.

**Formato:** `### HH:MM - [SUBAGENT] Nome - Título`

---

<!-- Adicionar novas entradas aqui (ordem cronológica reversa) -->

### 15:25 - [SUBAGENT] Tester - Testes completos ArchitectureFlow

**Interacao**: Criados testes unitarios e de acessibilidade abrangentes para o componente ArchitectureFlow, cobrindo funcionalidade base e 3 novas features (icones, titulo de camada, conexoes horizontais)
**Tipo de Teste**: Unit, A11y
**Componentes/Hooks Testados**: `ArchitectureFlow`, `NodeCard`, `NodeIcon`, `FlowConnector`, `HorizontalConnector`, `LayerTitle`, `LayerGroup`
**Cobertura Alcancada**: 23 testes passando - renderizacao base, layout de camadas, icones (validos/invalidos/ausentes), titulo de camada (ArchitectureLayer interface, formato misto), conexoes horizontais (desktop/mobile), acessibilidade (vitest-axe, aria-hidden)
**Arquivos de Teste**: `src/components/sections/Projects/components/__tests__/ArchitectureFlow.test.tsx`
**Tags**: #tests #vitest #unit #a11y #components

### 15:22 - [SUBAGENT] Component Specialist - Evolucao do componente ArchitectureFlow

**Interacao**: Implementadas tres melhorias no ArchitectureFlow mantendo retrocompatibilidade total
**Componentes Criados/Modificados**: `ArchitectureFlow` (NodeIcon, HorizontalConnector, LayerTitle - subcomponentes internos)
**Hooks Implementados**: Nenhum
**Otimizacoes**: Nenhuma
**Arquivos**: `src/components/sections/Projects/components/ArchitectureFlow.tsx`
**Tags**: #components #sections #animation

**Detalhes das melhorias:**

1. **Suporte a icones**: Novo campo opcional `icon?: string` no `ArchitectureNode`. Usa mapeamento interno de icones lucide-react (Database, Server, Monitor, etc) para evitar importar todos os icones. Exibe ao lado do label com cor accent da camada.
2. **Agrupamento nomeado de camada**: Nova interface `ArchitectureLayer` com campo `title?: string`. O componente aceita tanto `ArchitectureNode[]` quanto `ArchitectureLayer` por camada via funcao `normalizeLayer`, mantendo retrocompatibilidade.
3. **Conexoes horizontais**: Linhas pontilhadas horizontais entre nos adjacentes na mesma camada (desktop only, omitidas no mobile para melhor responsividade). Animacao de entrada com scaleX.
