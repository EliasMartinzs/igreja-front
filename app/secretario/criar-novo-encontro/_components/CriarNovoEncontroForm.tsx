'use client';

import { TopHeader } from '@/app/admin/_components/TopHeader';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Logo from '@/public/images/logo_color_01_variacao.png';

const formSchema = z.object({
    data: z.date({
        required_error: 'Por favor selecione uma data',
    }),
    observaoes: z.string().optional(),
});

type CriarValidacao = z.infer<typeof formSchema>;

const fakeMembros = [
    {
        img: '/public/images/logo_color_01_variacao.png',
        nome: 'teste teste',
        celula: 'celula',
    },
    {
        img: '/public/images/logo_color_01_variacao.png',
        nome: 'teste teste',
        celula: 'celula',
    },
    {
        img: '/public/images/logo_color_01_variacao.png',
        nome: 'teste teste',
        celula: 'celula',
    },
];

export const CriarNovoEncontroForm = () => {
    const form = useForm<CriarValidacao>({
        resolver: zodResolver(formSchema),
    });

    const onSubmit = (values: CriarValidacao) => {
        console.log(values);
    };

    return (
        <div className="m-6 space-y-6 lg:max-w-6xl lg:mx-auto">
            <TopHeader message="Cadastrar novo Membro" href="/secretario" />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <FormField
                        control={form.control}
                        name="data"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-center">
                                <FormControl>
                                    <Calendar
                                        mode="single"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        locale={ptBR}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="observaoes"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-center">
                                <FormControl>
                                    <input
                                        {...field}
                                        placeholder="Insira o Endereço"
                                        className="input-mask"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div className="space-y-3">
                        <h4 className="font-medium">Membros</h4>

                        <div className="space-y-5">
                            {fakeMembros.map(({ celula, nome }, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-start gap-3 border rounded-lg p-2"
                                >
                                    <Image
                                        src={Logo}
                                        alt={nome}
                                        width={48}
                                        height={48}
                                    />

                                    <div>
                                        <p>{nome}</p>
                                        <p className="text-muted-foreground">
                                            {celula}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h4 className="font-medium">Visitantes</h4>

                        <div className="space-y-5">
                            {fakeMembros.map(({ celula, nome }, i) => (
                                <div
                                    key={i}
                                    className="flex items-center justify-start gap-3 border rounded-lg p-2"
                                >
                                    <Image
                                        src={Logo}
                                        alt={nome}
                                        width={48}
                                        height={48}
                                    />

                                    <div>
                                        <p>{nome}</p>
                                        <p className="text-muted-foreground">
                                            {celula}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Button size="full" rounded="full" variant="destructive">
                        Criar encontro
                    </Button>
                </form>
            </Form>
        </div>
    );
};
