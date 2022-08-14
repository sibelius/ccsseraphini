import getTweetBatchFromApi from './getTweetBatchFromApi';
import { TweetBatch, TweetData } from './types';

const getTweetsByIdChunks = async (
  tweetIdChunks: string[][],
): Promise<TweetData[]> => {
  const tweets: TweetData[] = [];

  for await (const ids of tweetIdChunks) {
    try {
      const { data }: TweetBatch = await getTweetBatchFromApi(ids);

      if (!!data.length) tweets.push(...data);
    } catch (error) {
      console.error('Fail to get tweets from Twitter API', error, { ids });
    }
  }

  return tweets;
};

export default getTweetsByIdChunks;
