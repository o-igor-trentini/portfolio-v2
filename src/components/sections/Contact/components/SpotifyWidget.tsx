import { Music, Play, User, Clock, Loader2, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import type { FC, ReactElement } from 'react';
import { useState } from 'react';
import { MUSIC_PROVIDERS } from '../../../../config/musicProvider';
import { useI18n } from '../../../../hooks/useLanguage';
import { useMusic } from '../../../../hooks/useMusic';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../ui/tooltip';

export const SpotifyWidget: FC = (): ReactElement => {
    const { t } = useI18n();
    const [manualProvider, setManualProvider] = useState<'spotify' | 'lastfm' | undefined>(undefined);
    const { currentTrack, topArtist, recentTracks, isLoading, provider, availableProviders, switchProvider, error } =
        useMusic(manualProvider);

    // Fallback mock data when Spotify is not configured or there's an error
    const mockCurrentTrack = {
        name: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        progress: 65,
    };

    const mockTopArtist = {
        name: 'Arctic Monkeys',
        plays: '1,234',
    };

    const mockRecentTracks = [
        { name: 'Do I Wanna Know?', artist: 'Arctic Monkeys' },
        { name: 'Starboy', artist: 'The Weeknd' },
        { name: 'Shape of You', artist: 'Ed Sheeran' },
    ];

    const weeklyData = [40, 65, 30, 80, 55, 90, 70];
    const maxHeight = Math.max(...weeklyData);

    // Use real data if available, otherwise use mock data
    const displayCurrentTrack = currentTrack || mockCurrentTrack;
    const displayTopArtist = topArtist || mockTopArtist;
    const displayRecentTracks = recentTracks.length > 0 ? recentTracks : mockRecentTracks;

    // Display provider name in title
    const providerName =
        provider === MUSIC_PROVIDERS.LASTFM ? 'Last.fm' : provider === MUSIC_PROVIDERS.SPOTIFY ? 'Spotify' : 'Music';
    const isLastFM = provider === MUSIC_PROVIDERS.LASTFM;

    // Handler for switching providers
    const handleSwitchProvider = (newProvider: 'spotify' | 'lastfm') => {
        setManualProvider(newProvider);
        switchProvider(newProvider);
    };

    // Provider-specific styles
    const containerClass = isLastFM
        ? 'bg-gradient-to-br from-red-500/10 to-red-600/10 rounded-2xl p-6 border border-red-500/20'
        : 'bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl p-6 border border-green-500/20';

    const iconClass = isLastFM
        ? 'w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center'
        : 'w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center';

    const titleClass = isLastFM ? 'text-red-500' : 'text-green-500';

    const progressBarClass = isLastFM ? 'h-full bg-red-500' : 'h-full bg-green-500';

    const badgeClass = isLastFM ? 'text-red-500' : 'text-green-500';

    const chartClass = isLastFM
        ? 'flex-1 bg-gradient-to-t from-red-500 to-red-400 rounded-t'
        : 'flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t';

    return (
        <div className={containerClass}>
            <div className="flex items-center gap-3 mb-6">
                <div className={iconClass}>
                    <Music className="w-5 h-5 text-white" />
                </div>
                <h3 className={titleClass}>
                    {t('spotify.title')} - {providerName}
                </h3>
                {!currentTrack && !isLoading && !error && (
                    <span className="text-xs text-zinc-500 ml-auto">(Demo Mode)</span>
                )}

                {/* Provider Switcher - Shows all providers with status */}
                <div className="ml-auto flex gap-1">
                    {(['spotify', 'lastfm'] as const).map((p) => {
                        const isAvailable = availableProviders.includes(p);
                        const isActive = provider === p;
                        const providerLabel = p === 'spotify' ? 'Spotify' : 'Last.fm';
                        const tooltipText = isAvailable
                            ? `${t('spotify.providerAvailable')}: ${providerLabel}`
                            : t('spotify.providerOffline');

                        return (
                            <Tooltip key={p}>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => isAvailable && handleSwitchProvider(p)}
                                        disabled={!isAvailable}
                                        className={`px-2 py-1 text-xs rounded transition-colors ${
                                            !isAvailable
                                                ? 'bg-zinc-100 dark:bg-zinc-900 text-zinc-400 dark:text-zinc-600 cursor-not-allowed opacity-50'
                                                : isActive
                                                  ? p === 'spotify'
                                                      ? 'bg-green-500 text-white'
                                                      : 'bg-red-500 text-white'
                                                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-300 dark:hover:bg-zinc-700'
                                        }`}
                                    >
                                        {providerLabel}
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{tooltipText}</p>
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className={`w-6 h-6 animate-spin ${badgeClass}`} />
                </div>
            ) : error && !currentTrack ? (
                /* Error state when all providers fail */
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                        <AlertCircle className="w-8 h-8 text-zinc-400 dark:text-zinc-500" />
                    </div>
                    <h4 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                        Não foi possível verificar as estatísticas
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                        Todos os serviços estão indisponíveis no momento
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-lg transition-colors text-sm"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Tentar novamente
                    </button>
                </div>
            ) : (
                <>
                    {/* Current Track */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden"
                    >
                        {'albumArt' in displayCurrentTrack && displayCurrentTrack.albumArt && (
                            <div
                                className="absolute inset-0 bg-cover bg-center blur-3xl opacity-20"
                                style={{ backgroundImage: `url(${displayCurrentTrack.albumArt})` }}
                            />
                        )}
                        <div className="relative">
                            <div className="flex items-center gap-4 mb-3">
                                {'albumArt' in displayCurrentTrack && displayCurrentTrack.albumArt ? (
                                    <img
                                        src={displayCurrentTrack.albumArt}
                                        alt={displayCurrentTrack.album}
                                        className="w-12 h-12 rounded-lg object-cover"
                                    />
                                ) : (
                                    <div
                                        className={`w-12 h-12 rounded-lg bg-gradient-to-br ${isLastFM ? 'from-red-400 to-red-600' : 'from-green-400 to-green-600'} flex items-center justify-center`}
                                    >
                                        <Play className="w-6 h-6 text-white" />
                                    </div>
                                )}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className="font-medium truncate">{displayCurrentTrack.name}</p>
                                        {'isPlaying' in displayCurrentTrack && displayCurrentTrack.isPlaying && (
                                            <div className="flex gap-0.5">
                                                <span
                                                    className={`w-1 h-3 ${isLastFM ? 'bg-red-500' : 'bg-green-500'} rounded-full animate-pulse`}
                                                />
                                                <span
                                                    className={`w-1 h-3 ${isLastFM ? 'bg-red-500' : 'bg-green-500'} rounded-full animate-pulse delay-75`}
                                                />
                                                <span
                                                    className={`w-1 h-3 ${isLastFM ? 'bg-red-500' : 'bg-green-500'} rounded-full animate-pulse delay-150`}
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate">
                                        {displayCurrentTrack.artist}
                                    </p>
                                </div>
                                {'url' in displayCurrentTrack && displayCurrentTrack.url && (
                                    <a
                                        href={displayCurrentTrack.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                                    >
                                        <ExternalLink className="w-4 h-4 text-zinc-500" />
                                    </a>
                                )}
                            </div>

                            {/* Progress bar */}
                            <div className="h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: `${'progress' in displayCurrentTrack ? displayCurrentTrack.progress : 0}%`,
                                    }}
                                    transition={{ duration: 1, ease: 'easeOut' }}
                                    className={progressBarClass}
                                />
                            </div>
                        </div>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        {/* Top Artist */}
                        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center gap-2 mb-2">
                                <User className={`w-4 h-4 ${badgeClass}`} />
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('spotify.topArtist')}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="font-medium flex-1 truncate">{displayTopArtist.name}</p>
                                {'url' in displayTopArtist && displayTopArtist.url && (
                                    <a
                                        href={displayTopArtist.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors"
                                    >
                                        <ExternalLink className="w-3 h-3 text-zinc-500" />
                                    </a>
                                )}
                            </div>
                            {'plays' in displayTopArtist && displayTopArtist.plays && (
                                <p className="text-xs text-zinc-500">{displayTopArtist.plays} plays</p>
                            )}
                            {'playcount' in displayTopArtist && displayTopArtist.playcount && (
                                <p className="text-xs text-zinc-500">{displayTopArtist.playcount} plays</p>
                            )}
                        </div>

                        {/* Weekly Minutes */}
                        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center gap-2 mb-2">
                                <Clock className={`w-4 h-4 ${badgeClass}`} />
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('spotify.weeklyMinutes')}</p>
                            </div>
                            <p className="font-medium">
                                {currentTrack &&
                                'duration' in displayCurrentTrack &&
                                typeof displayCurrentTrack.duration === 'number'
                                    ? Math.round(displayCurrentTrack.duration / 60000)
                                    : 847}{' '}
                                min
                            </p>
                            <p className="text-xs text-zinc-500">This week</p>
                        </div>
                    </div>

                    {/* Weekly Chart */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-200 dark:border-zinc-800">
                        <div className="flex items-end justify-between h-20 gap-2">
                            {weeklyData.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(value / maxHeight) * 100}%` }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className={chartClass}
                                />
                            ))}
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-zinc-500">
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                                <span key={day}>{day}</span>
                            ))}
                        </div>
                    </div>

                    {/* Recent Tracks */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">{t('spotify.recentTracks')}</p>
                        <div className="space-y-2">
                            {displayRecentTracks.map((track: any, index: number) => {
                                const hasAlbumArt = 'albumArt' in track && typeof track.albumArt === 'string';
                                const albumName =
                                    'album' in track && typeof track.album === 'string' ? track.album : track.name;
                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                                    >
                                        {hasAlbumArt ? (
                                            <img
                                                src={track.albumArt as string}
                                                alt={albumName}
                                                className="w-8 h-8 rounded object-cover"
                                            />
                                        ) : (
                                            <div className="w-2 h-2 rounded-full bg-green-500" />
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm truncate">{track.name}</p>
                                            <p className="text-xs text-zinc-500 truncate">{track.artist}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
