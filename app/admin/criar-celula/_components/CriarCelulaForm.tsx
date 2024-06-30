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

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { createCelulaSchema } from '@/lib/validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { TopHeader } from '../../_components/TopHeader';
import { GetSecretaryResponse } from '@/services/secretary';
import { cn } from '@/lib/utils';
import { useTransition } from 'react';
import { createCelula } from '@/services/celula';
import { toast } from 'react-toastify';
import { navigate } from '@/services/navigate';

type celulaValidation = z.infer<typeof createCelulaSchema>;

interface Props {
    secretary: GetSecretaryResponse | undefined;
}

export default function CriarNovaCelulaForm({ secretary }: Props) {
    const [isPending, startTransition] = useTransition();
    const form = useForm<celulaValidation>({
        resolver: zodResolver(createCelulaSchema),
        defaultValues: {
            celula: '',
            adress: '',
            secretaryId: '',
        },
    });

    async function onSubmit(data: celulaValidation) {
        startTransition(async () => {
            await createCelula(data);
            toast.success(`Célula ${data.celula} criada com sucesso!`);
            navigate('/admin');
        });
    }

    if (!secretary) return;

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
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="secretaryId"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Secretario</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value.toString()}
                                >
                                    <FormControl>
                                        <SelectTrigger
                                            className={cn(
                                                field.value.toString() === ''
                                                    ? 'text-slate-300/50'
                                                    : 'text-white',
                                            )}
                                        >
                                            {secretary.length === 0 ? (
                                                <SelectValue placeholder="Nenhum secretário cadastrado. Por favor, criar." />
                                            ) : (
                                                <SelectValue placeholder="Escolha o secretário para gerenciar esta célula." />
                                            )}
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {secretary.map(({ nome, id }) => (
                                            <SelectItem
                                                key={id}
                                                id={id.toString()}
                                                value={id.toString()}
                                                disabled={isPending}
                                            >
                                                {nome}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
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
                                        disabled={isPending}
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
                            disabled={isPending}
                        >
                            Criar Célula
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
