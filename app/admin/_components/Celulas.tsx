import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cellsArray } from '@/constants';
import Link from 'next/link';
import { MembersSkeletons } from './skeletons/MembersSkeletons';
import { Suspense } from 'react';

export function Celulas() {
    return (
        <Suspense fallback={<MembersSkeletons />}>
            <div className="flex flex-col gap-y-4">
                {cellsArray.map((celula) => (
                    <Link
                        href={`/admin/celula/${celula.id}`}
                        key={celula.id}
                        className="w-full border rounded-xl p-2 cursor-pointer hover:border-neutral-200 transition-colors"
                    >
                        <div className="flex flex-row items-center justify-start gap-x-3">
                            <Avatar className="">
                                <AvatarImage
                                    src="https://github.com/shadcn.png"
                                    alt="@shadcn"
                                />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <div>
                                <h6 className="font-semibold">
                                    {celula.nome_celula}
                                </h6>
                                <small>{celula.secretario}</small>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </Suspense>
    );
}
