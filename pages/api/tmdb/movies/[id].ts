import { NextApiRequest, NextApiResponse } from 'next'

import fetcher from '@/libs/fetcher';
import serverAuth from '@/libs/serverAuth';
import { TMDBMovie } from '@/types/movie';
import prismadb from '@/libs/prismadb';
import { formatMovie } from '@/utils/movieFormatter';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query, method } = req

    if (method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    // check prismadb for movie 
    const prismaMovie = await prismadb.movie.findFirst({
      where: {
        tmdbId: Number(query.id)
      }
    });

    // call tmdb api /movie/{movie_id}
    const movie: TMDBMovie = await fetcher(`https://api.themoviedb.org/3/movie/${query.id}?api_key=${process.env.TMDB_API_KEY}`);

    if (movie) {
      // get videos
      const videos = await fetcher(`https://api.themoviedb.org/3/movie/${query.id}/videos?api_key=${process.env.TMDB_API_KEY}`);
      movie.videos = videos.results;
    }

    return res.status(200).json(formatMovie(movie, prismaMovie));
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }
}