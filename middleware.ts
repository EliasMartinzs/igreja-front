import { jwtDecode } from 'jwt-decode';
import { NextRequest } from 'next/server';
import { TipoUsuario } from './enums/tipo_usuario';
import { User } from './models/user';
import { api } from './services/api';

export default function authMiddleware(request: NextRequest) {
    const token = request.cookies.get('celula-ibem.token');
    const currentPath = request.nextUrl.pathname.split('/')[1];

    if (!token) {
        if (currentPath) {
            return Response.redirect(new URL('/', request.url));
        }

        return;
    }

    api.defaults.headers['Authorization'] = `Bearer ${token.value}`;
    const user = jwtDecode<User>(token!.value);

    if (user.tipo_usuario === TipoUsuario.admin && currentPath !== 'admin') {
        return Response.redirect(new URL('/admin', request.url));
    }

    if (
        user.tipo_usuario === TipoUsuario.secretario &&
        currentPath !== 'secretario'
    ) {
        return Response.redirect(new URL('/secretario', request.url));
    }
}

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
