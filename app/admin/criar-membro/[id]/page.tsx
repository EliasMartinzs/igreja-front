import React from 'react';
import { CriarNovoMembroForm } from '@/components/reusable/CriarNovoMembroForm';
import { pegarCelulas } from '@/services/celula';

export default async function CreateNewMember({
    params,
}: {
    params: { id: string };
}) {
    const celulas = await pegarCelulas();

    return (
        <div>
            <CriarNovoMembroForm celulas={celulas} id={params.id} />
        </div>
    );
}
