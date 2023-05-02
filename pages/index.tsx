import { useEffect, useState } from "react";
import { NextPageContext } from "next"
import { getSession } from "next-auth/react"

// components
import NavBar from "@/components/NavBar";
import Banner from "@/components/Banner";
import ItemList from "@/components/ItemList";

import useCurrentUser from "@/hooks/useCurrentUser";
import useTrending from "@/hooks/useTrending";
import useFavourites from "@/hooks/useFavourites";

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
  const [trendingItem, setTrendingItem] = useState({} as any);
  const { data: trending = [] } = useTrending();
  const { data: favourites = [] } = useFavourites();

  useEffect(() => {
    if (trending?.results?.length > 0) {
      setTrendingItem(trending?.results[Math.floor(Math.random() * trending?.results.length - 1)]);
    }
  }, [trending]);

  const { data: user } = useCurrentUser();

  return (
    <>
      <NavBar user={user} />
      <Banner item={trendingItem} />
      <ItemList title="Trending Now" items={trending?.results} />
      {favourites?.length && <ItemList title="My Favourites" items={favourites} />}
    </>
  )
}
