import { z } from 'zod';
import { api } from './api';
import { createNewMemberSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export type GetMembersResponse = {
    id: number;
    nome: string;
    telefone: string;
    sexo: string;
    data_nascimento: string;
    cristao: boolean;
    novo_convertido: boolean;
    escola_de_lideres: boolean;
    descubra: boolean;
    foto: string;
    encontroId: null;
    celulaId: null;
};

export const getMembers = async (): Promise<GetMembersResponse> => {
    try {
        const response = await api.get('/membros');

        return response.data as GetMembersResponse;
    } catch (error) {
        throw new Error(`Erro ao obter todos os membros`);
    }
};

export const getMembersById = async (
    id: number,
): Promise<GetMembersResponse> => {
    try {
        const response = await api.get(`/membros/${id}`);

        return response.data as GetMembersResponse;
    } catch (error: any) {
        throw new Error(`Erro ao obter membros por ID ${id}: ${error.message}`);
    }
};

export const createMember = async (
    data: z.infer<typeof createNewMemberSchema>,
) => {
    const parsedData = createNewMemberSchema.safeParse(data);

    if (parsedData.success) {
        const {
            birthday,
            christian,
            descubra,
            img,
            name,
            newConvert,
            phone,
            schoolLeaders,
            sexo,
            cellId,
        } = parsedData.data;
        try {
            await api.post('/membros', {
                nome: name,
                telefone: phone,
                sexo: sexo,
                data_nascimento: birthday,
                cristao: christian,
                novo_convertido: newConvert,
                descubra: descubra,
                escola_de_lideres: schoolLeaders,
                foto: img,
                celulaId: +cellId,
            });

            revalidatePath('/admin');
        } catch (error) {}
    }
};
