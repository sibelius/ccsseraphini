import { clearDbAndRestartCounters } from '../../test/clearDbAndRestartCounters';
import { connectMongoose } from '../../test/connectMongoose';
import { disconnectMongoose } from '../../test/disconnectMongoose';
import parseToRankedTweet from '../parseToRankedTweet';
import saveRankedTweets from '../saveRankedTweets';
import { RankedTweetModel } from '../schema/RankedTweet';
import { RankedTweet, TweetData } from '../types/index';

beforeAll(connectMongoose);
beforeEach(clearDbAndRestartCounters);
afterAll(disconnectMongoose);

it('should save ranked tweet', async () => {
  const tweetData: TweetData = {
    attachments: {},
    author_id: '1415806078600810501',
    created_at: '2022-08-13T01:20:45.000Z',
    id: '1558262248677720066',
    public_metrics: {
      retweet_count: 7,
      reply_count: 17,
      like_count: 27,
      quote_count: 37,
    },
    text:
      'Para o povo de dados. Se liga nessas dicas para linguagem R desse repositório:\n' +
      'https://t.co/mAYAuR5Nff\n' +
      '\n' +
      '@sseraphini',
  };

  const rankedTweed = parseToRankedTweet(tweetData);

  await saveRankedTweets([rankedTweed]);

  const rankedTweet: RankedTweet = (await RankedTweetModel.findOne({
    tweet_id: tweetData.id,
  })) as RankedTweet;

  const expectedScore = 1 + 7 + 17 + 27 + 37;
  expect(rankedTweet._id).toBeDefined();
  expect(rankedTweet.score).toBe(expectedScore);
});
