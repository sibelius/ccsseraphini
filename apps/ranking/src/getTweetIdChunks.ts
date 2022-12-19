import { TweetWithId } from './types/index';

const getTweetIdChunks = (tweets: TweetWithId[]): string[][] => {
  return tweets.reduce((acc: string[][], { tweet_id }, index) => {
    const chunkIndex = Math.floor(index / 100);

    if (!acc[chunkIndex]) {
      acc[chunkIndex] = [];
    }

    acc[chunkIndex].push(tweet_id);

    return acc;
  }, []);
};

export default getTweetIdChunks;
