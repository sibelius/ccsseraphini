import fetchMock from 'jest-fetch-mock';
import { Data, Tweet } from '../../tweetTypes';
import saveTemporaryTweet from '../saveTemporaryTweet';
import getRankedTweets from '../getRankedTweets';
import { connectMongoose } from '../../../test/connectMongoose';
import { disconnectMongoose } from '../../../test/disconnectMongoose';
import { clearDbAndRestartCounters } from '../../../test/clearDbAndRestartCounters';
import { DateTime } from 'luxon';

beforeAll(async () => {
  await connectMongoose();
  fetchMock.doMock();
});
beforeEach(clearDbAndRestartCounters);
afterEach(() => fetchMock.resetMocks());
afterAll(disconnectMongoose);

it('should return the score of the tweet', async () => {
  const data: Partial<Data> = {
    created_at: '2021-11-15T19:08:05.000Z',
    id: '1460323737035677698',
  };

  const tweet: Partial<Tweet> = {
    data: data as Data,
  };

  const tweetSaved = await saveTemporaryTweet(tweet as Tweet);

  fetchMock.mockResponse(
    JSON.stringify({
      data: [
        {
          id: '1460323737035677698',
          created_at: '2021-11-15T19:08:05.000Z',
          author_id: '2244994945',
          public_metrics: {
            retweet_count: 123,
            reply_count: 752,
            like_count: 525,
            quote_count: 358,
          },
        },
      ],
    }),
  );

  const expectedScore = 1 + 123 + 752 + 525 + 358;
  const date = DateTime.fromJSDate(tweetSaved.created_at);
  const rankedTweets = await getRankedTweets(date);

  expect(rankedTweets).toHaveLength(1);
  expect(rankedTweets[0].score).toBe(expectedScore);
});
