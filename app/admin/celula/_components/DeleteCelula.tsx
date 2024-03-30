'use client';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { deleteCelula } from '@/services/celula';
import { toast } from 'react-toastify';

export function DeleteCelula({ id }: { id: number }) {
    const onClick = async () => {
        await deleteCelula(id);

        toast.success('Célula deletada com sucesso!');
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    size="full"
                    variant="default"
                    rounded="full"
                    className="border border-darkRed text-red hover:bg-red hover:text-white hover:border-transparent transition-colors"
                >
                    Deletar Célula
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <div className="space-y-6">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Você tem certeza absoluta de que deseja excluir esta
                            célula?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            <p className="text-white/70">
                                Ao excluir esta célula, todos os dados
                                associados serão permanentemente perdidos e não
                                poderão ser recuperados. Tem certeza de que
                                deseja prosseguir com a exclusão?
                            </p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="flex-1 flex flex-col gap-y-4">
                        <div>
                            <AlertDialogCancel className="w-full">
                                <Button
                                    rounded="full"
                                    className="border flex-1 hover:bg-white/5 transition-colors hover:border-none"
                                >
                                    Cancelar
                                </Button>
                            </AlertDialogCancel>
                        </div>
                        <div>
                            <AlertDialogAction className="w-full">
                                <Button
                                    onClick={onClick}
                                    rounded="full"
                                    className="w-full border border-darkRed text-red hover:bg-red hover:text-white hover:border-transparent transition-colors"
                                >
                                    Deletar Célula
                                </Button>
                            </AlertDialogAction>
                        </div>
                    </AlertDialogFooter>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
}
