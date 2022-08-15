import createFakeTemporaryTweets from './createFakeTemporaryTweets';
import createFakeTweetData from './createFakeTweetData';
import parseToRankedTweet from '../parseToRankedTweet';
import { TemporaryTweet, RankedTweet } from '../types';

const createFakeRankedTweets = (created_at: Date): RankedTweet[] => {
  const fakeTweets: TemporaryTweet[] = createFakeTemporaryTweets(created_at);
  const data = createFakeTweetData(fakeTweets);

  return data.map(parseToRankedTweet);
};

export default createFakeRankedTweets;
