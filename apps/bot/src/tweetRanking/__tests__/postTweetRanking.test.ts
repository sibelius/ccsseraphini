import postTweetRanking from '../postTweetRanking';
import createPostFromRankedTweets from '../createPostFromRankedTweets';
import { DateTime } from 'luxon';

jest.mock('../createPostFromRankedTweets');

//refactor it to use Luxon instead of Date
it.each([
  {
    name: 'daily',
    date: DateTime.fromJSDate(new Date(2022, 7, 2, 19, 8, 0, 0)),
    expected: {
      since: DateTime.fromJSDate(new Date(2022, 7, 1, 0, 0, 0, 0)),
      until: DateTime.fromJSDate(new Date(2022, 7, 1, 23, 59, 59, 999)),
    },
  },
  {
    name: 'weekly',
    date: DateTime.fromJSDate(new Date(2022, 11, 5, 19, 0, 0, 0)),
    expected: {
      since: DateTime.fromJSDate(new Date(2022, 10, 28, 0, 0, 0, 0)),
      until: DateTime.fromJSDate(new Date(2022, 11, 4, 23, 59, 59, 999)),
    },
  },
  {
    name: 'biweekly 1',
    date: DateTime.fromJSDate(new Date(2022, 1, 14, 19, 8, 0, 0)),
    expected: {
      since: DateTime.fromJSDate(new Date(2022, 1, 1, 0, 0, 0, 0)),
      until: DateTime.fromJSDate(new Date(2022, 1, 13, 23, 59, 59, 999)),
    },
  },
  {
    name: 'biweekly 2',
    date: DateTime.fromJSDate(new Date(2022, 1, 28, 19, 8, 0, 0)),
    expected: {
      since: DateTime.fromJSDate(new Date(2022, 1, 14, 0, 0, 0, 0)),
      until: DateTime.fromJSDate(new Date(2022, 1, 27, 23, 59, 59, 999)),
    },
  },
  {
    name: 'monthly',
    date: DateTime.fromJSDate(new Date(2022, 2, 1, 19, 8, 0, 0)),
    expected: {
      since: DateTime.fromJSDate(new Date(2022, 1, 1, 0, 0, 0, 0)),
      until: DateTime.fromJSDate(new Date(2022, 1, 28, 23, 59, 59, 999)),
    },
  },
])('should post ranking', async ({ date, expected }) => {
  (createPostFromRankedTweets as jest.Mock).mockImplementation(async () =>
    Promise.resolve(),
  );

  const endDate = date.minus({ days: 1 });

  await postTweetRanking(endDate);

  expect(createPostFromRankedTweets).toHaveBeenCalledWith(
    expected.since,
    expected.until,
  );
});
