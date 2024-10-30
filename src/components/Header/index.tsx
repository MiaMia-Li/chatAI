import Image from "next/image";
import UserMenu from "../user-menu";
import Link from "next/link";
import ThemeButton from "./ThemeButton";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import UserLogin from "../user-login";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="w-full h-16 border-b border-gray-200 px-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/pengiun-logo.png" alt="Logo" width={200} height={60} />
      </Link>

      <div className="flex items-center gap-4">
        <ThemeButton />
        {!session?.user.id ? <UserLogin /> : <UserMenu />}
      </div>
    </header>
  );
};

export default Header;
