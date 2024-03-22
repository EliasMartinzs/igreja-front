import { TipoUsuario } from '../enums/tipo_usuario';
import { api } from './api';

type SignData = {
    user: string;
    password: string;
};

type SignResponse = {
    id: number;
    nome: string;
    tipo_usuario: TipoUsuario;
    token: string;
};

export async function signRequest({
    user,
    password,
}: SignData): Promise<SignResponse> {
    const response = await api.post('/usuarios/login', {
        usuario: user,
        senha: password,
    });

    return response.data as SignResponse;
}
