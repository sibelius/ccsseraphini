import getTweetScore from './getTweetScore';
import { Public_metrics } from '../tweetTypes';
import { RankedTweet, TweetData } from './types';

const parseToRankedTweet = (tweet: TweetData): RankedTweet => {
  const { id, created_at, public_metrics, author_id } = tweet;
  const score = getTweetScore(tweet);
  return {
    tweet_id: id,
    created_at: new Date(created_at),
    public_metrics: public_metrics as Public_metrics,
    score,
    author_id,
  };
};

export default parseToRankedTweet;
