import { api } from './api';

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
