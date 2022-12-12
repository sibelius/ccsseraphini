import { TemporaryTweetModel } from '../schema/TemporaryTweet';
import { TemporaryTweet } from '../types/index';

const baseId = '11603237370356776';
const createFakeTemporaryTweets = (
  created_at: Date,
  length: number = 10,
): TemporaryTweet[] =>
  Array.from({ length }, (_, i) => {
    const idSufix = `${i}`.padStart(2, '0');
    const tweet_id = `${baseId}${idSufix}`;
    return new TemporaryTweetModel({
      tweet_id,
      created_at,
    });
  });

export default createFakeTemporaryTweets;
