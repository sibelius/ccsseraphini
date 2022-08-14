import { TemporaryTweet, TweetBatch } from '../types';
import createFakeTweetData from './createFakeTweetData';

const createFakeTweetBatch = (
  temporaryTweets: TemporaryTweet[],
): TweetBatch => {
  const fakeBatch: TweetBatch = {
    data: createFakeTweetData(temporaryTweets),
    errors: [],
    includes: {},
  };

  return fakeBatch;
};

export default createFakeTweetBatch;
