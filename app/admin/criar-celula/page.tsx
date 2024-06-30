import { getSecretary } from '@/services/secretary';
import CriarNovaCelulaForm from './_components/CriarCelulaForm';
import { Wrapper } from '@/components/reusable/Wrapper';

export default async function CreateCelula() {
    const secretary = await getSecretary();

    return (
        <Wrapper>
            <CriarNovaCelulaForm secretary={secretary} />
        </Wrapper>
    );
}
