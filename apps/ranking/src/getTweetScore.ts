import { TweetData } from './types/index';

const getTweetScore = (tweet: Partial<TweetData>): number => {
  const {
    public_metrics: { retweet_count, reply_count, like_count, quote_count },
  } = tweet as Required<TweetData>;

  const tweet_value = 1;
  const score =
    tweet_value +
    (retweet_count ?? 0) +
    (reply_count ?? 0) +
    (like_count ?? 0) +
    (quote_count ?? 0);

  return score;
};

export default getTweetScore;
