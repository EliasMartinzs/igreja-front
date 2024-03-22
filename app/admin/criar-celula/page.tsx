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
import { createCelula } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { TopHeader } from '../_components/TopHeader';

type secretarySchema = z.infer<typeof createCelula>;

export default function CreateCelula() {
    const form = useForm<secretarySchema>({
        resolver: zodResolver(createCelula),
        defaultValues: {
            celula: '',
            adress: '',
            host: '',
            leader: '',
            secretary: '',
            trainingLeader: '',
        },
    });

    function onSubmit(data: secretarySchema) {
        console.log(data);
    }

    return (
        <div className="m-6 space-y-6 lg:max-w-6xl lg:mx-auto">
            <TopHeader message="Cadastrar uma nova célula" href="/admin" />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex-1 flex flex-col gap-y-5"
                >
                    <FormField
                        control={form.control}
                        name="celula"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        placeholder="Insira o nome da Celula"
                                        className="input-mask"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="secretary"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Secretario</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        placeholder="Insira o nome do Secretario"
                                        className="input-mask"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="host"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Anfitrião</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        placeholder="Insira o nome do Anfitrião"
                                        className="input-mask"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="leader"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Líder</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        placeholder="Insira o nome do Líder"
                                        className="input-mask"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="trainingLeader"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Líder em treinamento</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        placeholder="Insira o nome do Líder em treinamento"
                                        className="input-mask"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="adress"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Endereço</FormLabel>
                                <FormControl>
                                    <input
                                        {...field}
                                        placeholder="Insira o Endereço"
                                        className="input-mask"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="mt-5">
                        <Button
                            className="p-7 bg-darkRed font-semibold text-lg hover:bg-darkRed/70 transition-colors"
                            rounded="full"
                            size="full"
                            type="submit"
                        >
                            Criar Célula
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
