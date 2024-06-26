import { api } from './api';

type DashboardResponse = {
    totalCelulas: number;
    totalMembros: number;
    totalEncontros: number;
};

export const pegarDashboardSecretario =
    async (): Promise<DashboardResponse> => {
        try {
            const response = await api.get('/dashboard/secretario');
            return response.data as DashboardResponse;
        } catch (error) {
            return { totalCelulas: 0, totalMembros: 0, totalEncontros: 0 };
        }
    };
