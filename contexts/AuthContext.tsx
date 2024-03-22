import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';
import { parseCookies, setCookie } from 'nookies';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { TipoUsuario } from '../enums/tipo_usuario';
import { signRequest } from '../services/auth';
import { User } from '../models/user';
import { api } from '@/services/api';

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    signIn: (data: SignData) => Promise<void>;
};

type SignData = {
    user: string;
    password: string;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    const isAuthenticated = !!user;

    async function signIn(data: SignData) {
        const { id, nome, tipo_usuario, token } = await signRequest(data);
        setCookie(undefined, 'celula-ibem.token', token, {
            maxAge: 60 * 60 * 24,
        });

        setUser({
            id,
            nome,
            tipo_usuario,
        } as User);

        if (tipo_usuario === TipoUsuario.admin) {
            router.push('/admin');
        }

        if (tipo_usuario === TipoUsuario.secretario) {
            router.push('/secretario');
        }
    }

    useEffect(() => {
        const { 'celula-ibem.token': token } = parseCookies();

        if (token) {
            const decoded = jwtDecode<User>(token);
            setUser(decoded);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
            {children}
        </AuthContext.Provider>
    );
};
