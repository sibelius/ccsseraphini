import fetchMock from 'jest-fetch-mock';
import { Data, Tweet } from '../tweetTypes';
import saveTweetData from './saveTweetData';
import getRankedTweets from './getRankedTweets';
import { connectMongoose } from '../../test/connectMongoose';
import { disconnectMongoose } from '../../test/disconnectMongoose';
import { clearDbAndRestartCounters } from '../../test/clearDbAndRestartCounters';

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

  const tweetSaved = await saveTweetData(tweet as Tweet);

  fetchMock.mockResponse(
    JSON.stringify({
      data: [
        {
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

  const rankedTweets = await getRankedTweets(tweetSaved.data.created_at, 1);
  expect(rankedTweets).toHaveLength(1);
  expect(rankedTweets[0].score).toBe(expectedScore);
});
