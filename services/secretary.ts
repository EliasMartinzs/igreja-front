'use server';

import { z } from 'zod';
import { api } from './api';

import { createSecretarySchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export type GetSecretaryResponse = {
    id: number;
    nome: string;
    usuario: string;
    tipo_usuario: number;
    foto: null;
}[];

export type CreateSecretaryResponse = {
    nome: string;
    senha: string;
    usuario: string;
    foto: string;
};

export const getSecretary = async (): Promise<GetSecretaryResponse> => {
    try {
        const response = await api.get('/usuarios/secretario');
        return response.data as GetSecretaryResponse;
    } catch (error: any) {
        throw new Error(error);
    }
};

export const createSecretary = async (
    data: z.infer<typeof createSecretarySchema>,
): Promise<CreateSecretaryResponse> => {
    const parsedData = createSecretarySchema.safeParse(data);

    if (parsedData.success) {
        const { name, password, user, img } = parsedData.data;

        try {
            const response = await api.post('/usuarios/secretario', {
                nome: name,
                senha: password,
                usuario: user,
                foto: img,
            });

            revalidatePath('/admin/criar-celula');

            return response.data as CreateSecretaryResponse;
        } catch (error: any) {
            throw new Error(error);
        }
    } else {
        throw new Error('Os dados fornecidos não são válidos.');
    }
};
