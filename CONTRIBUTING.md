# Contribuição

Guia de convenções e padrões para contribuir com o projeto.

## Idioma

- Código, nomes de pastas e arquivos sempre em **inglês**
- Documentação, comentários, logs e nomes de teste sempre em **pt-BR** (com acentuação correta)
- Comentários apenas para lógica complexa, avisos importantes ou algo relevante — evitar comentários óbvios ou desnecessários

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
