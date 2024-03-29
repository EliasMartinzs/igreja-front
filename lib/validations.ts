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

export const createCelula = z.object({
    celula: z
        .string()
        .min(2, { message: 'O nome deve ter pelo menos 2 caracteres' }),
    secretary: z.string().min(2, {
        message: 'O nome do secretário deve ter pelo menos 2 caracteres',
    }),
    adress: z
        .string()
        .min(5, { message: 'O endereço deve ter pelo menos 5 caracteres' }),
});

export const createNewMemberSchema = z.object({
    name: z.string().min(6, {
        message: 'Por favor, Insira o nome completo.',
    }),
    phone: z
        .string()
        .min(11, {
            message:
                'Por favor, insira o número de telefone corretamente (com DDD e DDI, se aplicável)',
        })
        .max(15),
    sexo: z.enum(['Masculino', 'Feminino']),
    christian: z.boolean({
        description: 'Por favor, Indique se é cristão ou não.',
    }),
    newConvert: z.boolean({
        description: 'Por favor, Indique se é um novo convertido ou não.',
    }),
    descubra: z.boolean({
        description: 'Por favor, Indique se sim ou não.',
    }),
    schoolLeaders: z.boolean({
        description: 'Por favor, Indique se sim ou não.',
    }),
    cell: z.string().optional(),
    birthday: z.date({
        required_error: 'Por favor, Foneça uma data de aniversario valida.',
    }),
    img: z.string().optional(),
});
