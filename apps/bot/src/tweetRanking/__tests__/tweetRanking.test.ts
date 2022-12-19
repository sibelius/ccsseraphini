import fetchMock from 'jest-fetch-mock';
import { TweetV2PostTweetResult } from 'twitter-api-v2';

import { clearDbAndRestartCounters } from '@ccsseraphini/ranking/test/clearDbAndRestartCounters';
import { disconnectMongoose } from '@ccsseraphini/ranking/test/disconnectMongoose';
import { connectMongoose } from '@ccsseraphini/ranking/test/connectMongoose';
import createFakeTweetBatch from '@ccsseraphini/ranking/src/__mocks__/createFakeTweetBatch';
import createFakeTemporaryTweets from '@ccsseraphini/ranking/src/__mocks__/createFakeTemporaryTweets';
import { TemporaryTweetModel } from '@ccsseraphini/ranking/src/schema/TemporaryTweet';
import { RankedTweetModel } from '@ccsseraphini/ranking/src/schema/RankedTweet';
import getTwitterClient from '@ccsseraphini/ranking/src/getTwitterClient';
import { TemporaryTweet } from '@ccsseraphini/ranking/src/types';
import { tweetRanking } from '../jobs/tweetRanking';
import { DateTime } from 'luxon';

beforeAll(async () => {
  await connectMongoose();
  fetchMock.doMock();
});
beforeEach(clearDbAndRestartCounters);
afterEach(() => fetchMock.resetMocks());
afterAll(disconnectMongoose);

jest.mock('@ccsseraphini/ranking/src/getTwitterClient');

it('should run without errors the tweetRanking execute function', async () => {
  const created_at = DateTime.fromISO('2021-11-15T19:08:00.000Z');
  const fakeTweets: TemporaryTweet[] = createFakeTemporaryTweets(
    created_at.toJSDate(),
  );

  const temporaryTweets: TemporaryTweet[] =
    await TemporaryTweetModel.insertMany(fakeTweets);

  const fakeTweetBatch = createFakeTweetBatch(temporaryTweets);

  fetchMock.mockResponseOnce(JSON.stringify(fakeTweetBatch));

  (getTwitterClient as jest.Mock).mockReturnValue({
    v2: {
      tweet: jest.fn().mockResolvedValue({
        data: { id: '1' },
      }),
      reply: jest.fn(async (_: string, replyId: string) => {
        const id = (parseInt(replyId) + 1).toString();

        return {
          data: { id },
        } as TweetV2PostTweetResult;
      }),
    },
  });

  const consoleSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(console.error);

  const until = DateTime.fromISO('2021-11-16T19:08:00.000Z');
  const execute = tweetRanking(created_at, until);

  await execute(new Date());

  const temporaryTweetsCount = await TemporaryTweetModel.countDocuments();
  const rankedTweetsCount = await RankedTweetModel.countDocuments();

  expect(consoleSpy).toHaveBeenCalledTimes(0);
  expect(temporaryTweetsCount).toBe(0);
  expect(rankedTweetsCount).toBe(10);
  expect((await getTwitterClient({}))?.v2.tweet).toHaveBeenCalledTimes(1);
  expect((await getTwitterClient({}))?.v2.reply).toHaveBeenCalledTimes(7);
});
