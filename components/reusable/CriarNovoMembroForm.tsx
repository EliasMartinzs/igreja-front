'use client';

import { z } from 'zod';
import { TopHeader } from '../../app/admin/_components/TopHeader';
import { criarNovoMembroSchema } from '@/lib/validations';
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
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';

import { InputMask } from '@react-input/mask';
import { ChangeEvent, useRef, useState, useTransition } from 'react';
import { cn } from '@/lib/utils';

import { FiCheckCircle } from 'react-icons/fi';
import { Spinner } from '@/components/reusable/Spinner';

import { criarNovoMembro } from '@/services/membros';
import { navigate } from '@/services/navigate';
import { toast } from 'react-toastify';
import { GetCelulasResponse } from '@/lib/types';

type createValidation = z.infer<typeof criarNovoMembroSchema>;

type Props = {
    id?: string;
    celulas?: GetCelulasResponse[];
};

export function CriarNovoMembroForm(props: Props) {
    const { celulas, id } = props;

    const [files, setFiles] = useState<File[]>([]);
    const [selectedFileName, setSelectedFileName] = useState<string>('');

    const form = useForm<createValidation>({
        resolver: zodResolver(criarNovoMembroSchema),
        defaultValues: {
            cristao: undefined,
            descubra: undefined,
            imagem: '',
            nome: '',
            novoConvertido: undefined,
            telefone: '',
            lideresEscolares: undefined,
            dataAniversario: undefined,
            sexo: undefined,
            celulaId: '',
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
            await criarNovoMembro(data);
            navigate('/admin');
            toast.success(`Membro ${data.nome} criado com sucesso!`);
            form.reset();
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
                        name="nome"
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
                        name="telefone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Número</FormLabel>
                                <FormControl>
                                    <InputMask
                                        mask="(__) _____-____"
                                        replacement={{ _: /\d/ }}
                                        {...field}
                                        className="input-mask"
                                        placeholder="(00) 00000-0000"
                                        disabled={isPending}
                                    />
                                </FormControl>
                                <FormMessage />
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
                                        required
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
                        name="dataAniversario"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                                <FormLabel className="mb-1">
                                    Nascimento
                                </FormLabel>
                                <InputMask
                                    mask="dd/mm/yyyy"
                                    replacement={{ d: /\d/, m: /\d/, y: /\d/ }}
                                    showMask
                                    separate
                                    value={field.value}
                                    onChange={field.onChange}
                                    placeholder="dd/mm/aaaa"
                                    className="input-mask"
                                    type="text"
                                />

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cristao"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>É Cristão?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        className="flex w-full"
                                        required
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="novoConvertido"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Novo Convertido?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        className="flex w-full"
                                        required
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
                                        required
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
                        name="lideresEscolares"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>É da escola de lideres?</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        className="flex w-full"
                                        required
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
                            name="celulaId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Célula</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        required
                                        disabled={isPending}
                                    >
                                        <SelectTrigger className="rounded-full p-3">
                                            <SelectValue placeholder="Selecione a célula do membro" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>
                                                    {celulas === undefined ||
                                                        (celulas.length === 0 &&
                                                            'Nenhuma célula encontrada!')}
                                                </SelectLabel>
                                                {Array.isArray(celulas) &&
                                                    celulas !== undefined &&
                                                    celulas.map(
                                                        ({
                                                            nome_celula,
                                                            id,
                                                        }) => (
                                                            <SelectItem
                                                                key={id}
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
                        name="imagem"
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
                            className={cn(
                                'bg-darkRed font-semibold hover:bg-darkRed/70 transition-colors',
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

//     name: z.string(),
// });
// type FormValidation = z.infer<typeof formSchema>;

// export const CriarNovoMembroForm = ({ id, celulas }: Props) => {
//     const form = useForm<FormValidation>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {},
//     });

//     function onSubmit(data: FormValidation) {
//         console.log(data);
//     }

//     return (
//         <div className="m-6 space-y-6 lg:max-w-6xl lg:mx-auto">
//             <TopHeader
//                 message="Cadastrar novo Membro"
//                 href={id === 'undefined' ? '/admin' : `/admin/celula/${id}`}
//             />

//             <Form {...form}>
//                 <form
//                     onSubmit={form.handleSubmit(onSubmit)}
//                     className="space-y-8"
//                 >
//                     <FormField
//                         control={form.control}
//                         name="name"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <small>Username</small>
//                                 <FormControl>
//                                     <input
//                                         placeholder="Jonh doe"
//                                         className="input-mask"
//                                         {...field}
//                                     />
//                                 </FormControl>

//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />
//                     <Button type="submit">Submit</Button>
//                 </form>
//             </Form>
//         </div>
//     );
// };
