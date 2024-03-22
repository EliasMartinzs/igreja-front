'use client';

import { useState } from 'react';
import { cellsArray } from '@/constants';
import { SearchMember } from './SearchMember';
import { MembersList } from './MembersList';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Members() {
    const [searchMember, setSearchMember] = useState('');

    const filteredMembers = cellsArray.map((cell) => {
        return cell.membros
            .filter((member) =>
                member.nome.toLowerCase().includes(searchMember.toLowerCase()),
            )
            .map((member) => ({
                nome: member.nome,
                nome_celula: cell.nome_celula,
            }));
    });

    return (
        <div className="space-y-4">
            <SearchMember
                searchMember={searchMember}
                setSearchMember={setSearchMember}
            />
            {searchMember.length >= 1 ? (
                <div className="space-y-4">
                    {filteredMembers.map((members) =>
                        members.map((member) => (
                            <Membro
                                nome={member.nome}
                                nome_celula={member.nome_celula}
                            />
                        )),
                    )}
                </div>
            ) : (
                cellsArray.map(({ membros, nome_celula }) =>
                    membros.map(({ nome }) => (
                        <Membro nome={nome} nome_celula={nome_celula} />
                    )),
                )
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
        className="border rounded-3xl p-4 border-[#2b2b2b] flex flex-row gap-4 cursor-pointer items-center"
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
