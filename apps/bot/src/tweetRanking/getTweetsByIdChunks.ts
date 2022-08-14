import getTweetBatchFromApi from './getTweetBatchFromApi';
import { TweetBatch, TweetData } from './types';

export const getTweetsByIdChunks = async (
  tweetIdChunks: string[][],
): Promise<TweetData[]> => {
  const tweets: TweetData[] = [];
  for await (const ids of tweetIdChunks) {
    const { data }: TweetBatch = await getTweetBatchFromApi(ids);

    if (!!data.length) tweets.push(...data);
  }

  return tweets;
};
