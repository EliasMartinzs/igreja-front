import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import Providers from './providers';
import { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Igreja',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pt-BR">
            <body
                className={cn(montserrat.className, '')}
                suppressHydrationWarning={true}
            >
                <Providers>
                    <SkeletonTheme baseColor="#222" highlightColor="#444">
                        {children}
                        <ToastContainer theme="dark" />
                    </SkeletonTheme>
                </Providers>
            </body>
        </html>
    );
}
