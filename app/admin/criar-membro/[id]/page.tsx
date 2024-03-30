import React from 'react';
import CreateMemberForm from './_components/CreateMemberForm';
import { getCelulaById, getCelulas } from '@/services/celula';

export default async function CreateNewMember({
    params,
}: {
    params: { id: string };
}) {
    const celulas = await getCelulas();

    return (
        <div>
            <CreateMemberForm celulas={celulas} id={params.id} />
        </div>
    );
}
