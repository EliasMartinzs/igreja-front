import React from 'react';
import CreateSecretaryForm from './_components/CreateSecretaryForm';
import { getCelulas } from '@/services/celula';

export default async function CreateSecretary() {
    const celulas = await getCelulas();

    return <CreateSecretaryForm celulas={celulas} />;
}
