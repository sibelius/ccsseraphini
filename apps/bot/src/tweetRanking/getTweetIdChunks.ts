import { TweetWithId } from './types';

const getTweetIdChunks = (tweets: TweetWithId[]): string[][] => {
  return tweets.reduce((acc, { tweet_id }, index) => {
    const chunkIndex = Math.floor(index / 100);

    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }

    acc[chunkIndex].push(tweet_id);

    return acc;
  }, []);
};

export default getTweetIdChunks;
