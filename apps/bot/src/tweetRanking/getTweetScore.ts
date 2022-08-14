import { TweetData } from './types';

export const getTweetScore = (tweet: Partial<TweetData>): number => {
  const {
    public_metrics: { retweet_count, reply_count, like_count, quote_count },
  } = tweet;

  const tweet_value = 1;
  const score =
    tweet_value + retweet_count + reply_count + like_count + quote_count;

  return score;
};
