import { getSecretary } from '@/services/secretary';
import CriarNovaCelulaForm from './_components/CriarCelulaForm';

export default async function CreateCelula() {
    const secretary = await getSecretary();

    return <CriarNovaCelulaForm secretary={secretary} />;
}
