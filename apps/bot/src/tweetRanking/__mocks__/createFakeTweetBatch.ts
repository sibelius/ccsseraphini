import { TemporaryTweet, TweetData, TweetBatch } from '../types';

export const createFakeTweetBatch = (
  temporaryTweets: TemporaryTweet[],
): TweetBatch => {
  const getRandomInt = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const fakeDatas: TweetData[] = temporaryTweets.map(
    ({ tweet_id, created_at }) => ({
      id: tweet_id,
      created_at: created_at.toISOString(),
      author_id: '2244994945',
      public_metrics: {
        retweet_count: getRandomInt(0, 100),
        reply_count: getRandomInt(0, 1000),
        like_count: getRandomInt(0, 1000),
        quote_count: getRandomInt(0, 100),
      },
    }),
  );

  const fakeBatch: TweetBatch = {
    data: fakeDatas,
    errors: [],
    includes: {},
  };

  return fakeBatch;
};
