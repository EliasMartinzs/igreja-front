'use server';
import { api } from './api';

export type CelulasResponse = {
    nome_celula: string;
    secretarioId: number;
    latitude: number;
    longitude: number;
    endereco: string;
    liderId: number;
    liderEmTreinamentoId: number;
}[];

export const getCelulas = async (): Promise<CelulasResponse | undefined> => {
    try {
        const response = await api.get('/celulas');
        return response.data as CelulasResponse;
    } catch (error) {}
};
