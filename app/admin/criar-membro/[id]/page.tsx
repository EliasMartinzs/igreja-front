import React from 'react';
import { getCelulaById, getCelulas } from '@/services/celula';
import { CriarMembroForm } from '@/components/reusable/CriarMembroForm';

export default async function CreateNewMember({
    params,
}: {
    params: { id: string };
}) {
    const celulas = await getCelulas();

    return (
        <div>
            <CriarMembroForm celulas={celulas} id={params.id} />
        </div>
    );
}
