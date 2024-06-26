'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { MembersSkeletons } from './skeletons/MembersSkeletons';
import { Suspense, useState } from 'react';
import { GetCelulasResponse } from '@/services/celula';
import { SearchMember } from './BuscarMembros';
import { PaginationComponent } from '@/components/reusable/Paginacao';

interface ICelulas {
    celulas: GetCelulasResponse[] | undefined;
}

const pageSize = 10;

export function Celulas(props: ICelulas) {
    const { celulas } = props;
    const [searchCelula, setSearchCelula] = useState('');

    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentItems =
        celulas !== undefined && celulas.slice(startIndex, endIndex);
    const totalPages = Math.ceil((celulas?.length || 0) / pageSize);

    const filteredCelulas =
        celulas !== undefined &&
        celulas
            .filter((member) =>
                member.nome_celula
                    .toLowerCase()
                    .includes(searchCelula.toLowerCase()),
            )
            .map((member) => ({
                nome_celula: member.nome_celula,
                id: member.id,
            }));

    return (
        <Suspense fallback={<MembersSkeletons />}>
            <div className="space-y-4">
                <SearchMember
                    searchMember={searchCelula}
                    setSearchMember={setSearchCelula}
                    placeholder="Buscar por células..."
                />
                <div className="flex flex-col gap-y-4">
                    {searchCelula.length >= 1 ? (
                        <div className="space-y-4">
                            {Array.isArray(filteredCelulas) &&
                                filteredCelulas.map(({ nome_celula, id }) => (
                                    <Celula id={id} nome_celula={nome_celula} />
                                ))}
                        </div>
                    ) : (
                        <>
                            {currentItems === false ? (
                                <div className="text-center pt-5">
                                    <p className="text-lg">
                                        Nenhuma célula foi criada até o momento!
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {Array.isArray(currentItems) &&
                                        currentItems.map(
                                            ({ nome_celula, id }) => (
                                                <Celula
                                                    id={id}
                                                    nome_celula={nome_celula}
                                                />
                                            ),
                                        )}

                                    <PaginationComponent
                                        setCurrentPage={setCurrentPage}
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </Suspense>
    );
}

const Celula = ({ id, nome_celula }: { id: number; nome_celula: string }) => {
    return (
        <Link href={`/admin/celula/${id}`} key={nome_celula} className="cards">
            <div className="flex flex-row items-center justify-start gap-x-3">
                <Avatar className="">
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>

                <div>
                    <h6 className="font-semibold">{nome_celula}</h6>
                    <small>nome do secretario aqui</small>
                </div>
            </div>
        </Link>
    );
};
