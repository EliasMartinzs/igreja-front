import * as z from "zod";

export const loginSchema = z.object({
  user: z.string().min(3, {
    message: "O nome de usuário deve ter pelo menos 3 caracteres.",
  }),
  password: z.string().min(6, {
    message: "A senha deve ter pelo menos 3 caracteres.",
  }),
});

export const createSecretary = z.object({
  user: z.string().min(3, {
    message: "O nome de usuário deve ter pelo menos 3 caracteres.",
  }),
  name: z.string().min(5, {
    message: "O nome do usuário é obrigatório e deve estar completo.",
  }),
  email: z
    .string()
    .min(1, { message: "Por favor, insira um email válido." })
    .email("Por favor, insira um email válido."),
  celula: z.string().min(3, {
    message: "Por favor, preencha corretamente o nome da célula",
  }),
  backgroundCelula: z.string().min(1, {
    message: "Por favor, adicione uma imagem para continuar.",
  }),
});

export const createCelula = z.object({
  name: z
    .string()
    .min(2, { message: "O nome deve ter pelo menos 2 caracteres" }),
  secretary: z
    .string()
    .min(2, {
      message: "O nome do secretário deve ter pelo menos 2 caracteres",
    }),
  host: z
    .string()
    .min(2, {
      message: "O nome do anfitrião deve ter pelo menos 2 caracteres",
    }),
  leader: z
    .string()
    .min(2, { message: "O nome do líder deve ter pelo menos 2 caracteres" }),
  trainingLeader: z
    .string()
    .min(2, {
      message:
        "O nome do líder em treinamento deve ter pelo menos 2 caracteres",
    }),
  adress: z
    .string()
    .min(5, { message: "O endereço deve ter pelo menos 5 caracteres" }),
});
