import useSwr from 'swr'
import fetcher from '@/libs/fetcher';
import { Movie } from '@/types/movie';

const useMovie = (id?: string) => {
  const { data, error, isLoading } = useSwr<Movie>(id ? `/api/tmdb/movies/${id}` : null, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
  return {
    data,
    error,
    isLoading
  }
};

export default useMovie;