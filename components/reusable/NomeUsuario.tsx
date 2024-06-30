'use client';

import { useAuth } from '@/contexts/AuthContext';

export const NomeUsuario = () => {
    const { user } = useAuth();

    return (
        <h1>
            Bem vindo, <span className="capitalize">{user?.nome}</span>!
        </h1>
    );
};
