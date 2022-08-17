import fetchMock from 'jest-fetch-mock';

import { clearDbAndRestartCounters } from '../../../test/clearDbAndRestartCounters';
import { disconnectMongoose } from '../../../test/disconnectMongoose';
import { connectMongoose } from '../../../test/connectMongoose';
import createFakeRankedTweets from '../__mocks__/createFakeRankedTweets';
import createFakeTweetBatch from '../__mocks__/createFakeTweetBatch';
import RankedTweetModel from '../schema/RankedTweet';
import syncRankedTweets from '../syncRankedTweets';
import { RankedTweet, TweetBatch, TweetData } from '../types';

beforeAll(async () => {
  await connectMongoose();
  fetchMock.doMock();
});
beforeEach(clearDbAndRestartCounters);
afterEach(() => fetchMock.resetMocks());
afterAll(disconnectMongoose);

jest.mock('../getTwitterClient');

it('should sync ranked tweet without errors', async () => {
  //Populate database to test sync method
  const created_at = new Date('2022-08-11T19:08:00.000Z');
  const rankedTweets = createFakeRankedTweets(created_at, 3);
  await RankedTweetModel.insertMany(rankedTweets);

  //Create fake TweetBatch to mock Twitter API response
  const tweetIds: string[] = ['1160323737035677600', '1160323737035677601'];
  const persistedRankedTweets: RankedTweet[] = (await RankedTweetModel.find({
    tweet_id: {
      $in: tweetIds,
    },
  })) as RankedTweet[];

  const unchagedRankedTweet: RankedTweet = (await RankedTweetModel.findOne({
    tweet_id: '1160323737035677602',
  })) as RankedTweet;

  const unchagedTweetData: TweetData = {
    id: unchagedRankedTweet.tweet_id,
    created_at: unchagedRankedTweet.created_at.toISOString(),
    public_metrics: unchagedRankedTweet.public_metrics,
    author_id: unchagedRankedTweet.author_id,
  };

  const fakeTweetBatch: TweetBatch = createFakeTweetBatch(
    persistedRankedTweets,
  );

  fakeTweetBatch.data.push(unchagedTweetData);
  fetchMock.mockResponse(JSON.stringify(fakeTweetBatch));

  //mock console error spy to check if there are errors
  const consoleSpy = jest
    .spyOn(console, 'error')
    .mockImplementation(console.error);

  await syncRankedTweets(new Date());
  const rankedTweetsLeft = await RankedTweetModel.countDocuments();
  const tweetsWithoutChanges = await RankedTweetModel.find({
    changes_since_last_update: false,
  });

  const tweetsWithChanges = await RankedTweetModel.find({
    changes_since_last_update: true,
  });

  expect(rankedTweetsLeft).toBe(3);
  expect(tweetsWithChanges).toHaveLength(2);
  expect(tweetsWithoutChanges).toHaveLength(1);
  expect(consoleSpy).toHaveBeenCalledTimes(0);
});
