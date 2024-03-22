import { api } from './api';

export type CelulasResponse = {
    id: number;
    nome_celula: string;
    secretarioId: number;
    latitude: number;
    longitude: number;
    endereco: 'puteiro';
    anfitriaoId: number;
    liderId: number;
    liderEmTreinamentoId: number;
}[];

export const getCelulas = async () => {
    try {
        const response = await api.get('/celulas');
        return response.data as CelulasResponse;
    } catch (error) {
        console.log(error);
    }
};
