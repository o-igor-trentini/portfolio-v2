# Contribuição

Guia de convenções e padrões para contribuir com o projeto.

## Índice

- [Idioma](#idioma)
- [Prioridades de Desenvolvimento](#prioridades-de-desenvolvimento)
- [Estrutura de Responsabilidades](#estrutura-de-responsabilidades)
- [Estilo de Código](#estilo-de-código)
- [Git Hooks (Husky)](#git-hooks-husky)
- [Testes](#testes)
- [Atualização de Dependências](#atualização-de-dependências)
- [i18n](#i18n)
- [Checklist de PR](#checklist-de-pr)
- [Links Úteis](#links-úteis)

---

## Idioma

- Código, nomes de pastas e arquivos sempre em **inglês**
- Documentação, comentários, logs e nomes de teste sempre em **pt-BR** (com acentuação correta)
- Comentários apenas para lógica complexa, avisos importantes ou algo relevante — evitar comentários óbvios ou desnecessários

## Prioridades de Desenvolvimento

1. **Correção** - Funcionalidade correta e sem bugs
2. **Segurança** - Sem vulnerabilidades (XSS, exposição de tokens, etc.)
3. **Padrões** - Seguir estrutura e convenções existentes
4. **Performance** - Lazy loading, memoization quando necessário
5. **Legibilidade** - Código claro e auto-documentado

## Estrutura de Responsabilidades

| Camada       | Responsabilidade                               | Localização                |
| ------------ | ---------------------------------------------- | -------------------------- |
| **Sections** | Seções da página (lazy-loaded)                 | `src/components/sections/` |
| **Layout**   | Estrutura da página (Header, Footer, Terminal) | `src/components/layout/`   |
| **UI**       | Primitivos atômicos (shadcn/ui)                | `src/components/ui/`       |
| **Hooks**    | Lógica reutilizável e estado                   | `src/hooks/`               |
| **Lib**      | Utilitários, API client, i18n                  | `src/lib/`                 |
| **BFF**      | Serverless functions (protegem tokens)         | `netlify/functions/`       |
| **Config**   | Configurações runtime                          | `src/config/`              |

---

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

### Componentes

- Sempre usar **arrow functions** (`const fn = () => {}`) — nunca declaração `function`
- Sempre usar **functional components** com hooks — nunca class components (exceto casos estritamente necessários)
- Sempre usar tipagem explícita e importação direta do React:

```tsx
const MyComponent: FC = (): ReactElement => {
    const [state, setState] = useState();
    return <div>...</div>;
};
```

- Extrair lógica em **hooks customizados** para centralizar e separar responsabilidades dos componentes
- Separar dependências em subcomponentes especializados — cada componente deve ter uma única responsabilidade, mantendo arquivos enxutos e a manutenção atômica e simplificada

### JSX — Organização do Render

- Componentes irmãos devem ser separados por uma **linha em branco**
- Somente um wrapper direto pode "encostar" na declaração de seu filho (sem linha em branco entre wrapper e primeiro filho)

```tsx
<>
    <div>
        <span>texto 1</span>

        <span>texto 2</span>
    </div>

    <div>
        <span>teste</span>
    </div>
</>
```

### Componentes de UI (shadcn/ui)

Componentes em `src/components/ui/` seguem o padrão [shadcn/ui](https://ui.shadcn.com/): primitivos Radix UI + [CVA](https://cva.style/) para variantes de estilo. Utilizar `cn()` (clsx + tailwind-merge) para composição de classes:

```tsx
import { cn } from '@/lib/utils';

<Button className={cn('mt-4', isActive && 'bg-primary')} />;
```

### Nomenclatura

- **Tipos/Interfaces**: PascalCase
- **Constantes**: UPPER_SNAKE_CASE
- **Arquivos de componentes**: PascalCase
- **Arquivos de utilitários, services e hooks**: camelCase
- **Hooks**: Prefixo `use`

## Git Hooks (Husky)

O projeto usa [Husky](https://typicode.github.io/husky/) para executar verificações automáticas antes de commits e pushes.
Os hooks são instalados automaticamente ao rodar `npm install` (via script `prepare`).

### Pre-commit (lint-staged)

Ao fazer um commit, o hook `pre-commit` executa o [lint-staged](https://github.com/lint-staged/lint-staged), que roda
**apenas nos arquivos staged** (não no projeto inteiro):

| Arquivos                                    | Verificações                     |
| ------------------------------------------- | -------------------------------- |
| `*.ts`, `*.tsx`                             | ESLint (com auto-fix) + Prettier |
| `*.json`, `*.md`, `*.css`, `*.mjs`, `*.cjs` | Prettier                         |

Se alguma verificação falhar, o commit é bloqueado até que os problemas sejam corrigidos.

### Commit-msg (commitlint)

O hook `commit-msg` valida a mensagem de commit usando [commitlint](https://commitlint.js.org/) com a convenção
[Conventional Commits](https://www.conventionalcommits.org/pt-br/).

**Formato obrigatório:**

```
tipo(escopo opcional): descrição curta
```

**Tipos permitidos:**

| Tipo       | Uso                                         |
| ---------- | ------------------------------------------- |
| `feat`     | Nova funcionalidade                         |
| `fix`      | Correção de bug                             |
| `docs`     | Alteração em documentação                   |
| `style`    | Formatação (sem mudança de lógica)          |
| `refactor` | Refatoração (sem mudança de comportamento)  |
| `perf`     | Melhoria de performance                     |
| `test`     | Adição ou correção de testes                |
| `build`    | Mudanças no build ou dependências           |
| `ci`       | Mudanças em CI/CD                           |
| `chore`    | Tarefas auxiliares (configs, scripts, etc.) |
| `revert`   | Reverter commit anterior                    |

**Exemplos válidos:**

```bash
git commit -m "feat: adiciona botão de voltar ao topo"
git commit -m "fix(header): corrige navegação em mobile"
git commit -m "docs: atualiza guia de contribuição"
git commit -m "refactor(hooks): extrai lógica do useTerminal"
```

**Exemplos inválidos (serão bloqueados):**

```bash
git commit -m "arrumando bug"          # sem tipo
git commit -m "Feat: algo"             # tipo em maiúscula
git commit -m "feat:sem espaço"        # falta espaço após ':'
```

## Testes

### Referência Rápida

- **Framework:** Vitest + React Testing Library
- **Acessibilidade:** vitest-axe (`toHaveNoViolations`)
- **Setup:** `src/tests/setup.ts`
- **Meta de cobertura:** 60% statements/lines, 50% branches, 60% functions
- **Padrão:** Testes co-localizados (ao lado do código testado)

### Comandos

```bash
npm test                 # Roda testes (single run)
npm run test:watch       # Testes em modo watch
npm run test:coverage    # Testes com cobertura
```

### Convenções

- **Nomes de testes** (describe/it) em **pt-BR**
- **Código de teste** (variáveis, funções) em inglês
- **Queries:** Priorizar `getByRole` > `getByLabelText` > `getByText` > `getByTestId`
- **User events:** Sempre `@testing-library/user-event` (não `fireEvent`)
- **Acessibilidade:** Incluir teste com vitest-axe em componentes visuais
- **Proibido:** Comentários `// Arrange`, `// Act`, `// Assert`

### Exemplo Básico

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { axe } from 'vitest-axe';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
    it('deve renderizar corretamente', () => {
        render(<MyComponent />);

        expect(screen.getByRole('heading')).toBeInTheDocument();
    });

    it('não deve ter violações de acessibilidade', async () => {
        const { container } = render(<MyComponent />);
        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });
});
```

> **Guia completo:** Consulte [subagent_tester.md](./.claude/agents/subagent_tester.md) para templates, mocking, testes parametrizados e FAQ.

---

## Atualização de Dependências

O projeto usa [Dependabot](https://docs.github.com/pt/code-security/dependabot) para manter dependências atualizadas
automaticamente. A configuração está em `.github/dependabot.yml`.

- **npm**: verificação semanal (segunda-feira), com agrupamento de atualizações minor/patch separando dev e produção
- **GitHub Actions**: verificação semanal para manter os workflows atualizados

Os PRs gerados pelo Dependabot passam pelo CI (lint, testes, build) antes de serem mergeados.

## i18n

- `pt.ts` é a fonte de verdade — sempre começar por ele
- Manter a mesma estrutura de chaves nos três locales (`pt.ts`, `en.ts`, `es.ts`)
- Usar `t('chave.aninhada')` com suporte a `returnObjects`

---

## Checklist de PR

### Código

- [ ] Segue padrões de nomenclatura do projeto
- [ ] Usa imports absolutos (`@/*`, `@hooks`, `@ui`)
- [ ] Arrow functions e functional components (não class components, não `function`)
- [ ] Sem `console.log` ou código de debug
- [ ] Sem credenciais ou tokens hardcoded
- [ ] Componentes UI seguem padrão CVA + cn()

### Testes

- [ ] Testes adicionados para novos componentes/hooks
- [ ] Nomes de testes em pt-BR (describe/it)
- [ ] Teste de acessibilidade incluído (vitest-axe)
- [ ] Testes existentes passam (`npm test`)
- [ ] Cobertura mantida ou melhorada

### Qualidade

- [ ] Linting passa (`npm run lint`)
- [ ] Build funciona (`npm run build`)
- [ ] TypeScript sem erros (`npx tsc --noEmit`)

### i18n (se aplicável)

- [ ] Três locales atualizados (`pt.ts`, `en.ts`, `es.ts`)
- [ ] Mesma estrutura de chaves nos três arquivos

### Git

- [ ] Commits seguem Conventional Commits
- [ ] Mensagens de commit em pt-BR

### Performance (se aplicável)

- [ ] Seções novas usam `React.lazy()`
- [ ] Animações usam `viewport={{ once: true }}`
- [ ] Sem re-renders desnecessários

---

## Links Úteis

- [README.md](./README.md) - Setup e arquitetura
- [CLAUDE.md](./CLAUDE.md) - Contexto para assistentes de IA
- [React Docs](https://react.dev)
- [shadcn/ui](https://ui.shadcn.com)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vitest](https://vitest.dev)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- [motion/react](https://motion.dev)
- [i18next](https://www.i18next.com)
- [Conventional Commits](https://www.conventionalcommits.org/pt-br)
