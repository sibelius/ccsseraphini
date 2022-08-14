import { TweetData, TemporaryTweet } from '../types';

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
const createFakeTweetData = (persistedRankedTweets: TemporaryTweet[]) =>
  persistedRankedTweets.map(
    ({ tweet_id, created_at }): TweetData => ({
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

export default createFakeTweetData;
