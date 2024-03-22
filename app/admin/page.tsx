import { Header } from './_components/Header';
import { Status } from './_components/Status';
import { TabsAdm } from './_components/TabsAdm';

export default function Admin() {
    return (
        <main className="m-4 lg:max-w-6xl lg:mx-auto flex flex-col gap-4">
            <Header />
            <h2 className="font-regular text-2xl">Bem Vindo, Antonio!</h2>
            <Status />
            <TabsAdm />
        </main>
    );
}
