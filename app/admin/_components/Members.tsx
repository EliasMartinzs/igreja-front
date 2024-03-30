'use client';

import { Suspense, useState } from 'react';
import { SearchMember } from './SearchMember';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GetMembersResponse } from '@/services/members';

import { MembersSkeletons } from './skeletons/MembersSkeletons';
import { PaginationComponent } from '@/components/reusable/PaginationComponent';

interface IMembers {
    members: GetMembersResponse[] | undefined;
}

const pageSize = 10;

export function Members(props: IMembers) {
    const { members } = props;

    const [searchMember, setSearchMember] = useState('');

    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentItems =
        members !== undefined && members.slice(startIndex, endIndex);
    const totalPages = Math.ceil((members?.length || 0) / pageSize);

    const filteredMembers =
        members !== undefined &&
        members
            .filter((member) =>
                member.nome.toLowerCase().includes(searchMember.toLowerCase()),
            )
            .map((member) => ({
                nome: member.nome,
            }));

    return (
        <div>
            <Suspense fallback={<MembersSkeletons />}>
                <div className="space-y-4">
                    <SearchMember
                        searchMember={searchMember}
                        setSearchMember={setSearchMember}
                        placeholder="Buscar por membros..."
                    />
                    {searchMember.length >= 1 ? (
                        <div className="space-y-4">
                            {Array.isArray(filteredMembers) &&
                                filteredMembers.map(({ nome }) => (
                                    <Membro
                                        nome={nome}
                                        nome_celula="Ñão tem ainda"
                                    />
                                ))}
                        </div>
                    ) : (
                        <>
                            {Array.isArray(currentItems) &&
                            currentItems.length === 0 ? (
                                <div className="text-center pt-5">
                                    <p className="text-lg">
                                        Nenhuma membro foi criada até o momento!
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-4">
                                        {Array.isArray(currentItems) &&
                                            currentItems.map(({ nome }) => (
                                                <Membro
                                                    nome={nome}
                                                    nome_celula="Não tem ainda!"
                                                />
                                            ))}
                                    </div>

                                    <PaginationComponent
                                        setCurrentPage={setCurrentPage}
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                    />
                                </>
                            )}
                        </>
                    )}
                </div>
            </Suspense>
        </div>
    );
}

type MembroProps = {
    nome: string;
    nome_celula: string;
};
export const Membro = ({ nome, nome_celula }: MembroProps) => (
    <div key={nome} className="cards">
        <Avatar className="w-[40px] h-[40px]">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-2">
            <p className="text-xs m-0">{nome}</p>
            <p className="text-md m-0">{nome_celula}</p>
        </div>
    </div>
);
