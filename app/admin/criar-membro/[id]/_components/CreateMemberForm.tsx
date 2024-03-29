'use client';

import { z } from 'zod';
import { TopHeader } from '../../../_components/TopHeader';
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

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

import { InputMask } from '@react-input/mask';
import { ChangeEvent, useRef, useState, useTransition } from 'react';
import { cn } from '@/lib/utils';
import { CalendarIcon } from '@radix-ui/react-icons';
import { ptBR } from 'date-fns/locale';
import { api } from '@/services/api';
import { FiCheckCircle } from 'react-icons/fi';
import { CelulasResponse, getCelulas } from '@/services/celula';
import { Spinner } from '@/components/reusable/Spinner';
import { useToast } from '@/components/ui/use-toast';
import { revalidatePath } from 'next/cache';
import { createMember } from '@/services/members';

type createValidation = z.infer<typeof createNewMemberSchema>;

interface ICreateMemberForm {
    id: string;
    celulas: CelulasResponse | undefined;
}

export default function CreateMemberForm(props: ICreateMemberForm) {
    const { id, celulas } = props;

    const [files, setFiles] = useState<File[]>([]);
    const [selectedFileName, setSelectedFileName] = useState<string>('');
    const [error, setError] = useState('');
    const { toast } = useToast();
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
            cell: id || '',
        },
    });

    const [isPending, startTransition] = useTransition();

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

    async function onSubmit(data: createValidation) {
        startTransition(async () => {
            await createMember(data);

            toast({
                title: 'Membro criado com sucesso',
            });
        });
    }

    return (
        <div className="m-6 space-y-6 lg:max-w-6xl lg:mx-auto">
            <TopHeader
                message="Cadastrar novo Membro"
                href={id === 'undefined' ? '/admin' : `/admin/celula/${id}`}
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
                                <FormLabel className="mb-1">
                                    Nascimento
                                </FormLabel>
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

                    {id === 'undefined' && (
                        <FormField
                            control={form.control}
                            name="cell"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Célula</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        disabled={isPending}
                                    >
                                        <SelectTrigger className="rounded-full p-3">
                                            <SelectValue placeholder="Selecione a célula do membro" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    {celulas === undefined &&
                                                        'Nenhuma célula encontrada!'}
                                                </SelectLabel>
                                                {celulas !== undefined &&
                                                    celulas.map(
                                                        ({
                                                            id,
                                                            nome_celula,
                                                        }) => (
                                                            <SelectItem
                                                                key={id.toString()}
                                                                value={id.toString()}
                                                            >
                                                                {nome_celula}
                                                            </SelectItem>
                                                        ),
                                                    )}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    )}

                    <FormField
                        control={form.control}
                        name="img"
                        render={({ field }) => (
                            <div className="w-full">
                                <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer">
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
                            className={cn(
                                'p-7 bg-darkRed font-semibold text-lg hover:bg-darkRed/70 transition-colors',
                                isPending && 'bg-opacity-70',
                            )}
                            rounded="full"
                            size="full"
                            type="submit"
                        >
                            {isPending ? <Spinner /> : 'Criar membro'}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
}
