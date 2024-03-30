import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FiFilePlus, FiUserPlus } from 'react-icons/fi';

import { Celulas } from './Celulas';
import { Members } from './Members';
import { getMembers } from '@/services/members';
import { getCelulas } from '@/services/celula';

type Card = {
    name: string;
    link: string;
    icon: ReactNode;
};

export async function TabsAdm() {
    const members = await getMembers();
    const celulas = await getCelulas();

    const cards: Card[] = [
        {
            icon: <FiUserPlus className="text-3xl" />,
            link: '/admin/criar-secretario',
            name: 'Criar Secretario',
        },
        {
            icon: <FiFilePlus className="text-3xl" />,
            link: '/admin/criar-celula',
            name: 'Criar Célula',
        },
        {
            icon: <FiUserPlus className="text-3xl" />,
            link: '/admin/criar-membro/undefined',
            name: 'Criar Membro',
        },
    ];
    return (
        <Tabs defaultValue="atalhos" className="">
            <TabsList className="grid grid-cols-3 rounded-full mb-4">
                <TabsTrigger value="atalhos">Atalhos</TabsTrigger>
                <TabsTrigger value="membros">Membros</TabsTrigger>
                <TabsTrigger value="celulas">Células</TabsTrigger>
            </TabsList>
            <TabsContent value="atalhos" className="grid grid-cols-3 gap-2">
                {cards.map((card) => (
                    <Link
                        key={card.name}
                        href={card.link}
                        className="w-full border rounded-3xl center items-center flex-col justify-center h-[150px] cursor-pointer hover:border-neutral-200 transition-colors"
                    >
                        {card.icon}
                        <div className="text-center">
                            <p className="text-sm mt-2 w-[80px]">{card.name}</p>
                        </div>
                    </Link>
                ))}
            </TabsContent>
            <TabsContent value="membros">
                <Members members={members} />
            </TabsContent>
            <TabsContent value="celulas">
                <Celulas celulas={celulas} />
            </TabsContent>
        </Tabs>
    );
}
