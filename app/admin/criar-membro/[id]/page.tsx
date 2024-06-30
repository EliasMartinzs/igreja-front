import { CriarNovoMembroForm } from '@/components/reusable/CriarNovoMembroForm';
import { pegarCelulas } from '@/services/celula';
import { Wrapper } from '@/components/reusable/Wrapper';

export default async function CreateNewMember({
    params,
}: {
    params: { id: string };
}) {
    const celulas = await pegarCelulas();

    return (
        <Wrapper>
            <CriarNovoMembroForm celulas={celulas} id={params.id} />
        </Wrapper>
    );
}
