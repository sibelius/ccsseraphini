import { TweetData, TemporaryTweet } from '../types/index';

const getRandomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getAuthorId = (size: number = 10): string =>
  Math.random().toString(size).substring(2, 12);

const createFakeTweetData = (temporaryTweets: TemporaryTweet[]) =>
  temporaryTweets.map(
    ({ tweet_id, created_at }): TweetData => ({
      id: tweet_id,
      created_at: created_at.toISOString(),
      author_id: getAuthorId(),
      public_metrics: {
        retweet_count: getRandomInt(0, 100),
        reply_count: getRandomInt(0, 1000),
        like_count: getRandomInt(0, 1000),
        quote_count: getRandomInt(0, 100),
      },
    }),
  );

export default createFakeTweetData;
