'use client';
import { loginSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import { Spinner } from '@/components/reusable/Spinner';
import { Button } from '@/components/ui/button';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import Image from 'next/image';
import { FaLock } from 'react-icons/fa';
import { FiUser } from 'react-icons/fi';

type loginValidation = z.infer<typeof loginSchema>;

export function LoginForm() {
    const [error, setError] = useState('');
    const form = useForm<loginValidation>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            user: '',
            password: '',
        },
    });

    const [isPending, startTransition] = useTransition();

    const { signIn } = useContext(AuthContext);

    async function onSubmit(data: loginValidation) {
        setError('');
        const parsedData = loginSchema.safeParse(data);

        if (parsedData.success) {
            const { data } = parsedData;

            try {
                startTransition(async () => {
                    await signIn(data);
                });
            } catch {
                setError('Usuário ou senha inválidos!');
            }
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full h-full gap-y-5 flex flex-col"
            >
                <FormField
                    control={form.control}
                    name="user"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Usuário</FormLabel>
                            <div className="relative flex items-center justify-between">
                                <input
                                    {...field}
                                    placeholder="Usuario"
                                    className="input-mask"
                                    disabled={isPending}
                                />
                                <span className="absolute right-4">
                                    <FiUser className="w-4 h-4" />
                                </span>
                            </div>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <div className="relative flex items-center justify-between">
                                <input
                                    {...field}
                                    placeholder="Insira sua senha"
                                    className="input-mask"
                                    type="password"
                                    disabled={isPending}
                                />
                                <span className="absolute right-4">
                                    <FaLock className="w-3 h-3" />
                                </span>
                            </div>

                            <FormMessage />
                        </FormItem>
                    )}
                />
                <small className="mt-[-16px] text-destructive font-semidbold">
                    {error}
                </small>

                <div className="mt-auto">
                    <Button
                        className="p-6 bg-red font-semibold text-lg active:bg-red/70 hover:bg-red/50 transition-colors disabled:bg-opacity-70 disabled:shadow-inner center gap-x-3"
                        rounded="full"
                        size="full"
                        disabled={isPending}
                    >
                        {isPending ? <Spinner /> : 'Login'}
                    </Button>
                </div>
            </form>
        </Form>
    );
}
