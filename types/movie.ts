export interface Movie {
  id?: string;
  tmdbId: number;
  description?: string;
  image?: string;
  videoPath?: string
  thumbnail?: string;
  duration?: string;
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: TMDBGenre[];
  homepage: string;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  revenue: number;
  runtime?: number;
  status: string;
  tagline?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos?: TMDBVideo[];
}

export interface TMDBMovie {
  id: number;
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: any;
  budget: number;
  genres: TMDBGenre[];
  homepage: string;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  revenue: number;
  runtime?: number;
  status: string;
  tagline?: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  videos?: TMDBVideo[];
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBVideo {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
}