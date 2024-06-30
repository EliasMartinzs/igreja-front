import CalendarCelula from '../_components/CalendarioCelula';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

import { Button } from '@/components/ui/button';
import { TopHeader } from '../../_components/TopHeader';
import Link from 'next/link';
import { getCelulaById } from '@/services/celula';
import { DeletarCelula } from '../_components/DeletarCelula';
import { pegarMembros } from '@/services/membros';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AuthContext } from '@/contexts/AuthContext';

export default async function Celula({ params }: { params: { id: number } }) {
    const { nome_celula, id, secretarioId } = await getCelulaById(params.id);
    const membros = await pegarMembros();

    return (
        <div className="m-6 lg:max-w-6xl lg:mx-auto">
            <div key={id} className="space-y-10">
                <TopHeader message={nome_celula ?? ''} href={'/admin'} />

                <div>
                    <h4 className="font-semibold text-lg">
                        Secretario(a): {secretarioId}
                    </h4>
                </div>

                <CalendarCelula />

                <div>
                    <small className="font-semibold">
                        Observações
                        <Textarea
                            className="border w-full bg-neutral-950/70 rounded-lg py-3 outline-none focus:bg-neutral-900 placeholder:text-sm disabled:bg-transparent disabled:border-neutral-950/70 duration-150 ease-in transition-all mt-2"
                            rows={8}
                            placeholder="Observações"
                        />
                    </small>
                </div>

                <div>
                    <h4 className="font-semibold text-lg">Membros</h4>

                    <div className="space-y-5">
                        {membros.map(({ nome }) => (
                            <div
                                key={nome}
                                className="py-2 px-1 border flex items-center gap-x-3 rounded-lg mt-3"
                            >
                                <Avatar className="">
                                    <AvatarImage
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p>{nome}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h4 className="font-semibold text-lg">Visitante</h4>

                    <div className="space-y-5">
                        {membros.map(({ nome }) => (
                            <div
                                key={nome}
                                className="py-2 px-1 border flex items-center gap-x-3 rounded-lg mt-3"
                            >
                                <Avatar className="">
                                    <AvatarImage
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <p>{nome}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex-1 flex items-center gap-x-3">
                    <Link href={`/admin/criar-membro/${id}`} className="w-full">
                        <Button
                            className="py-7 text-lg border hover:bg-darkRed transition-colors hover:border-none"
                            rounded="full"
                            size="full"
                        >
                            Criar Membro
                        </Button>
                    </Link>
                    <Button
                        className="py-7 text-lg bg-darkRed hover:bg-transparent hover:border transition-colors"
                        rounded="full"
                        size="full"
                    >
                        Salvar
                    </Button>
                </div>

                <DeletarCelula id={Number(id) ?? ''} />
            </div>
        </div>
    );
}
