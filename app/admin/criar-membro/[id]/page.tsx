'use client';

import { z } from 'zod';
import { TopHeader } from '../../_components/TopHeader';
import { createNewMemberSchema } from '@/lib/validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    Form,
    FormControl,
    FormField,
    FormLabel,
    FormMessage,
    FormItem,
} from '@/components/ui/form';

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

import { InputMask } from '@react-input/mask';
import { useTransition } from 'react';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { ptBR } from 'date-fns/locale';
import { api } from '@/services/api';

type createValidation = z.infer<typeof createNewMemberSchema>;

export default function CriarNovoMembro({
    params,
}: {
    params: { id: string };
}) {
    const form = useForm<createValidation>({
        resolver: zodResolver(createNewMemberSchema),
        defaultValues: {
            christian: undefined,
            descubra: undefined,
            img: '',
            name: '',
            newConvert: undefined,
            phone: undefined,
            schoolLeaders: undefined,
            birthday: undefined,
            sexo: undefined,
            cell: '', // se o admin vier atravez de uma celula pronto pegar o nome da celula e passar aqui para validacao e o input vai ficar invisiviel, se o admin vier pelo atalho o input ficara visivel para escolha da celula e passala aqui para validacao, e trocar o input para um select de unica escolha
        },
    });

    // animacao do input ao realizao requisicao
    const [isPending, startTransition] = useTransition();

    async function onSubmit(data: createValidation) {
        const parsedData = createNewMemberSchema.safeParse(data);

        if (parsedData.success) {
            const {
                birthday,
                christian,
                descubra,
                img,
                name,
                newConvert,
                phone,
                schoolLeaders,
                sexo,
            } = data;
            try {
                await api.post('/membros', {
                    nome: name,
                    telefone: phone,
                    sexo: sexo,
                    data_nascimento: birthday,
                    cristao: christian,
                    novo_convertido: newConvert,
                    descubra: descubra,
                    escola_de_lideres: schoolLeaders,
                    foto: img,
                });
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="m-6 space-y-6 lg:max-w-6xl lg:mx-auto">
            <TopHeader
                message="Cadastrar novo Membro"
                href={
                    params.id === 'undefined'
                        ? '/admin'
                        : `/admin/celula/${params.id}`
                }
            />

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
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
                                        placeholder="Insira o nome completo do membro"
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
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Número</FormLabel>
                                <InputMask
                                    mask="(__) _____-____"
                                    replacement={{ _: /\d/ }}
                                    {...field}
                                    className="input-mask"
                                    placeholder="(00) 00000-0000"
                                    disabled={isPending}
                                />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="sexo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sexo</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        className="flex w-full"
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        disabled={isPending}
                                    >
                                        <div className="flex items-center space-x-2 w-48">
                                            <RadioGroupItem value="Masculino" />
                                            <Label htmlFor="r1">
                                                Masculino
                                            </Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="Feminino" />
                                            <Label htmlFor="r2">Feminino</Label>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="birthday"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel>Nascimento</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                                className={cn(
                                                    'border rounded-full py-6 bg-neutral-950/70',
                                                    !field.value && '',
                                                )}
                                            >
                                                {field.value ? (
                                                    format(
                                                        field.value,
                                                        'dd/MM/yyyy',
                                                    )
                                                ) : (
                                                    <span className="bg-transparent">
                                                        Escolha uma data
                                                    </span>
                                                )}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent
                                        className="w-auto p-0"
                                        align="start"
                                    >
                                        <Calendar
                                            mode="single"
                                            locale={ptBR}
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() ||
                                                date < new Date('1900-01-01')
                                            }
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="christian"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>É Cristão?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        className="flex w-full"
                                        disabled={isPending}
                                        onValueChange={(value) =>
                                            field.onChange(
                                                value === 'true' ? true : false,
                                            )
                                        }
                                        value={
                                            field.value === undefined
                                                ? undefined
                                                : field.value
                                                  ? 'true'
                                                  : 'false'
                                        }
                                    >
                                        <div className="flex items-center space-x-2 w-48">
                                            <RadioGroupItem value="true" />
                                            <Label htmlFor="r1">Sim</Label>
                                        </div>
                                        <div className="flex items-centerspace-x-2">
                                            <RadioGroupItem value="false" />
                                            <Label htmlFor="r2">Não</Label>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="newConvert"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Novo Convertido?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        className="flex w-full"
                                        disabled={isPending}
                                        onValueChange={(value) =>
                                            field.onChange(
                                                value === 'true' ? true : false,
                                            )
                                        }
                                        value={
                                            field.value === undefined
                                                ? undefined
                                                : field.value
                                                  ? 'true'
                                                  : 'false'
                                        }
                                    >
                                        <div className="flex items-center space-x-2 w-48">
                                            <RadioGroupItem value="true" />
                                            <Label htmlFor="r1">Sim</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="false" />
                                            <Label htmlFor="r2">Não</Label>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="descubra"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Já fez o descubra?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        className="flex w-full"
                                        disabled={isPending}
                                        onValueChange={(value) =>
                                            field.onChange(
                                                value === 'true' ? true : false,
                                            )
                                        }
                                        value={
                                            field.value === undefined
                                                ? undefined
                                                : field.value
                                                  ? 'true'
                                                  : 'false'
                                        }
                                    >
                                        <div className="flex items-center space-x-2 w-48">
                                            <RadioGroupItem value="true" />
                                            <Label htmlFor="r1">Sim</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="false" />
                                            <Label htmlFor="r2">Não</Label>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="schoolLeaders"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>É da escola de lideres?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        className="flex w-full"
                                        disabled={isPending}
                                        onValueChange={(value) =>
                                            field.onChange(
                                                value === 'true' ? true : false,
                                            )
                                        }
                                        value={
                                            field.value === undefined
                                                ? undefined
                                                : field.value
                                                  ? 'true'
                                                  : 'false'
                                        }
                                    >
                                        <div className="flex items-center space-x-2 w-48">
                                            <RadioGroupItem value="true" />
                                            <Label htmlFor="r1">Sim</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="false" />
                                            <Label htmlFor="r2">Não</Label>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage></FormMessage>
                            </FormItem>
                        )}
                    />

                    {params.id === 'undefined' && (
                        <FormField
                            control={form.control}
                            name="cell"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Célula</FormLabel>
                                    <FormControl>
                                        <input
                                            placeholder="Célula deste membro!"
                                            className={cn(
                                                'input-mask disabled:bg-transparent disabled:border-muted',
                                            )}
                                            {...field}
                                            disabled={isPending}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="img"
                        render={({ field }) => (
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer">
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
                                                Clique para carregar
                                            </span>
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            SVG, PNG, JPG or GIF (MAX.
                                            800x400px)
                                        </p>
                                    </div>
                                    <input
                                        type="file"
                                        className="hidden"
                                        {...field}
                                        disabled={isPending}
                                    />
                                    <FormMessage />
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
                            Criar Membro
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
