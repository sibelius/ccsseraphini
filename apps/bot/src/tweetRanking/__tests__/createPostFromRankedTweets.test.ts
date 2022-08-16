import { TweetV2PostTweetResult } from 'twitter-api-v2';
import { clearDbAndRestartCounters } from '../../../test/clearDbAndRestartCounters';
import { connectMongoose } from '../../../test/connectMongoose';
import { disconnectMongoose } from '../../../test/disconnectMongoose';
import createPostFromRankedTweets from '../createPostFromRankedTweets';
import getTwitterClient from '../getTwitterClient';
import RankedTweetModel from '../schema/RankedTweet';
import createFakeRankedTweets from '../__mocks__/createFakeRankedTweets';

jest.mock('../getTwitterClient');

beforeAll(connectMongoose);
beforeEach(clearDbAndRestartCounters);
afterAll(disconnectMongoose);

it('should have only one new author', async () => {
  const created_at = new Date('2022-08-11T19:08:00.000Z');
  const rankedTweets = createFakeRankedTweets(created_at, 4);
  await RankedTweetModel.insertMany(rankedTweets);

  //mock console error spy to check if there are errors
  const consoleSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(() => console.error);

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

  await createPostFromRankedTweets(created_at);

  expect(consoleSpy).toHaveBeenCalledTimes(0);
  expect((await getTwitterClient()).v2.tweet).toHaveBeenCalledTimes(1);
  expect((await getTwitterClient()).v2.reply).toHaveBeenCalledTimes(7);
});
