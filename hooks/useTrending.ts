import useSWR from 'swr';

import fetcher from '@/libs/fetcher';

const useTrending = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/tmdb/movies/trending', fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  }
};

export default useTrending;