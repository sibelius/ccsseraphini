import { clearDbAndRestartCounters } from '../../test/clearDbAndRestartCounters';
import { connectMongoose } from '../../test/connectMongoose';
import { disconnectMongoose } from '../../test/disconnectMongoose';
import { countNewAuthors } from '../countNewAuthors';
import { RankedTweetModel } from '../schema/RankedTweet';
import createFakeRankedTweets from '../__mocks__/createFakeRankedTweets';

beforeAll(connectMongoose);
beforeEach(clearDbAndRestartCounters);
afterAll(disconnectMongoose);

it('should have only one new author', async () => {
  const created_at = new Date('2022-08-11T19:08:00.000Z');
  const rankedTweets1 = createFakeRankedTweets(created_at, 1);
  const rankedTweets2 = createFakeRankedTweets(
    new Date('2022-07-30T19:08:00.000Z'),
    1,
  );

  await RankedTweetModel.insertMany([rankedTweets1, rankedTweets2].flat());

  const { newAuthors } = await countNewAuthors(created_at, new Date());

  expect(newAuthors).toBe(1);
});
