import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

interface ITopHeader {
  message: string;
}

export function TopHeader(props: ITopHeader) {
  const { message } = props;
  return (
    <div className="mt-8 text-center center">
      <Link href="/admin">
        <FaArrowLeft className="text-2xl" />
      </Link>
      <div className="flex-1">
        <h4 className="text-lg">{message}</h4>
      </div>
    </div>
  );
}
