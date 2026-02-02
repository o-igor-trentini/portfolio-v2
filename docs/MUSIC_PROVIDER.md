# Music Provider Integration

Este projeto suporta duas plataformas de música: **Spotify** e **Last.fm**, com **fallback automático** e **alternância manual em tempo real**.

## Funcionalidades

### ✨ Fallback Automático

O sistema tenta o provider preferido primeiro e, se falhar, automaticamente usa o próximo disponível:

**Exemplo 1 - Provider preferido funciona:**

1. Lê `VITE_MUSIC_PROVIDER=spotify`
2. Realiza requisição para API do Spotify
3. ✅ Exibe dados retornados pelo Spotify

**Exemplo 2 - Fallback automático:**

1. Lê `VITE_MUSIC_PROVIDER=spotify`
2. ❌ Ocorre erro na API do Spotify
3. 🔄 Realiza requisição automática para Last.fm
4. ✅ Exibe dados retornados pelo Last.fm

**Exemplo 3 - Todos os providers falharam:**

1. ❌ Spotify API indisponível
2. ❌ Last.fm API indisponível
3. 📢 Exibe mensagem de erro: "Não foi possível verificar as estatísticas, todos os serviços estão indisponíveis"
4. 🔄 Botão "Tentar novamente" disponível

### 🔀 Alternância Manual

Quando múltiplos providers estão disponíveis, botões de alternância aparecem no widget permitindo trocar entre eles em tempo real sem recarregar a página.

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

- **`useMusic`**: Hook unificado com fallback automático
    - Localização: `src/hooks/useMusic.tsx`
    - Aceita parâmetro opcional `manualProvider` para override
    - Retorna dados do provider ativo + `provider`, `availableProviders`, `switchProvider`
    - Lógica de fallback: tenta provider preferido → fallback automático → erro se todos falharem

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

## Vantagens do Sistema

1. **Alta Disponibilidade**: Fallback automático entre APIs garante funcionamento mesmo se uma falhar
2. **Flexibilidade**: Escolha a plataforma preferida via variável de ambiente
3. **Alternância Manual**: Botões para trocar entre providers disponíveis em tempo real
4. **Feedback Claro**: Mensagem de erro amigável quando todos os serviços estão indisponíveis
5. **Zero Interrupção**: Troca de provider sem reload da página
6. **Fallback Inteligente**: Modo demo com dados mockados se nenhuma API estiver configurada
7. **Interface Unificada**: Mesmo componente funciona com todas as APIs

## Componente

O componente `SpotifyWidget` inclui:

- Hook `useMusic` com fallback automático entre providers
- Cores adaptativas (verde para Spotify, vermelho para Last.fm)
- Nome do provider exibido no título
- **Botões de alternância** quando múltiplos providers estão disponíveis
- **Mensagem de erro** com ícone quando todos os providers falham
- **Botão "Tentar novamente"** para recarregar após falha
- Suportar dados de ambas as APIs sem mudanças na interface

## Interface do Hook useMusic

```typescript
interface MusicData {
    currentTrack: any;
    topArtist: any;
    recentTracks: any[];
    isLoading: boolean;
    error: string | null;
    provider: 'spotify' | 'lastfm' | null;
    availableProviders: ('spotify' | 'lastfm')[];
    switchProvider: (provider: 'spotify' | 'lastfm') => void;
}
```

### Propriedades Retornadas

- **currentTrack**: Música tocando agora (ou null)
- **topArtist**: Artista mais ouvido (ou null)
- **recentTracks**: Array de músicas recentes
- **isLoading**: Indica se está carregando dados
- **error**: Mensagem de erro se todos os providers falharam
- **provider**: Provider atualmente ativo ('spotify' | 'lastfm' | null)
- **availableProviders**: Lista de providers que responderam com sucesso
- **switchProvider**: Função para alternar manualmente entre providers

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
