import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

interface ITopHeader {
    message: string;
    href: string;
}

export function TopHeader(props: ITopHeader) {
    const { message, href } = props;
    return (
        <div className="mt-8 text-center center">
            <Link href={href}>
                <FaArrowLeft className="size-4" />
            </Link>
            <div className="flex-1">
                <small>{message}</small>
            </div>
        </div>
    );
}
