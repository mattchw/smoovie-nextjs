import { NextApiRequest, NextApiResponse } from 'next'

import fetcher from '@/libs/fetcher';
import serverAuth from '@/libs/serverAuth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query, method } = req

    if (method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    // call tmdb api /movie/{movie_id}
    const movie = await fetcher(`https://api.themoviedb.org/3/movie/${query.id}?api_key=${process.env.TMDB_API_KEY}`);

    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}