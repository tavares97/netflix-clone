import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

interface AccountMenuProps {
  visible?: boolean;
  user: any;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible, user }) => {
  const router = useRouter();

  if (!visible) return null;

  return (
    <div className="absolute top-14 right-0 py-3 bg-black/80 rounded-md border border-zinc-800 w-56">
      <div
        className="flex group gap-3 px-3"
        onClick={() => router.push("/profile")}
      >
        <Image
          src={user?.image !== "" ? user?.image : "/images/default.png"}
          alt="profile image"
          width={20}
          height={20}
          className="rounded-md group-hover:border group-hover:border-white"
        />
        <p className="text-white text-sm group-hover:text-gray-300">
          {user?.username ? user.username : user.name}
        </p>
      </div>
      <hr className="bg-gray-500 border-0 h-px my-4" />

      <p
        className="text-white text-sm text-center hover:underline"
        onClick={() => signOut()}
      >
        Sign out
      </p>
    </div>
  );
};

export default AccountMenu;
