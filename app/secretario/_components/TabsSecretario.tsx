import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { ReactNode } from 'react';
import { FaCalendar, FaCalendarAlt } from 'react-icons/fa';
import { FiFilePlus, FiUserPlus } from 'react-icons/fi';

type Card = {
    name: string;
    link: string;
    icon: ReactNode;
};

export async function TabsSecretario() {
    const cards: Card[] = [
        {
            icon: <FiUserPlus className="text-3xl" />,
            link: '/secretario/criar-membro',
            name: 'Criar Membro',
        },
        {
            icon: <FaCalendarAlt className="text-3xl" />,
            link: '/secretario/criar-novo-encontro',
            name: 'Criar novo Encontro',
        },
    ];

    return (
        <Tabs defaultValue="atalhos" className="">
            <TabsList className="grid grid-cols-3 rounded-full mb-4">
                <TabsTrigger value="atalhos">Atalhos</TabsTrigger>
                <TabsTrigger value="membros">Membros</TabsTrigger>
                <TabsTrigger value="celulas">Células</TabsTrigger>
            </TabsList>
            <TabsContent value="atalhos" className="flex flex-col gap-2">
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
            <TabsContent value="membros"></TabsContent>
            <TabsContent value="celulas"></TabsContent>
        </Tabs>
    );
}
