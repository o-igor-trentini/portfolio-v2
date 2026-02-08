import { useLanguage, useMusic } from '@hooks';
import { Tooltip, TooltipContent, TooltipTrigger } from '@ui';
import { Music, Pause, Play, User, ExternalLink, AlertCircle, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';
import type { FC, ReactElement } from 'react';
import { useState } from 'react';
import { MusicWidgetSkeleton } from './MusicWidgetSkeleton';
import { MUSIC_PROVIDERS } from '../../../../config/musicProvider';

export const MusicWidget: FC = (): ReactElement => {
    const { t } = useLanguage();
    const [manualProvider, setManualProvider] = useState<'spotify' | 'lastfm' | undefined>(undefined);
    const { currentTrack, topArtist, recentTracks, isLoading, provider, availableProviders, switchProvider } =
        useMusic(manualProvider);

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

    return (
        <div className={containerClass}>
            <div className="flex items-center gap-3 mb-6">
                <div className={iconClass}>
                    <Music className="w-5 h-5 text-white" />
                </div>
                <h3 className={titleClass}>
                    {t('music.title')} - {providerName}
                </h3>

                {/* Provider Switcher - Shows all providers with status */}
                <div className="ml-auto flex gap-1">
                    {(['spotify', 'lastfm'] as const).map((p) => {
                        const isAvailable = availableProviders.includes(p);
                        const isActive = provider === p;
                        const providerLabel = p === 'spotify' ? 'Spotify' : 'Last.fm';
                        const tooltipText = isAvailable
                            ? `${t('music.providerAvailable')}: ${providerLabel}`
                            : t('music.providerOffline');

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

            {isLoading && !currentTrack && !topArtist ? (
                <MusicWidgetSkeleton />
            ) : !currentTrack && !topArtist && !isLoading ? (
                /* Estado indisponível quando não há dados */
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <div className="w-16 h-16 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                        <AlertCircle className="w-8 h-8 text-zinc-400 dark:text-zinc-500" />
                    </div>
                    <h4 className="text-lg font-medium text-zinc-900 dark:text-zinc-100 mb-2">
                        {t('music.errorTitle')}
                    </h4>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">{t('music.errorDescription')}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 rounded-lg transition-colors text-sm"
                    >
                        <RefreshCw className="w-4 h-4" />
                        {t('music.retry')}
                    </button>
                </div>
            ) : (
                <>
                    {/* Current Track */}
                    <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-200 dark:border-zinc-800 relative overflow-hidden">
                        {currentTrack ? (
                            <>
                                {currentTrack.albumArt && (
                                    <div
                                        className="absolute inset-0 bg-cover bg-center blur-3xl opacity-20"
                                        style={{ backgroundImage: `url(${currentTrack.albumArt})` }}
                                    />
                                )}
                                <div className="relative">
                                    <div className="flex items-center gap-4 mb-3">
                                        {currentTrack.albumArt ? (
                                            <img
                                                src={currentTrack.albumArt}
                                                alt={currentTrack.album}
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
                                                <p className="font-medium truncate">{currentTrack.name}</p>
                                                {currentTrack.isPlaying && (
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
                                                {currentTrack.artist}
                                            </p>
                                        </div>
                                        {currentTrack.url && (
                                            <a
                                                href={currentTrack.url}
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
                                                width: `${currentTrack.progress || 0}%`,
                                            }}
                                            transition={{ duration: 1, ease: 'easeOut' }}
                                            className={progressBarClass}
                                        />
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div
                                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${isLastFM ? 'from-red-400/30 to-red-600/30' : 'from-green-400/30 to-green-600/30'} flex items-center justify-center`}
                                >
                                    <Pause className="w-6 h-6 text-zinc-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-zinc-500">{t('music.notPlaying')}</p>
                                    <p className="text-sm text-zinc-400">{t('music.notPlayingDescription')}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Top Artist */}
                    {topArtist && (
                        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-200 dark:border-zinc-800">
                            <div className="flex items-center gap-2 mb-2">
                                <User className={`w-4 h-4 ${badgeClass}`} />
                                <p className="text-sm text-zinc-600 dark:text-zinc-400">{t('music.topArtist')}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <p className="font-medium flex-1 truncate">{topArtist.name}</p>
                                {topArtist.url && (
                                    <a
                                        href={topArtist.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded transition-colors"
                                    >
                                        <ExternalLink className="w-3 h-3 text-zinc-500" />
                                    </a>
                                )}
                            </div>
                            {'plays' in topArtist && topArtist.plays && (
                                <p className="text-xs text-zinc-500">{topArtist.plays} plays</p>
                            )}
                            {'playcount' in topArtist && topArtist.playcount && (
                                <p className="text-xs text-zinc-500">{topArtist.playcount} plays</p>
                            )}
                        </div>
                    )}

                    {/* Recent Tracks */}
                    {recentTracks.length > 0 && (
                        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">{t('music.recentTracks')}</p>
                            <div className="space-y-2">
                                {recentTracks.map((track: any, index: number) => {
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
                    )}
                </>
            )}
        </div>
    );
};
