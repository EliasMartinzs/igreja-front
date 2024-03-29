import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { MembersSkeletons } from './skeletons/MembersSkeletons';
import { Suspense } from 'react';
import { getCelulas } from '@/services/celula';

export async function Celulas() {
    const celulas = await getCelulas();

    return (
        <Suspense fallback={<MembersSkeletons />}>
            <div className="flex flex-col gap-y-4">
                {celulas !== undefined &&
                    celulas.map(({ nome_celula }) => (
                        <Link
                            href={`/admin/celula/${'id vem aqui pagina da celula ta pronta'}`}
                            key={nome_celula}
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
                                        {nome_celula}
                                    </h6>
                                    <small>nome do secretario aqui</small>
                                </div>
                            </div>
                        </Link>
                    ))}
            </div>
        </Suspense>
    );
}
