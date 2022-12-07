import getTweetScore from './getTweetScore';
import { Public_metrics } from '../tweetTypes';
import { RankedTweet, TweetData } from './types';
import { DateTime } from 'luxon';

const parseToRankedTweet = (tweet: TweetData): RankedTweet => {
  const { id, created_at, public_metrics, author_id } = tweet;
  const score = getTweetScore(tweet);
  return {
    tweet_id: id,
    created_at: DateTime.fromISO(created_at).toJSDate(),
    public_metrics: public_metrics as Public_metrics,
    score,
    author_id,
  };
};

export default parseToRankedTweet;
