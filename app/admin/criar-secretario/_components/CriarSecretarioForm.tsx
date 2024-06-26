'use client';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';

import { createSecretarySchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';

import { createSecretary } from '@/services/secretary';
import { ChangeEvent, useRef, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { FiCheckCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';
import * as z from 'zod';
import { TopHeader } from '../../_components/TopHeader';

import { navigate } from '@/services/navigate';

type secretarySchema = z.infer<typeof createSecretarySchema>;

export function CriarSecretarioForm() {
    const [files, setFiles] = useState<File[]>([]);
    const [selectedFileName, setSelectedFileName] = useState<string>('');
    const [isPending, startTransition] = useTransition();

    const form = useForm<secretarySchema>({
        resolver: zodResolver(createSecretarySchema),
        defaultValues: {
            user: '',
            name: '',
            img: '',
            password: '',
        },
    });

    const inputRef = useRef<HTMLInputElement>(null);

    const handleImage = (
        e: ChangeEvent<HTMLInputElement>,
        fieldChange: (value: string) => void,
    ) => {
        e.preventDefault();

        const fileReader = new FileReader();

        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            setFiles(Array.from(e.target.files));
            setSelectedFileName(file.name);

            if (!file.type.includes('image')) return;

            fileReader.onload = async (e) => {
                const imageDataUrl = e.target?.result?.toString() || '';

                fieldChange(imageDataUrl);
            };

            fileReader.readAsDataURL(file);
        }
    };

    async function onSubmit(data: secretarySchema) {
        startTransition(async () => {
            await createSecretary(data);
            navigate('/admin');
            toast.success(`Secretario(a) ${data.name} criado com sucesso!`);
            form.reset();
        });
    }

    return (
        <div className="m-6 space-y-6 lg:max-w-6xl lg:mx-auto">
            <TopHeader message="Cadastrar um novo Secretario" href="/admin" />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex-1 flex flex-col gap-y-5"
                >
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        placeholder="Insira o nome completo"
                                        className="input-mask"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="user"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Usuário</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        placeholder="Insira o nome de usuário"
                                        className="input-mask"
                                    />
                                </FormControl>
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
                                <FormControl>
                                    <input
                                        {...field}
                                        placeholder="Insira o nome de usuário"
                                        className="input-mask"
                                        type="password"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <small className="text-slate-300">
                        Lembre-se: o usuário e senha do secretário serão
                        utilizados para acessar o aplicativo.
                    </small>

                    <FormField
                        control={form.control}
                        name="img"
                        render={({ field }) => (
                            <div className="w-full">
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed hover:border-neutral-500 transition-colors rounded-lg cursor-pointer">
                                    {field.value ? (
                                        <>
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6 gap-y-5">
                                                <FiCheckCircle className="w-12 h-12" />

                                                <p>Imagem selecionada</p>

                                                <small>
                                                    {selectedFileName}
                                                </small>

                                                <input
                                                    ref={inputRef}
                                                    type="file"
                                                    accept="image/*"
                                                    placeholder="Carregar uma foto"
                                                    className="hidden"
                                                    disabled={isPending}
                                                    onChange={(e) =>
                                                        handleImage(
                                                            e,
                                                            field.onChange,
                                                        )
                                                    }
                                                />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg
                                                    className="w-8 h-8 mb-4 text-gray-500"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 20 16"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                    />
                                                </svg>
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">
                                                        Selecione uma foto
                                                    </span>
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    SVG, PNG, JPG or GIF (MAX.
                                                    800x400px)
                                                </p>
                                            </div>
                                            <input
                                                ref={inputRef}
                                                type="file"
                                                accept="image/*"
                                                placeholder="Carregar uma foto"
                                                className="hidden"
                                                disabled={isPending}
                                                onChange={(e) =>
                                                    handleImage(
                                                        e,
                                                        field.onChange,
                                                    )
                                                }
                                            />
                                            <FormMessage />
                                        </>
                                    )}
                                </label>
                            </div>
                        )}
                    />

                    <div className="mt-5">
                        <Button
                            className="p-7 bg-darkRed font-semibold text-lg hover:bg-darkRed/70 transition-colors"
                            rounded="full"
                            size="full"
                            type="submit"
                        >
                            Criar Secretario
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
