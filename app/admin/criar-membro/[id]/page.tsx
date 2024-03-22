import React from 'react';
import CreateMemberForm from './_components/CreateMemberForm';
import { getCelulas } from '@/services/celula';

export default async function CreateNewMember({
    params,
}: {
    params: { id: string };
}) {
    const celulas = await getCelulas();
    return (
        <div>
            <CreateMemberForm id={params.id} celulas={celulas} />
        </div>
    );
}
