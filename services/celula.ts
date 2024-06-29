'use server';

import { z } from 'zod';
import { api } from './api';
import { createCelulaSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { navigate } from './navigate';
import { CreateCelulaResponse, GetCelulasResponse } from '@/lib/types';

export const pegarCelulas = async (): Promise<GetCelulasResponse[]> => {
    try {
        const response = await api.get('/celulas');
        return response.data as GetCelulasResponse[];
    } catch (error: any) {
        throw new Error(error);
    }
};

export const getCelulaById = async (
    id: number,
): Promise<GetCelulasResponse> => {
    try {
        const response = await api.get(`/celulas/${id}`);

        return response.data as GetCelulasResponse;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const createCelula = async (
    data: z.infer<typeof createCelulaSchema>,
): Promise<CreateCelulaResponse> => {
    const parsedData = createCelulaSchema.safeParse(data);

    if (parsedData.success) {
        try {
            const { adress, celula, secretaryId } = parsedData.data;

            const response = await api.post('/celulas', {
                nome_celula: celula,
                endereco: adress,
                liderId: 0,
                liderEmTreinamentoId: 0,
                anfitriaoId: 0,
            });

            revalidatePath('/admin');

            return response.data as CreateCelulaResponse;
        } catch (error: any) {
            throw new Error(error);
        }
    } else {
        throw new Error('Os dados fornecidos não são válidos.');
    }
};

export const deleteCelula = async (id: number): Promise<void> => {
    try {
        await api.delete(`/celulas/${id}`);

        revalidatePath('/admin');

        navigate('/admin');
    } catch (error: any) {
        throw new Error(error);
    }
};
