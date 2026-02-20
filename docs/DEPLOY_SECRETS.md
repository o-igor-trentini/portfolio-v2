# Configuração de Secrets para Deploy

As integrações de música (Spotify e Last.fm) e GitHub utilizam credenciais que ficam **server-side** (Netlify Functions). Apenas a escolha do provider de música (`VITE_MUSIC_PROVIDER`) é client-side.

## Onde configurar

| Variável                | Onde configurar                                     | Escopo      |
| ----------------------- | --------------------------------------------------- | ----------- |
| `SPOTIFY_CLIENT_ID`     | Netlify Environment Variables                       | Server-side |
| `SPOTIFY_CLIENT_SECRET` | Netlify Environment Variables                       | Server-side |
| `SPOTIFY_REFRESH_TOKEN` | Netlify Environment Variables                       | Server-side |
| `LASTFM_API_KEY`        | Netlify Environment Variables                       | Server-side |
| `LASTFM_USERNAME`       | Netlify Environment Variables                       | Server-side |
| `GITHUB_TOKEN`          | Netlify Environment Variables                       | Server-side |
| `VITE_MUSIC_PROVIDER`   | Netlify Environment Variables + GitHub Secrets (CI) | Client-side |

## Configurar no Netlify

1. Acesse o painel do Netlify → **Site Settings** → **Environment Variables**
2. Adicione as variáveis necessárias conforme a opção desejada abaixo

### Opção 1: Usar apenas Spotify

```
VITE_MUSIC_PROVIDER=spotify
SPOTIFY_CLIENT_ID=seu_client_id
SPOTIFY_CLIENT_SECRET=seu_client_secret
SPOTIFY_REFRESH_TOKEN=seu_refresh_token
```

### Opção 2: Usar apenas Last.fm

```
VITE_MUSIC_PROVIDER=lastfm
LASTFM_API_KEY=sua_api_key
LASTFM_USERNAME=seu_username
```

### Opção 3: Configurar ambos (recomendado para fallback)

```
VITE_MUSIC_PROVIDER=spotify
SPOTIFY_CLIENT_ID=seu_client_id
SPOTIFY_CLIENT_SECRET=seu_client_secret
SPOTIFY_REFRESH_TOKEN=seu_refresh_token
LASTFM_API_KEY=sua_api_key
LASTFM_USERNAME=seu_username
```

## Configurar no GitHub (CI)

O CI (GitHub Actions) precisa apenas da variável client-side para o build:

1. Vá para o repositório no GitHub → **Settings** → **Secrets and variables** → **Actions**
2. Adicione:

| Secret                | Valor                 |
| --------------------- | --------------------- |
| `VITE_MUSIC_PROVIDER` | `spotify` ou `lastfm` |

As credenciais server-side (Spotify, Last.fm, GitHub) **não** precisam estar no GitHub Secrets — são usadas apenas pelas Netlify Functions em runtime.

## Deploy sem credenciais

Se nenhuma credencial for configurada, o widget de música não exibirá dados reais. O site continuará funcionando normalmente.

## Verificação

Após configurar:

1. Faça um commit e push para a branch `main`
2. Verifique o deploy no painel do Netlify
3. Acesse o site e verifique se o widget de música está funcionando
4. No DevTools (Network), confirme que as chamadas vão para `/.netlify/functions/*`

## Segurança

- Credenciais de API ficam **exclusivamente server-side** (Netlify Functions)
- Nenhum secret é exposto no bundle JavaScript do client
- Mantenha o arquivo `.env` no `.gitignore`
- Use `.env.example` apenas com valores de exemplo
