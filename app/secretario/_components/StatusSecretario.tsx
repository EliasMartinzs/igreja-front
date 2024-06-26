import { pegarDashboardSecretario } from '@/services/dashboard-secretario';

export const StatusSecretario = async () => {
    const data = await pegarDashboardSecretario();

    return (
        <div className="flex flex-col gap-2">
            <div className="flex w-full gap-2">
                <div className="border rounded-3xl w-[40%] py-4 px-4 hover:border-neutral-200 transition-colors">
                    <p className="text-5xl font-medium mb-1">
                        {data.totalCelulas}
                    </p>
                    <p className="text-sm">Células</p>
                </div>
                <div className="border rounded-3xl flex-1 py-4 px-4 hover:border-neutral-200 transition-colors">
                    <p className="text-5xl font-medium mb-1">
                        {data.totalMembros}
                    </p>
                    <p className="text-sm">Membros Cadastrados</p>
                </div>
            </div>
            <div className="flex w-full">
                <div className="border rounded-3xl flex-1 py-4 px-4 hover:border-neutral-200 transition-colors">
                    <p className="text-5xl font-medium mb-1">
                        {data.totalEncontros}
                    </p>
                    <p className="text-sm">Encontros no ultimo mês</p>
                </div>
            </div>
        </div>
    );
};
