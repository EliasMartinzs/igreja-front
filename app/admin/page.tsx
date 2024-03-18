import { Header } from "./_components/Header";
import { Status } from "./_components/Status";
import { TabsAdm } from "./_components/TabsAdm";

export default function Admin() {
  return (
    <main className="mx-6 space-y-6">
      <Header />
      <h2 className="font-semibold text-2xl">Bem Vindo, Antonio!</h2>
      <Status />
      <TabsAdm />
    </main>
  );
}
