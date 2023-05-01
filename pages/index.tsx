import { NextPageContext } from "next"
import { getSession } from "next-auth/react"

// components
import NavBar from "@/components/NavBar";

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
      <NavBar user={user} />
    </>
  )
}
