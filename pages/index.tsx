import { useEffect, useState } from "react";
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"

// components
import NavBar from "@/components/NavBar";
import Banner from "@/components/Banner";
import ItemList from "@/components/ItemList";

import useCurrentUser from "@/hooks/useCurrentUser";
import useTrending from "@/hooks/useTrending";

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
  const [trandingItem, setTrandingItem] = useState({} as any);
  const { data } = useTrending();

  useEffect(() => {
    setTrandingItem(data?.results[Math.floor(Math.random() * data?.results.length - 1)]);
  }, [data]);

  const { data: user } = useCurrentUser();

  return (
    <>
      <NavBar user={user} />
      <Banner item={trandingItem} />
      <ItemList title="Trending Now" items={data?.results} />
    </>
  )
}
