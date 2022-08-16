import { RankedTweet } from './types';

const getTopTweets = (rankedTweets: RankedTweet[], size: number) =>
  rankedTweets
    .sort((a: RankedTweet, b: RankedTweet) => b.score - a.score)
    .slice(0, size);

export default getTopTweets;
