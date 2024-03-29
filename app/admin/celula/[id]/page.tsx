import CalendarCelula from '../_components/CalendarCelula';

import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { cellsArray } from '@/constants';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { TopHeader } from '../../_components/TopHeader';
import Link from 'next/link';

export default function Celula({ params }: { params: { id: number } }) {
    const cel = cellsArray.filter((cel) => cel.id === +params.id);

    return (
        <div className="m-6 lg:max-w-6xl lg:mx-auto">
            {cel.map(({ id, membros, nome_celula, secretario }) => (
                <div key={id} className="space-y-10">
                    <TopHeader message={nome_celula} href={'/admin'} />

                    <div>
                        <h4 className="font-semibold text-lg">
                            Secretario(a): {secretario}
                        </h4>
                    </div>

                    <CalendarCelula />

                    <div>
                        <Label className="font-semibold text-lg">
                            Observações
                            <Textarea
                                className="border w-full bg-neutral-950/70 rounded-lg py-3 outline-none focus:bg-neutral-900 placeholder:text-sm disabled:bg-transparent disabled:border-neutral-950/70 duration-150 ease-in transition-all"
                                rows={8}
                                placeholder="Observações"
                            />
                        </Label>
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
                        <Link
                            href={`/admin/criar-membro/${id}`}
                            className="w-full"
                        >
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
                </div>
            ))}
        </div>
    );
}
