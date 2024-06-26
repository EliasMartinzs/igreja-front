'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HeaderSkeleton } from '../../app/admin/_components/skeletons/HeaderSkeleton';
import { Suspense } from 'react';

type Props = {
    cargo: 'Admin' | 'Secretário';
};

export function Header({ cargo }: Props) {
    return (
        <Suspense fallback={<HeaderSkeleton />}>
            <header className="w-full px-4 pb-4 mt-4 center relative">
                <Avatar className="absolute left-0 w-[28px] h-[28px]">
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <h4 className="text-center text-lg">{cargo}</h4>
            </header>
        </Suspense>
    );
}
