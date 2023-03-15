import Billboard from "@/components/Billboard";
import Navbar from "@/components/Navbar";
import { GetServerSideProps } from "next";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "../hooks/useCurrentUser";

export default function Home() {
  const { data: user } = useCurrentUser();

  return (
    <>
      <Navbar />
      <Billboard />
    </>
  );
}

/**
 * If the user is not logged in, redirect them to the login page
 * @param context - This is the context object that Next.js provides to getServerSideProps. It contains
 * the request and response objects, as well as the query string parameters.
 * @returns an object with a property called props.
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) return { redirect: { destination: "/auth", permanent: false } };

  return {
    props: {},
  };
};
