import { z } from 'zod';
import { api } from './api';

import { createSecretarySchema } from '@/lib/validations';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export type SecretaryResponse = {
    id: number;
    nome: string;
    usuario: string;
    tipo_usuario: number;
    foto: null;
}[];

export const getSecretary = async (): Promise<
    SecretaryResponse | undefined
> => {
    try {
        const response = await api.get('/usuarios/secretario');
        return response.data as SecretaryResponse;
    } catch (error) {}
};

export const createSecretary = async (
    data: z.infer<typeof createSecretarySchema>,
    router: AppRouterInstance,
) => {
    const parsedData = createSecretarySchema.safeParse(data);

    if (parsedData.success) {
        const { name, password, user, img } = parsedData.data;

        try {
            await api.post('/usuarios/secretario', {
                nome: name,
                senha: password,
                usuario: user,
                foto: img,
            });

            router.push('/admin');
        } catch (error: any) {
            console.log(error);
        }
    }
};
