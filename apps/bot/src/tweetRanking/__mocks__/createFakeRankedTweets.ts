import createFakeTemporaryTweets from './createFakeTemporaryTweets';
import createFakeTweetData from './createFakeTweetData';
import parseToRankedTweet from '../parseToRankedTweet';
import { TemporaryTweet, RankedTweet } from '../types';

const createFakeRankedTweets = (
  created_at: Date,
  length: number = 10,
): RankedTweet[] => {
  const fakeTweets: TemporaryTweet[] = createFakeTemporaryTweets(
    created_at,
    length,
  );
  const data = createFakeTweetData(fakeTweets);

  return data.map(parseToRankedTweet);
};

export default createFakeRankedTweets;
