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
    foto: null | string;
    tipo_membro: number;
    nome_celula: null | string;
    id_celula: null | string;
};

export type GetCelulasResponse = {
    id: number;
    nome_celula: string;
    secretarioId: number;
    latitude: number;
    longitude: number;
    endereco: string;
    liderId: number;
    liderEmTreinamentoId: number;
};

export type CreateCelulaResponse = {
    endereco: string;
    nome_celula: string;
    secretarioId: string;
};
