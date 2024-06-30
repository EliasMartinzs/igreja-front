'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { MembersSkeletons } from './skeletons/MembersSkeletons';
import { Suspense, useState, useMemo } from 'react';
import { BuscarMembros } from './BuscarMembros';
import { Paginacao } from '@/components/reusable/Paginacao';
import { GetCelulasResponse } from '@/lib/types';

interface ICelulas {
    celulas: GetCelulasResponse[];
}

const pageSize = 10;

export function Celulas({ celulas }: ICelulas) {
    const [searchCelula, setSearchCelula] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const filteredCelulas = useMemo(() => {
        if (!celulas) return [];

        return celulas.filter((celula) =>
            celula.nome_celula
                .toLowerCase()
                .includes(searchCelula.toLowerCase()),
        );
    }, [celulas, searchCelula]);

    const paginatedCelulas = useMemo(() => {
        return filteredCelulas.slice(startIndex, endIndex);
    }, [filteredCelulas, startIndex, endIndex]);

    const totalPages = Math.ceil(filteredCelulas.length / pageSize);

    return (
        <Suspense fallback={<MembersSkeletons />}>
            <div className="space-y-4">
                <BuscarMembros
                    searchMember={searchCelula}
                    setSearchMember={setSearchCelula}
                    placeholder="Buscar por células..."
                />
                <div className="flex flex-col gap-y-4">
                    {searchCelula && <CelulaList celulas={filteredCelulas} />}
                    {!searchCelula && paginatedCelulas.length === 0 && (
                        <div className="text-center pt-5">
                            <p className="text-lg">
                                Nenhuma célula foi criada até o momento!
                            </p>
                        </div>
                    )}
                    {!searchCelula && paginatedCelulas.length > 0 && (
                        <CelulaList celulas={paginatedCelulas} />
                    )}
                    {totalPages > 1 && (
                        <Paginacao
                            setCurrentPage={setCurrentPage}
                            currentPage={currentPage}
                            totalPages={totalPages}
                        />
                    )}
                </div>
            </div>
        </Suspense>
    );
}

const CelulaList = ({ celulas }: { celulas: GetCelulasResponse[] }) => (
    <div className="space-y-4">
        {celulas.map(({ nome_celula, id }) => (
            <Celula key={id} id={id} nome_celula={nome_celula} />
        ))}
    </div>
);

const Celula = ({ id, nome_celula }: { id: number; nome_celula: string }) => (
    <Link href={`/admin/celula/${id}`} key={id} className="cards">
        <div className="flex flex-row items-center justify-start gap-x-3">
            <Avatar>
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
