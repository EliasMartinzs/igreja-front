import * as z from 'zod';

export const loginSchema = z.object({
    user: z.string().min(3, {
        message: 'O nome de usuário deve ter pelo menos 3 caracteres.',
    }),
    password: z.string().min(6, {
        message: 'A senha deve ter pelo menos 3 caracteres.',
    }),
});

export const createSecretarySchema = z.object({
    user: z.string().min(3, {
        message: 'O nome de usuário deve ter pelo menos 3 caracteres.',
    }),
    name: z.string().min(5, {
        message: 'O nome do usuário é obrigatório e deve estar completo.',
    }),
    img: z.string().optional(),
    password: z.string().min(6, {
        message: 'A senha deve ter pelo menos 3 caracteres.',
    }),
});

export const createCelulaSchema = z.object({
    celula: z
        .string()
        .min(2, { message: 'O nome deve ter pelo menos 2 caracteres' }),
    secretaryId: z.string().min(1, {
        message: 'Por favor, selecione um secretário.',
    }),
    adress: z
        .string()
        .min(5, { message: 'O endereço deve ter pelo menos 5 caracteres' }),
});

export const criarNovoMembroSchema = z.object({
    nome: z
        .string()
        .min(6, {
            message: 'Por favor, insira o nome completo.',
        })
        .optional(),
    telefone: z.string().min(11, {
        message: 'Por favor, insira o numero',
    }),
    sexo: z.enum(['Masculino', 'Feminino'], {
        errorMap: () => ({
            message: 'Selecione um dos campos: Masculino ou Feminino.',
        }),
    }),
    cristao: z.boolean(),
    novoConvertido: z.boolean(),
    descubra: z.boolean(),
    lideresEscolares: z.boolean(),
    celulaId: z.string(),
    dataAniversario: z.string(),
    imagem: z.string().optional(),
});
