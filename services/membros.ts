import { z } from 'zod';
import { api } from './api';
import { criarNovoMembroSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import { GetMembersResponse } from '@/lib/types';

export const pegarMembros = async (): Promise<GetMembersResponse[]> => {
    try {
        const response = await api.get('/membros');

        return response.data as GetMembersResponse[];
    } catch (error) {
        throw new Error(`Erro ao obter todos os membros`);
    }
};

export const pegarMembrosPorId = async (
    id: number,
): Promise<GetMembersResponse> => {
    try {
        const response = await api.get(`/membros/${id}`);

        return response.data as GetMembersResponse;
    } catch (error: any) {
        throw new Error(`Erro ao obter membros por ID ${id}: ${error.message}`);
    }
};

export const criarNovoMembro = async (
    data: z.infer<typeof criarNovoMembroSchema>,
) => {
    const parsedData = criarNovoMembroSchema.safeParse(data);

    if (parsedData.success) {
        const {
            cristao,
            dataAniversario,
            descubra,
            celulaId,
            lideresEscolares,
            nome,
            novoConvertido,
            sexo,
            telefone,
            imagem,
        } = parsedData.data;
        try {
            await api.post('/membros', {
                nome: nome,
                telefone: telefone,
                sexo: sexo,
                data_nascimento: new Date(dataAniversario),
                cristao: cristao,
                novo_convertido: novoConvertido,
                descubra: descubra,
                escola_de_lideres: lideresEscolares,
                foto: imagem,
                idCelula: +celulaId,
                tipo_membro: 3,
            });

            revalidatePath('/admin');
        } catch (error) {}
    }
};
