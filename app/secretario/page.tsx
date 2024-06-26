import React from 'react';
import { Header } from '../../components/reusable/Header';
import { StatusSecretario } from './_components/StatusSecretario';
import { TabsSecretario } from './_components/TabsSecretario';

export default function Secretario() {
    return (
        <main className="m-4 lg:max-w-6xl lg:mx-auto flex flex-col gap-4">
            <Header cargo="Secretário" />
            <h2 className="font-regular text-2xl">Bem Vindo, Antonio!</h2>
            <StatusSecretario />
            <TabsSecretario />
        </main>
    );
}
