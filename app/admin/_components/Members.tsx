'use client';

import { useEffect, useState } from 'react';
import { SearchMember } from './SearchMember';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MembersResponse } from '@/services/members';

import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
} from '@/components/ui/pagination';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';
import { usePathname, useRouter } from 'next/navigation';

interface IMembers {
    members: MembersResponse | undefined;
}

const pageSize = 5;

export function Members(props: IMembers) {
    const { members } = props;
    const [searchMember, setSearchMember] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentItems =
        members !== undefined && members.slice(startIndex, endIndex);
    const totalPages = Math.ceil((members?.length || 0) / pageSize);

    const handleNextPage = () => {
        setCurrentPage((currentPage) => currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((currentPage) => currentPage - 1);
    };

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
        <div className="space-y-4">
            <SearchMember
                searchMember={searchMember}
                setSearchMember={setSearchMember}
            />
            {searchMember.length >= 1 ? (
                <div className="space-y-4">
                    {Array.isArray(filteredMembers) &&
                        filteredMembers.map(({ nome }) => (
                            <Membro nome={nome} nome_celula="Ñão tem ainda" />
                        ))}
                </div>
            ) : (
                <div>
                    <div className="space-y-4">
                        {Array.isArray(currentItems) &&
                            currentItems.map(({ nome }) => (
                                <Membro
                                    nome={nome}
                                    nome_celula="Não tem ainda!"
                                />
                            ))}
                    </div>

                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <ChevronLeftIcon
                                    className="cursor-pointer w-5 h-5"
                                    onClick={handlePrevPage}
                                />
                            </PaginationItem>
                            {Array.from({ length: totalPages }).map(
                                (_, index) => (
                                    <PaginationItem
                                        key={index}
                                        className={
                                            index === currentPage - 1
                                                ? 'cursor-pointer bg-neutral-950 rounded-full'
                                                : ''
                                        }
                                    >
                                        <PaginationLink>
                                            {index + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                ),
                            )}
                            <PaginationItem>
                                <ChevronRightIcon
                                    className="cursor-pointer w-5 h-5"
                                    onClick={handleNextPage}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}

type MembroProps = {
    nome: string;
    nome_celula: string;
};
const Membro = ({ nome, nome_celula }: MembroProps) => (
    <div
        key={nome}
        className="border rounded-3xl p-4 border-[#2b2b2b] flex flex-row gap-4 cursor-pointer items-center hover:border-slate-200 transition-colors"
    >
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
