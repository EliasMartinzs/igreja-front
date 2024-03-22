// In Next.js, this file would be called: app/providers.jsx
'use client';

import { ReactNode } from 'react';
import { AuthProvider } from '../contexts/AuthContext';

type ProvidersProps = {
    children: ReactNode;
};
export default function Providers({ children }: ProvidersProps) {
    return <AuthProvider>{children}</AuthProvider>;
}
