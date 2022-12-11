import { UserScore } from 'types/Score';

export function getEmptyScore(): UserScore {
  return {
    tweet_count: 0,
    retweet_count: 0,
    reply_count: 0,
    like_count: 0,
    quote_count: 0,
    total: 0,
  };
}
