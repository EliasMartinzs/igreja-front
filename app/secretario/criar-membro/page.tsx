import { CriarNovoMembroForm } from '@/components/reusable/CriarNovoMembroForm';
import { Wrapper } from '@/components/reusable/Wrapper';

export default function CriarNovoMembro() {
    return (
        <Wrapper>
            {/* TODO: nao esta criando membros atravez do secretario */}
            <CriarNovoMembroForm />
        </Wrapper>
    );
}
