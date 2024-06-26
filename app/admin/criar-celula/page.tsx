import { getSecretary } from '@/services/secretary';
import CriarCelulaForm from './_components/CriarCelulaForm';

export default async function CreateCelula() {
    const secretary = await getSecretary();

    return <CriarCelulaForm secretary={secretary} />;
}
