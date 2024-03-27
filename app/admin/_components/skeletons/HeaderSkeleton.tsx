import { Skeleton } from '@/components/ui/skeleton';
import React from 'react';

export function HeaderSkeleton() {
    return (
        <div
            className="w-full px-4 pb-4 mt-8
         center relative"
        >
            <div className="absolute left-0">
                <Skeleton className="w-[28px] h-[28px] rounded-full" />
            </div>

            <Skeleton className="w-10 h-4" />
        </div>
    );
}
