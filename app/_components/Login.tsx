import Image from 'next/image';
import { LoginForm } from './LoginForm';

export function Login() {
    return (
        <div className="w-full h-svh p-8 justify-center center flex-col gap-y-4">
            <div className="text-center">
                <Image
                    alt="logo"
                    width="200"
                    height="200"
                    src="/images/logo_color_01_variacao.png"
                    priority
                />
            </div>
            <div className="w-full h-full max-w-sm">
                <LoginForm />
            </div>
        </div>
    );
}
