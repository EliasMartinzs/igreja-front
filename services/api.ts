import axios from 'axios';
import { parseCookies } from 'nookies';

const isServer = typeof window === 'undefined';

export const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use(async (config) => {
    if (isServer) {
        const { cookies } = await import('next/headers');
        const token = cookies().get('celula-ibem.token');

        if (token) {
            config.headers['Authorization'] = `Bearer ${token.value}`;
        }
        return config;
    }

    const { 'celula-ibem.token': token } = parseCookies();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
});
