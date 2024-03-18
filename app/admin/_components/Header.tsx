import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Header() {
  return (
    <header className="w-full mt-8 center px-2 relative mb-10">
      <Avatar className="absolute left-0 max-lg:ml-6">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <h4 className="text-center text-lg">Admin</h4>
    </header>
  );
}
