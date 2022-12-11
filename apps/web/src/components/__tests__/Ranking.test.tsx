// Import the PublicMetricsRanking component and the User interface
import { render, fireEvent } from '@testing-library/react';
import { UserRanking } from 'types/Ranking';
import { Ranking } from '../Ranking';

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

  it("should open the modal when the user clicks on a user's score", () => {
    const { getByText, getByTestId } = render(<Ranking {...mockProps} />);
    fireEvent.click(getByText('Score: 192'));

    expect(getByTestId('modal')).toBeVisible();

    expect(getByTestId('modal-header')).toHaveTextContent("User 1's Metrics");

    expect(getByText('Followers: 100')).toBeVisible();
    expect(getByText('Likes: 50')).toBeVisible();
    expect(getByText('Retweets: 25')).toBeVisible();
    expect(getByText('Tweets: 10')).toBeVisible();
    expect(getByText('Quotes: 5')).toBeVisible();
    expect(getByText('Replies: 2')).toBeVisible();

    fireEvent.click(getByText('Close'));

    expect(getByTestId('modal')).not.toBeVisible();
  });
});
