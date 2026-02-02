# Music Provider Integration

Este projeto suporta duas plataformas de música: **Spotify** e **Last.fm**, com redundância automática caso uma das APIs não esteja disponível.

## Configuração

### 1. Escolher o Provider

No arquivo `.env`, defina qual plataforma usar:

```env
VITE_MUSIC_PROVIDER=spotify  # ou 'lastfm'
```

### 2. Configurar Credenciais

#### Spotify

```env
VITE_SPOTIFY_CLIENT_ID=your_client_id_here
VITE_SPOTIFY_CLIENT_SECRET=your_client_secret_here
VITE_SPOTIFY_REFRESH_TOKEN=your_refresh_token_here
```

**Como obter as credenciais do Spotify:**

1. Acesse [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Crie uma nova aplicação
3. Obtenha o Client ID e Client Secret
4. Configure o Redirect URI (ex: `http://localhost:8888/callback`)
5. Use o fluxo OAuth para obter o Refresh Token

#### Last.fm

```env
VITE_LASTFM_API_KEY=your_lastfm_api_key_here
VITE_LASTFM_USERNAME=your_lastfm_username_here
```

**Como obter as credenciais do Last.fm:**

1. Acesse [Last.fm API Account](https://www.last.fm/api/account/create)
2. Crie uma nova aplicação
3. Obtenha a API Key
4. Use seu username do Last.fm

## Estrutura

### Hooks

- **`useSpotify`**: Hook para integração com Spotify API
    - Localização: `src/hooks/useSpotify/`
    - Retorna: `currentTrack`, `topArtist`, `recentTracks`, `isLoading`, `error`

- **`useLastFM`**: Hook para integração com Last.fm API
    - Localização: `src/hooks/useLastFM/`
    - Retorna: `currentTrack`, `topArtist`, `recentTracks`, `isLoading`, `error`

- **`useMusic`**: Hook unificado que usa o provider configurado
    - Localização: `src/hooks/useMusic.tsx`
    - Retorna dados do provider ativo + `provider` (spotify/lastfm)

### Configuração

- **`musicProvider.ts`**: Arquivo de configuração central
    - Localização: `src/config/musicProvider.ts`
    - Define qual provider usar baseado em `VITE_MUSIC_PROVIDER`

## Funcionalidades

### Spotify

- ✅ Música tocando agora (com progresso)
- ✅ Artista mais ouvido (últimos 7 dias)
- ✅ Músicas tocadas recentemente (3 últimas)
- ✅ Links para Spotify
- ✅ Imagens de álbuns

### Last.fm

- ✅ Música tocando agora (quando marcada como "now playing")
- ✅ Artista mais ouvido (últimos 7 dias)
- ✅ Músicas tocadas recentemente (3 últimas)
- ✅ Links para Last.fm
- ✅ Imagens de álbuns
- ⚠️ Não possui barra de progresso (API não fornece)

## Vantagens da Redundância

1. **Alta Disponibilidade**: Se uma API cair, a outra pode ser usada
2. **Flexibilidade**: Escolha a plataforma que preferir
3. **Fallback Automático**: Modo demo com dados mockados se nenhuma API estiver configurada
4. **Interface Unificada**: Mesmo componente funciona com ambas as APIs

## Componente

O componente `SpotifyWidget` foi atualizado para:

- Usar o hook `useMusic` unificado
- Adaptar cores baseado no provider (verde para Spotify, vermelho para Last.fm)
- Exibir o nome do provider no título
- Suportar dados de ambas as APIs sem mudanças na interface

## Exemplos de Uso

### Trocar para Last.fm

```env
VITE_MUSIC_PROVIDER=lastfm
VITE_LASTFM_API_KEY=abc123...
VITE_LASTFM_USERNAME=seu_username
```

### Usar Spotify (padrão)

```env
VITE_MUSIC_PROVIDER=spotify
VITE_SPOTIFY_CLIENT_ID=xyz789...
VITE_SPOTIFY_CLIENT_SECRET=secret123...
VITE_SPOTIFY_REFRESH_TOKEN=refresh456...
```

## Troubleshooting

### Spotify não está funcionando

- Verifique se todas as credenciais estão corretas
- Confirme que o Refresh Token é válido
- Veja o console do navegador para erros de API

### Last.fm não está funcionando

- Verifique se a API Key está correta
- Confirme que o username existe e é público
- Certifique-se de ter scrobbles recentes

### Modo Demo está ativo

- Nenhuma credencial foi configurada
- Verifique o arquivo `.env`
- Reinicie o servidor de desenvolvimento após alterar `.env`
