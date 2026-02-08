import { Skeleton } from '@ui';
import type { FC, ReactElement } from 'react';

export const MusicWidgetSkeleton: FC = (): ReactElement => (
    <>
        {/* Current Track */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-4 mb-3">
                <Skeleton className="w-12 h-12 rounded-lg" />
                <div className="flex-1">
                    <Skeleton className="h-4 w-32 mb-2" />
                    <Skeleton className="h-3 w-24" />
                </div>
            </div>
            <Skeleton className="h-1 w-full rounded-full" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-5 w-28 mb-1" />
                <Skeleton className="h-3 w-16" />
            </div>
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="w-4 h-4 rounded-full" />
                    <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-5 w-16 mb-1" />
                <Skeleton className="h-3 w-16" />
            </div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-end justify-between h-20 gap-2">
                {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton key={i} className="flex-1 rounded-t" style={{ height: `${30 + Math.random() * 60}%` }} />
                ))}
            </div>
            <div className="flex justify-between mt-2">
                {Array.from({ length: 7 }).map((_, i) => (
                    <Skeleton key={i} className="h-3 w-6" />
                ))}
            </div>
        </div>

        {/* Recent Tracks */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
            <Skeleton className="h-4 w-32 mb-3" />
            <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 p-2">
                        <Skeleton className="w-8 h-8 rounded" />
                        <div className="flex-1">
                            <Skeleton className="h-3 w-28 mb-1" />
                            <Skeleton className="h-3 w-20" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </>
);
