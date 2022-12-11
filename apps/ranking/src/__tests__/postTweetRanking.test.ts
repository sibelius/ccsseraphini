import postTweetRanking from '../postTweetRanking';
import createPostFromRankedTweets from '../createPostFromRankedTweets';
import { DateTime } from 'luxon';

jest.mock('../createPostFromRankedTweets');

it.each([
  {
    name: 'daily',
    // date: DateTime.fromJSDate(new Date(2022, 7, 2, 19, 8, 0, 0)),
    date: DateTime.fromISO('2022-08-02T19:08:00.000'),
    expected: {
      // since: DateTime.fromJSDate(new Date(2022, 7, 1, 0, 0, 0, 0)),
      since: DateTime.fromISO('2022-08-01T00:00:00.000'),
      // until: DateTime.fromJSDate(new Date(2022, 7, 1, 23, 59, 59, 999)),
      until: DateTime.fromISO('2022-08-01T23:59:59.999'),
    },
  },
  {
    name: 'weekly',
    // date: DateTime.fromJSDate(new Date(2022, 11, 5, 19, 0, 0, 0)),
    date: DateTime.fromISO('2022-12-05T19:00:00.000'),
    expected: {
      // since: DateTime.fromJSDate(new Date(2022, 10, 28, 0, 0, 0, 0)),
      since: DateTime.fromISO('2022-11-28T00:00:00.000'),
      // until: DateTime.fromJSDate(new Date(2022, 11, 4, 23, 59, 59, 999)),
      until: DateTime.fromISO('2022-12-04T23:59:59.999'),
    },
  },
  {
    name: 'biweekly 1',
    // date: DateTime.fromJSDate(new Date(2022, 1, 14, 19, 8, 0, 0)),
    date: DateTime.fromISO('2022-02-14T19:08:00.000'),
    expected: {
      // since: DateTime.fromJSDate(new Date(2022, 1, 1, 0, 0, 0, 0)),
      since: DateTime.fromISO('2022-02-01T00:00:00.000'),
      // until: DateTime.fromJSDate(new Date(2022, 1, 13, 23, 59, 59, 999)),
      until: DateTime.fromISO('2022-02-13T23:59:59.999'),
    },
  },
  {
    name: 'biweekly 2',
    // date: DateTime.fromJSDate(new Date(2022, 1, 28, 19, 8, 0, 0)),
    date: DateTime.fromISO('2022-02-28T19:08:00.000'),
    expected: {
      // since: DateTime.fromJSDate(new Date(2022, 1, 14, 0, 0, 0, 0)),
      since: DateTime.fromISO('2022-02-14T00:00:00.000'),
      // until: DateTime.fromJSDate(new Date(2022, 1, 27, 23, 59, 59, 999)),
      until: DateTime.fromISO('2022-02-27T23:59:59.999'),
    },
  },
  {
    name: 'monthly',
    // date: DateTime.fromJSDate(new Date(2022, 2, 1, 19, 8, 0, 0)),
    date: DateTime.fromISO('2022-03-01T19:08:00.000'),
    expected: {
      // since: DateTime.fromJSDate(new Date(2022, 1, 1, 0, 0, 0, 0)),
      since: DateTime.fromISO('2022-02-01T00:00:00.000'),
      // until: DateTime.fromJSDate(new Date(2022, 1, 28, 23, 59, 59, 999)),
      until: DateTime.fromISO('2022-02-28T23:59:59.999'),
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
