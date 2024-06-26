import { Header } from '../../components/reusable/Header';
import { StatusAdmin } from './_components/StatusAdmin';
import { TabsAdm } from './_components/TabsAdm';

export default function Admin() {
    return (
        <main className="m-4 lg:max-w-6xl lg:mx-auto flex flex-col gap-4">
            <Header cargo="Admin" />
            <h2 className="font-regular text-2xl">Bem Vindo, Antonio!</h2>
            <StatusAdmin />
            <TabsAdm />
        </main>
    );
}
