import { UserScore, Tweet } from 'types/Score';
import { getEmptyScore } from './getEmptyScore';

export function calculateUserScore(tweets: Tweet[]): UserScore {
  const { length: tweet_count } = tweets;

  return tweets.reduce(
    (
      accumulator: UserScore,
      {
        public_metrics: { retweet_count, reply_count, like_count, quote_count },
      }: Tweet,
    ): UserScore => {
      const retweets = retweet_count + accumulator.retweet_count;
      const replies = reply_count + accumulator.reply_count;
      const likes = like_count + accumulator.like_count;
      const quotes = quote_count + accumulator.quote_count;
      const total = tweet_count + retweets + replies + likes + quotes;

      return {
        tweet_count,
        retweet_count: retweets,
        reply_count: replies,
        like_count: likes,
        quote_count: quotes,
        total,
      };
    },
    getEmptyScore(),
  );
}
