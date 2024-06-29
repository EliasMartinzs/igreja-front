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
    nome: z.string().min(6, {
        message: 'Por favor, insira o nome completo.',
    }),
    telefone: z
        .string()
        .min(11, {
            message:
                'Por favor, insira o número de telefone corretamente (com DDD e DDI, se aplicável)',
        })
        .max(15),
    sexo: z.enum(['Masculino', 'Feminino']),
    cristao: z.boolean({
        description: 'Por favor, indique se é cristão ou não.',
    }),
    novoConvertido: z.boolean({
        description: 'Por favor, indique se é um novo convertido ou não.',
    }),
    descubra: z.boolean({
        description: 'Por favor, indique sim ou não.',
    }),
    lideresEscolares: z.boolean({
        description: 'Por favor, indique sim ou não.',
    }),
    celulaId: z.string().min(1, {
        message: 'Por favor, selecione uma célula para este membro.',
    }),
    dataAniversario: z.date({
        required_error: 'Por favor, forneça uma data de aniversário válida.',
    }),
    imagem: z.string().optional(),
});
