# Configuração de Secrets para Deploy

Para que o deploy funcione corretamente com as integrações de música (Spotify e Last.fm), você precisa configurar os seguintes secrets no GitHub.

## 📝 Como Adicionar Secrets no GitHub

1. Vá para o repositório no GitHub
2. Clique em **Settings** (Configurações)
3. No menu lateral, clique em **Secrets and variables** → **Actions**
4. Clique em **New repository secret**
5. Adicione cada secret abaixo

## 🔑 Secrets Necessários

### Music Provider Configuration

**Nome:** `VITE_MUSIC_PROVIDER`  
**Valor:** `spotify` ou `lastfm`  
**Descrição:** Define qual provider de música usar como preferência principal

### Spotify API (opcional se usar Last.fm)

**Nome:** `VITE_SPOTIFY_CLIENT_ID`  
**Valor:** Seu Client ID do Spotify  
**Como obter:** [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)

**Nome:** `VITE_SPOTIFY_CLIENT_SECRET`  
**Valor:** Seu Client Secret do Spotify  
**Como obter:** [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)

**Nome:** `VITE_SPOTIFY_REFRESH_TOKEN`  
**Valor:** Seu Refresh Token do Spotify  
**Como obter:** Use o fluxo OAuth do Spotify para gerar o token

### Last.fm API (opcional se usar Spotify)

**Nome:** `VITE_LASTFM_API_KEY`  
**Valor:** Sua API Key do Last.fm  
**Como obter:** [Last.fm API Account](https://www.last.fm/api/account/create)

**Nome:** `VITE_LASTFM_USERNAME`  
**Valor:** Seu username do Last.fm  
**Descrição:** Seu nome de usuário público do Last.fm

## ⚙️ Configuração Mínima

### Opção 1: Usar apenas Spotify
```
VITE_MUSIC_PROVIDER=spotify
VITE_SPOTIFY_CLIENT_ID=seu_client_id
VITE_SPOTIFY_CLIENT_SECRET=seu_client_secret
VITE_SPOTIFY_REFRESH_TOKEN=seu_refresh_token
```

### Opção 2: Usar apenas Last.fm
```
VITE_MUSIC_PROVIDER=lastfm
VITE_LASTFM_API_KEY=sua_api_key
VITE_LASTFM_USERNAME=seu_username
```

### Opção 3: Configurar ambos (recomendado para fallback)
```
VITE_MUSIC_PROVIDER=spotify
VITE_SPOTIFY_CLIENT_ID=seu_client_id
VITE_SPOTIFY_CLIENT_SECRET=seu_client_secret
VITE_SPOTIFY_REFRESH_TOKEN=seu_refresh_token
VITE_LASTFM_API_KEY=sua_api_key
VITE_LASTFM_USERNAME=seu_username
```

## 🚀 Deploy sem Secrets

Se você não configurar nenhum secret, o widget de música funcionará em **modo demo** com dados mockados. O site continuará funcionando normalmente, mas não mostrará dados reais de música.

## ✅ Verificação

Após adicionar os secrets:

1. Faça um commit e push para a branch `main`
2. Vá em **Actions** no GitHub
3. Verifique se o workflow executou com sucesso
4. Acesse o site e verifique se o widget de música está funcionando

## 🔒 Segurança

- ❌ **NUNCA** commite secrets no código
- ❌ **NUNCA** exponha secrets em logs
- ✅ Use sempre GitHub Secrets para valores sensíveis
- ✅ Mantenha o arquivo `.env` no `.gitignore`
- ✅ Use `.env.example` apenas com valores de exemplo
