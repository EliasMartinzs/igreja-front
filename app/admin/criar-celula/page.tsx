import React from 'react';
import CreateCelulaForm from './_components/CreateCelulaForm';
import { getSecretary } from '@/services/secretary';

export default async function CreateCelula() {
    const secretary = await getSecretary();

    return <CreateCelulaForm secretary={secretary} />;
}
