import { Wrapper } from '@/components/reusable/Wrapper';
import { Header } from '../../components/reusable/Header';
import { StatusAdmin } from './_components/StatusAdmin';
import { TabsAdm } from './_components/TabsAdm';
import { NomeUsuario } from '@/components/reusable/NomeUsuario';

export default function Admin() {
    return (
        <Wrapper className="flex flex-col gap-y-5">
            <Header cargo="Admin" />
            <NomeUsuario />
            <StatusAdmin />
            <TabsAdm />
        </Wrapper>
    );
}
