import { TipoUsuario } from "../enums/tipo_usuario";

export type User = {
    id: number;
    nome: string;
    tipo_usuario: TipoUsuario;
};