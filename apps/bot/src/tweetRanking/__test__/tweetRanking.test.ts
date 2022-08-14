import fetchMock from 'jest-fetch-mock';

import { clearDbAndRestartCounters } from '../../../test/clearDbAndRestartCounters';
import { disconnectMongoose } from '../../../test/disconnectMongoose';
import { connectMongoose } from '../../../test/connectMongoose';
import { createFakeTweetBatch } from '../__mocks__/createFakeTweetBatch';
import { createFakeTweets } from '../__mocks__/createFakeTweets';
import TemporaryTweetModel from '../schema/TemporaryTweet';
import { TemporaryTweet } from '../types';
import tweetRanking from '..';
import { getTwitterClient } from '../getTwitterClient';
import { TweetV2PostTweetResult } from 'twitter-api-v2';

beforeAll(async () => {
  await connectMongoose();
  fetchMock.doMock();
});
beforeEach(clearDbAndRestartCounters);
afterEach(() => fetchMock.resetMocks());
afterAll(disconnectMongoose);

jest.mock('../getTwitterClient');

it('should run without errors the tweetRanking execute function', async () => {
  const created_at = new Date('2021-11-15T19:08:00.000Z');
  //Create Fake Tweets to test the ranking
  const fakeTweets: TemporaryTweet[] = createFakeTweets(created_at);

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
      reply: jest
        .fn()
        .mockImplementation(async (_: string, replyId: string) => {
          const id = (parseInt(replyId) + 1).toString();

          return {
            data: { id },
          } as TweetV2PostTweetResult;
        }),
    },
  });

  //mock console error spy to check if there are errors
  const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

  //Get execute function
  const execute = tweetRanking(created_at);

  //Execute the ranking creation
  await execute(new Date());

  expect(consoleSpy).toHaveBeenCalledTimes(0);
});
