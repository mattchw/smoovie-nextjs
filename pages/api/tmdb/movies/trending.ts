import { NextApiRequest, NextApiResponse } from 'next'

import fetcher from '@/libs/fetcher';
import { getSession } from 'next-auth/react';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const session = await getSession({ req });

    const query = req.query;

    if (!session?.user?.email) {
      return res.status(401).end();
    }

    // call tmdb api /movie/now_playing
    const trendingMovies = await fetcher(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.TMDB_API_KEY}`);

    return res.status(200).json(trendingMovies);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}