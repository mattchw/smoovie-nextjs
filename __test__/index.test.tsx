import { render } from '@testing-library/react'
import Home from '@/pages/index'

import useTrending from '@/hooks/useTrending';
import useFavourites from '@/hooks/useFavourites';
import useCurrentUser from '@/hooks/useCurrentUser';

jest.mock('@/hooks/useTrending');
jest.mock('@/hooks/useFavourites');
jest.mock('@/hooks/useCurrentUser');

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Home', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', async () => {
    const mockTrending = {
      results: [{ "adult": false, "backdrop_path": "/aAgGrfBwna1nO4M2USxwFgK5O0t.jpg", "genre_ids": [27, 53, 14], "id": 713704, "original_language": "en", "original_title": "Evil Dead Rise", "overview": "Three siblings find an ancient vinyl that gives birth to bloodthirsty demons that run amok in a Los Angeles apartment building and thrusts them into a primal battle for survival as they face the most nightmarish version of family imaginable.", "popularity": 6246.713, "poster_path": "/5ik4ATKmNtmJU6AYD0bLm56BCVM.jpg", "release_date": "2023-04-12", "title": "Evil Dead Rise", "video": false, "vote_average": 7.2, "vote_count": 955 }, { "adult": false, "backdrop_path": "/nLBRD7UPR6GjmWQp6ASAfCTaWKX.jpg", "genre_ids": [16, 10751, 12, 14, 35], "id": 502356, "original_language": "en", "original_title": "The Super Mario Bros. Movie", "overview": "While working underground to fix a water main, Brooklyn plumbers—and brothers—Mario and Luigi are transported down a mysterious pipe and wander into a magical new world. But when the brothers are separated, Mario embarks on an epic quest to find Luigi.", "popularity": 3339.399, "poster_path": "/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg", "release_date": "2023-04-05", "title": "The Super Mario Bros. Movie", "video": false, "vote_average": 7.5, "vote_count": 2082 }]
    };
    const mockFavourites = [{ id: 3, name: 'item3', genre_ids: [1, 2, 3] }];
    const mockUser = { id: 1, name: 'user1' };

    (useTrending as jest.Mock).mockReturnValue({ data: mockTrending });
    (useFavourites as jest.Mock).mockReturnValue({ data: mockFavourites });
    (useCurrentUser as jest.Mock).mockReturnValue({ data: mockUser });

    const { getByText } = render(<Home />);

    expect(getByText('Trending Now')).toBeInTheDocument();
    expect(getByText('My Favourites')).toBeInTheDocument();
  });
})