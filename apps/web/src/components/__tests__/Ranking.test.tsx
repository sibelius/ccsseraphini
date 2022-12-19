import { render } from '@testing-library/react';
import { UserRanking } from 'types/Ranking';
import { Ranking } from '../ranking/Ranking';

interface PublicMetricsRankingProps {
  users: UserRanking[];
}

const mockProps: PublicMetricsRankingProps = {
  users: [
    {
      _id: '1',
      name: 'User 1',
      username: 'user1',
      profileImageUrl: 'https://example.com/user1.jpg',
      likes: 50,
      retweets: 25,
      tweets: 10,
      quotes: 5,
      replies: 2,
      score: 192,
      lastTweetRanked: new Date('2021-08-01T00:00:00.000Z'),
    },
    {
      _id: '2',
      name: 'User 2',
      username: 'user2',
      profileImageUrl: 'https://example.com/user2.jpg',
      likes: 40,
      retweets: 20,
      tweets: 8,
      quotes: 4,
      replies: 1,
      score: 138,
      lastTweetRanked: new Date('2021-08-01T00:00:00.000Z'),
    },
  ],
};

describe('PublicMetricsRanking', () => {
  it('should render the top 100 users with the "cc @sseraphini" tag', () => {
    const { getAllByTestId } = render(<Ranking {...mockProps} />);

    expect(getAllByTestId('user-card').length).toBe(mockProps.users.length);
  });
});
