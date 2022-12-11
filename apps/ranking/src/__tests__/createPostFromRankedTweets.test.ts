import { DateTime } from 'luxon';
import { TweetV2PostTweetResult } from 'twitter-api-v2';
import { clearDbAndRestartCounters } from '../../test/clearDbAndRestartCounters';
import { connectMongoose } from '../../test/connectMongoose';
import { disconnectMongoose } from '../../test/disconnectMongoose';
import createPostFromRankedTweets from '../createPostFromRankedTweets';
import getTwitterClient from '../getTwitterClient';
import { RankedTweetModel } from '../schema/RankedTweet';
import createFakeRankedTweets from '../__mocks__/createFakeRankedTweets';

jest.mock('../getTwitterClient');

beforeAll(connectMongoose);
beforeEach(clearDbAndRestartCounters);
afterAll(disconnectMongoose);

it('should have only one new author', async () => {
  const created_at = DateTime.fromISO('2022-08-11T19:08:00.000Z');
  const rankedTweets = createFakeRankedTweets(created_at.toJSDate(), 4);
  await RankedTweetModel.insertMany(rankedTweets);

  const consoleSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => console.error);

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

  const config = {
    TWITTER_RANKING_API_KEY: 'TWITTER_RANKING_API_KEY',
    TWITTER_RANKING_API_KEY_SECRET: 'TWITTER_RANKING_API_KEY_SECRET',
    TWITTER_RANKING_ACCESS_TOKEN: 'TWITTER_RANKING_ACCESS_TOKEN',
    TWITTER_RANKING_ACCESS_TOKEN_SECRET: 'TWITTER_RANKING_ACCESS_TOKEN_SECRET',
  };

  await createPostFromRankedTweets(created_at, config);

  expect(consoleSpy).toHaveBeenCalledTimes(0);
  expect((await getTwitterClient(config))?.v2.tweet).toHaveBeenCalledTimes(1);
  expect((await getTwitterClient(config))?.v2.reply).toHaveBeenCalledTimes(6);
});
