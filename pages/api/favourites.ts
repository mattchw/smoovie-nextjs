import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";
import fetcher from "@/libs/fetcher";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { method } = req
    if (method !== 'GET') {
      return res.status(405).end();
    }

    const { currentUser } = await serverAuth(req, res);

    const favouriteIds = [...new Set(currentUser?.favouriteIds ?? [])] as string[];

    const favouritedMovies = await Promise.all(favouriteIds.map(async (movieId: string) => {
      const existingMovie = await fetcher(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}`)
      existingMovie.genre_ids = existingMovie.genres.map((genre: any) => genre.id);
      return existingMovie;
    }));

    return res.status(200).json(favouritedMovies);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}