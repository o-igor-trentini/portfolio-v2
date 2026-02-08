import { Skeleton } from '@ui';
import type { FC, ReactElement } from 'react';

export const GitHubWidgetSkeleton: FC = (): ReactElement => (
    <>
        {/* Stats Overview */}
        <div className="grid grid-cols-2 gap-3 mb-4">
            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-1">
                    <Skeleton className="w-4 h-4 rounded-full" />

                    <Skeleton className="h-3 w-16" />
                </div>

                <Skeleton className="h-8 w-12 mt-1" />
            </div>

            <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-1">
                    <Skeleton className="w-4 h-4 rounded-full" />

                    <Skeleton className="h-3 w-20" />
                </div>

                <Skeleton className="h-8 w-12 mt-1" />
            </div>
        </div>

        {/* Contribution Heatmap */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-200 dark:border-zinc-800">
            <Skeleton className="h-4 w-24 mb-3" />
            <div className="flex gap-1 overflow-hidden">
                {Array.from({ length: 20 }).map((_, i) => (
                    <div key={i} className="flex flex-col gap-1">
                        {Array.from({ length: 7 }).map((_, j) => (
                            <Skeleton key={j} className="w-3 h-3 rounded-sm" />
                        ))}
                    </div>
                ))}
            </div>
        </div>

        {/* Top Languages */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 mb-4 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 mb-3">
                <Skeleton className="w-4 h-4 rounded-full" />

                <Skeleton className="h-4 w-32" />
            </div>

            <div className="flex items-center gap-4">
                <Skeleton className="w-24 h-24 rounded-full" />
                <div className="flex-1 space-y-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <Skeleton className="w-3 h-3 rounded-full" />

                                <Skeleton className="h-3 w-16" />
                            </div>
                            <Skeleton className="h-3 w-8" />
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Top Repos */}
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-2 mb-3">
                <Skeleton className="w-4 h-4 rounded-full" />

                <Skeleton className="h-4 w-36" />
            </div>

            <div className="space-y-2">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="flex items-center justify-between p-3">
                        <div className="flex items-center gap-3">
                            <Skeleton className="w-8 h-8 rounded-lg" />

                            <div>
                                <Skeleton className="h-4 w-28 mb-1" />

                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                        <Skeleton className="h-3 w-8" />
                    </div>
                ))}
            </div>
        </div>
    </>
);
