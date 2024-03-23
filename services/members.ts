import { z } from 'zod';
import { api } from './api';
import { createNewMemberSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export type MembersResponse = {
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
}[];

export const getMembers = async () => {
    try {
        const response = await api.get('/membros');

        return response.data as MembersResponse;
    } catch (error) {}
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
        } = parsedData.data;
        try {
            const response = await api.post('/membros', {
                nome: name,
                telefone: phone,
                sexo: sexo,
                data_nascimento: birthday,
                cristao: christian,
                novo_convertido: newConvert,
                descubra: descubra,
                escola_de_lideres: schoolLeaders,
                foto: img,
            });

            revalidatePath('/admin');

            return response.data;
        } catch (error) {}
    }
};
