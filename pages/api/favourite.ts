import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '@/libs/prismadb';
import serverAuth from "@/libs/serverAuth";
import fetcher from "@/libs/fetcher";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    switch (req.method) {
      case 'POST':
        return await addFavourite(req, res);
      case 'DELETE':
        return await removeFavourite(req, res);
    }
    return res.status(405).end();
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}

async function addFavourite(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { currentUser } = await serverAuth(req, res);

    const { movieId } = req.body;

    const existingMovie = await fetcher(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}`)

    if (!existingMovie) {
      throw new Error('Invalid ID');
    }

    const user = await prismadb.user.update({
      where: {
        email: currentUser.email || '',
      },
      data: {
        favouriteIds: {
          push: movieId.toString()
        }
      }
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }

}

async function removeFavourite(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { currentUser } = await serverAuth(req, res);

    const { movieId } = req.query;

    if (!movieId) {
      res.status(400).json({ error: 'movieId is missing' });
      return;
    }

    const existingMovie = await fetcher(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}`)

    if (!existingMovie) {
      throw new Error('Invalid ID');
    }

    const updatedFavouriteIds = without(currentUser.favouriteIds, movieId);

    const updatedUser = await prismadb.user.update({
      where: {
        email: currentUser.email || '',
      },
      data: {
        favouriteIds: updatedFavouriteIds,
      }
    });

    return res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    return res.status(500).end();
  }

}