import { Movie, TMDBMovie } from "@/types/movie";
import { Movie as PrismaMovie } from '@prisma/client';

export function formatMovie(tmdbMovie: TMDBMovie, movie: PrismaMovie | null): Movie {
  return {
    id: movie?.id,
    tmdbId: tmdbMovie.id,
    description: movie?.description || "",
    image: movie?.image || "",
    videoPath: movie?.video || "",
    thumbnail: movie?.thumbnail || "",
    duration: movie?.duration || "",
    adult: tmdbMovie.adult,
    backdrop_path: tmdbMovie.backdrop_path,
    belongs_to_collection: tmdbMovie.belongs_to_collection,
    budget: tmdbMovie.budget,
    genres: tmdbMovie.genres,
    homepage: tmdbMovie.homepage,
    imdb_id: tmdbMovie.imdb_id,
    original_language: tmdbMovie.original_language,
    original_title: tmdbMovie.original_title,
    overview: tmdbMovie.overview,
    popularity: tmdbMovie.popularity,
    poster_path: tmdbMovie.poster_path,
    release_date: tmdbMovie.release_date,
    revenue: tmdbMovie.revenue,
    runtime: tmdbMovie.runtime,
    status: tmdbMovie.status,
    tagline: tmdbMovie.tagline,
    title: tmdbMovie.title,
    video: tmdbMovie.video,
    vote_average: tmdbMovie.vote_average,
    vote_count: tmdbMovie.vote_count,
  }
}