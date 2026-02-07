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

### Nomenclatura

- **Tipos/Interfaces**: PascalCase
- **Constantes**: UPPER_SNAKE_CASE
- **Arquivos de componentes**: PascalCase
- **Arquivos de utilitários, services e hooks**: camelCase
- **Hooks**: Prefixo `use`

## i18n

- `pt.ts` é a fonte de verdade — sempre começar por ele
- Manter a mesma estrutura de chaves nos três locales (`pt.ts`, `en.ts`, `es.ts`)
- Usar `t('chave.aninhada')` com suporte a `returnObjects`
