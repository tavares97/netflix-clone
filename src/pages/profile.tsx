import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import useCurrentUser from "../hooks/useCurrentUser";

const Profile = () => {
  const router = useRouter();
  const { data: user } = useCurrentUser();

  return (
    <div className="h-full flex items-center justify-center flex-col">
      <h1 className="text-3xl md:text-6xl text-white text-center mb-10">
        Who is watching?
      </h1>

      <div
        onClick={() => {
          router.push("/");
        }}
        className="group"
      >
        <Image
          src={user?.image !== "" ? user?.image : "/images/default.png"}
          alt="Profile image"
          width={100}
          height={100}
          className="rounded-md md:w-44 mb-3 group-hover:cursor-pointer group-hover:border-white border-2 border-transparent"
        />

        <p className="text-center text-gray-400 group-hover:text-white">
          {user?.username ? user.username : user.name}
        </p>
      </div>
    </div>
  );
};

/**
 * If the user is not logged in, redirect them to the login page
 * @param context - This is the context object that Next.js provides to getServerSideProps. It contains
 * the request and response objects, as well as the query string parameters.
 * @returns A function that returns an object.
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) return { redirect: { destination: "/auth", permanent: false } };

  return {
    props: {},
  };
};

export default Profile;
