# 🚀 Deploy para GitHub Pages

## Início Rápido

### Deploy com Domínio Customizado

1. **Configure seu domínio** - Edite `public/CNAME`:

    ```
    seudominio.com
    ```

2. **Configure GitHub Pages**
    - Vá em **Settings** → **Pages** do repositório
    - Em **Source**, selecione **GitHub Actions**
    - Em **Custom domain**, adicione seu domínio

3. **Configure DNS** no seu provedor:

    ```
    Tipo A (domínio raiz):
    185.199.108.153
    185.199.109.153
    185.199.110.153
    185.199.111.153

    Tipo CNAME (www):
    seu-usuario.github.io
    ```

4. **Deploy**
    ```bash
    git push origin main
    ```
    O deploy acontece automaticamente! 🎉

### Deploy sem Domínio Customizado

1. Delete o arquivo `public/CNAME`
2. Em `vite.config.ts`, altere:
    ```ts
    base: '/portfolio-v2/', // nome do seu repositório
    ```
3. Faça push e pronto!

---

## Configuração Detalhada

### Opções de Deploy

#### Opção A: Deploy Automático com GitHub Actions (Recomendado)

O workflow já está configurado em `.github/workflows/deploy.yml`.

**Passos:**

1. Vá para **Settings** > **Pages** no seu repositório
2. Em **Source**, selecione **GitHub Actions**
3. Faça push do código - o deploy será automático a cada push na branch main

#### Opção B: Deploy Manual

**Instalação:**

```bash
npm install --save-dev gh-pages
```

**Execução:**

```bash
npm run deploy
```

### Configuração de DNS (para domínio customizado)

**Registros A (para domínio raiz - exemplo.com):**

```
Type: A
Name: @
Value: 185.199.108.153
Value: 185.199.109.153
Value: 185.199.110.153
Value: 185.199.111.153
```

**Registro CNAME (para subdomínio - www.exemplo.com):**

```
Type: CNAME
Name: www
Value: seu-usuario.github.io
```

### Verificação e Ativação HTTPS

1. Aguarde a propagação do DNS (pode levar até 24h)
2. Acesse **Settings** > **Pages** no GitHub
3. Em **Custom domain**, insira seu domínio
4. Marque **Enforce HTTPS** após a verificação

---

## Comandos Úteis

```bash
# Desenvolvimento local
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Deploy manual (se configurado)
npm run deploy
```

## Estrutura de Arquivos Importantes

```
public/
  ├── .nojekyll       # Previne processamento Jekyll do GitHub
  └── CNAME           # Seu domínio customizado

.github/
  └── workflows/
      └── deploy.yml  # Workflow de deploy automático

vite.config.ts        # Configuração do Vite
```

## Troubleshooting

### Assets não carregam

- Verifique se o `base` no `vite.config.ts` está correto
- Para domínio customizado: `base: '/'`
- Para GitHub Pages padrão: `base: '/nome-do-repo/'`

### Deploy falha no GitHub Actions

- Verifique se o nome da branch está correto no workflow (main ou master)
- Certifique-se de que GitHub Pages está configurado para usar GitHub Actions

### Domínio não funciona

- Aguarde propagação DNS (até 24h)
- Verifique se o arquivo CNAME está correto
- Confirme que os registros DNS estão configurados corretamente
