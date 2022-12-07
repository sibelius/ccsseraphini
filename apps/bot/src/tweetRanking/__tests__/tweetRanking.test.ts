import fetchMock from 'jest-fetch-mock';
import { TweetV2PostTweetResult } from 'twitter-api-v2';

import { clearDbAndRestartCounters } from '../../../test/clearDbAndRestartCounters';
import { disconnectMongoose } from '../../../test/disconnectMongoose';
import { connectMongoose } from '../../../test/connectMongoose';
import createFakeTweetBatch from '../__mocks__/createFakeTweetBatch';
import createFakeTemporaryTweets from '../__mocks__/createFakeTemporaryTweets';
import TemporaryTweetModel from '../schema/TemporaryTweet';
import RankedTweetModel from '../schema/RankedTweet';
import getTwitterClient from '../getTwitterClient';
import { TemporaryTweet } from '../types';
import tweetRanking from '..';
import { DateTime } from 'luxon';

beforeAll(async () => {
  await connectMongoose();
  fetchMock.doMock();
});
beforeEach(clearDbAndRestartCounters);
afterEach(() => fetchMock.resetMocks());
afterAll(disconnectMongoose);

jest.mock('../getTwitterClient');

it('should run without errors the tweetRanking execute function', async () => {
  const created_at = DateTime.fromISO('2021-11-15T19:08:00.000Z');
  //Create Fake Tweets to test the ranking
  const fakeTweets: TemporaryTweet[] = createFakeTemporaryTweets(
    created_at.toJSDate(),
  );

  //Insert Fake Tweets in the DB
  const temporaryTweets: TemporaryTweet[] =
    await TemporaryTweetModel.insertMany(fakeTweets);

  //Create a fake tweet batch to test the ranking
  const fakeTweetBatch = createFakeTweetBatch(temporaryTweets);

  //Mock the response of the API
  fetchMock.mockResponseOnce(JSON.stringify(fakeTweetBatch));

  //Mock getTwitterClient to publish ranking
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

  //mock console error spy to check if there are errors
  const consoleSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(console.error);

  //Get execute function
  const until = DateTime.fromISO('2021-11-16T19:08:00.000Z');
  const execute = tweetRanking(created_at, until);

  //Execute the ranking creation
  await execute(new Date());

  const temporaryTweetsCount = await TemporaryTweetModel.countDocuments();
  const rankedTweetsCount = await RankedTweetModel.countDocuments();

  expect(consoleSpy).toHaveBeenCalledTimes(0);
  expect(temporaryTweetsCount).toBe(0);
  expect(rankedTweetsCount).toBe(10);
  expect((await getTwitterClient()).v2.tweet).toHaveBeenCalledTimes(1);
  expect((await getTwitterClient()).v2.reply).toHaveBeenCalledTimes(7);
});
