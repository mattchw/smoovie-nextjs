import { NextPageContext } from "next"
import { getSession, signOut } from "next-auth/react"

import useCurrentUser from "@/hooks/useCurrentUser";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: user } = useCurrentUser();

  return (
    <>
      <h1 className="text-4xl font-bold text-center">Hello World</h1>
      <p className="text-white text-center">Welcome {user?.username} ({user?.email})</p>
      <button
        onClick={() => signOut()}
        className="h-10 w-full bg-white"
      >
        Sign Out
      </button>
    </>
  )
}
