import React from 'react';
import { Header } from '../../components/reusable/Header';
import { StatusSecretario } from './_components/StatusSecretario';
import { TabsSecretario } from './_components/TabsSecretario';
import { Wrapper } from '@/components/reusable/Wrapper';
import { NomeUsuario } from '@/components/reusable/NomeUsuario';

export default function Secretario() {
    return (
        <Wrapper className="flex flex-col gap-y-5">
            <Header cargo="Secretário" />
            <NomeUsuario />
            <StatusSecretario />
            <TabsSecretario />
        </Wrapper>
    );
}
