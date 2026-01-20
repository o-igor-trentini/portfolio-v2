import { Music, Play, User, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { translations } from '../data/translations';
import { useLanguage } from '../hooks/useLanguage';

export function SpotifyWidget() {
    const { language } = useLanguage();
    const t = translations[language];

    // Mock data
    const currentTrack = {
        name: 'Blinding Lights',
        artist: 'The Weeknd',
        album: 'After Hours',
        progress: 65,
    };

    const topArtist = {
        name: 'Arctic Monkeys',
        plays: '1,234',
    };

    const weeklyMinutes = 847;

    const recentTracks = [
        { name: 'Do I Wanna Know?', artist: 'Arctic Monkeys' },
        { name: 'Starboy', artist: 'The Weeknd' },
        { name: 'Shape of You', artist: 'Ed Sheeran' },
    ];

    const weeklyData = [40, 65, 30, 80, 55, 90, 70];
    const maxHeight = Math.max(...weeklyData);

    return (
        <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-2xl p-6 border border-green-500/20">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
                    <Music className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-green-500">{t.spotify.title}</h3>
            </div>

            {/* Current Track */}
            <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-200 dark:border-zinc-800"
            >
                <div className="flex items-center gap-4 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                        <Play className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{currentTrack.name}</p>
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate">{currentTrack.artist}</p>
                    </div>
                </div>

                {/* Progress bar */}
                <div className="h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${currentTrack.progress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-green-500"
                    />
                </div>
            </motion.div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                {/* Top Artist */}
                <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-green-500" />
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">{t.spotify.topArtist}</p>
                    </div>
                    <p className="font-medium">{topArtist.name}</p>
                    <p className="text-xs text-zinc-500">{topArtist.plays} plays</p>
                </div>

                {/* Weekly Minutes */}
                <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-green-500" />
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">{t.spotify.weeklyMinutes}</p>
                    </div>
                    <p className="font-medium">{weeklyMinutes} min</p>
                    <p className="text-xs text-zinc-500">+12% vs last week</p>
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
                            className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t"
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
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">{t.spotify.recentTracks}</p>
                <div className="space-y-2">
                    {recentTracks.map((track, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm truncate">{track.name}</p>
                                <p className="text-xs text-zinc-500 truncate">{track.artist}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
