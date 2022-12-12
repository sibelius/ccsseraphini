import postTweetRanking from '../postTweetRanking';
import createPostFromRankedTweets from '../createPostFromRankedTweets';
import { DateTime } from 'luxon';

jest.mock('../createPostFromRankedTweets');

it.each([
  {
    name: 'daily',
    date: DateTime.fromISO('2022-08-02T19:08:00.000'),
    expected: {
      since: DateTime.fromISO('2022-08-01T00:00:00.000'),
      until: DateTime.fromISO('2022-08-01T23:59:59.999'),
    },
  },
  {
    name: 'weekly',
    date: DateTime.fromISO('2022-12-05T19:00:00.000'),
    expected: {
      since: DateTime.fromISO('2022-11-28T00:00:00.000'),
      until: DateTime.fromISO('2022-12-04T23:59:59.999'),
    },
  },
  {
    name: 'biweekly 1',
    date: DateTime.fromISO('2022-02-14T19:08:00.000'),
    expected: {
      since: DateTime.fromISO('2022-02-01T00:00:00.000'),
      until: DateTime.fromISO('2022-02-13T23:59:59.999'),
    },
  },
  {
    name: 'biweekly 2',
    date: DateTime.fromISO('2022-02-28T19:08:00.000'),
    expected: {
      since: DateTime.fromISO('2022-02-14T00:00:00.000'),
      until: DateTime.fromISO('2022-02-27T23:59:59.999'),
    },
  },
  {
    name: 'monthly',
    date: DateTime.fromISO('2022-03-01T19:08:00.000'),
    expected: {
      since: DateTime.fromISO('2022-02-01T00:00:00.000'),
      until: DateTime.fromISO('2022-02-28T23:59:59.999'),
    },
  },
])('should post ranking', async ({ date, expected }) => {
  (createPostFromRankedTweets as jest.Mock).mockImplementation(async () =>
    Promise.resolve(),
  );

  const endDate = date.minus({ days: 1 });
  const config = {
    TWITTER_RANKING_API_KEY: 'TWITTER_RANKING_API_KEY',
    TWITTER_RANKING_API_KEY_SECRET: 'TWITTER_RANKING_API_KEY_SECRET',
    TWITTER_RANKING_ACCESS_TOKEN: 'TWITTER_RANKING_ACCESS_TOKEN',
    TWITTER_RANKING_ACCESS_TOKEN_SECRET: 'TWITTER_RANKING_ACCESS_TOKEN_SECRET',
  };

  await postTweetRanking(endDate, config);
  expect(createPostFromRankedTweets).toHaveBeenCalledWith(
    expected.since,
    config,
    expected.until,
  );
});
