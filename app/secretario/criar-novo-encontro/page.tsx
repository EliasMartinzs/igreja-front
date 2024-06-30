import { CriarNovoEncontroForm } from './_components/CriarNovoEncontroForm';
import { pegarCelulas } from '@/services/celula';
import { pegarMembros } from '@/services/membros';
import { Wrapper } from '@/components/reusable/Wrapper';

export default async function CriarNovoEncontro() {
    const celulas = await pegarCelulas();
    const membros = await pegarMembros();

    return (
        <Wrapper>
            <CriarNovoEncontroForm celulas={celulas} membros={membros} />
        </Wrapper>
    );
}
