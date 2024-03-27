import { Skeleton } from '@/components/ui/skeleton';

export function MembersSkeletons() {
    return (
        <div className="w-full flex flex-col gap-4 mt-4">
            {Array.from({ length: 8 }).map((_, i) => (
                <Skeleton key={i} className="w-full h-14" />
            ))}
        </div>
    );
}
