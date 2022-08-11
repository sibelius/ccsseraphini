import getTweets from './getTweets';
import getTweetsFromApi from './getTweetsFromApi';
import { TweetDocument, TweetScore } from './types';
import calculateTweetScore from './calculateTweetScore';

const getRankedTweets = async (created_at: Date, size: number = 3) => {
  const persistedTweets: TweetDocument[] = await getTweets({ created_at });

  const idChunks: string[][] = persistedTweets.reduce(
    (acc, { data: { tweet_id } }, index) => {
      const chunkIndex = Math.floor(index / 100);

      if (!acc[chunkIndex]) {
        acc[chunkIndex] = [];
      }

      acc[chunkIndex].push(tweet_id);

      return acc;
    },
    [] as string[][],
  );

  const tweets = [];
  for await (const ids of idChunks) {
    const { data } = await getTweetsFromApi(ids);
    tweets.push(...data);
  }

  return tweets
    .map(calculateTweetScore)
    .sort((a: TweetScore, b: TweetScore) => b.score - a.score)
    .slice(0, size);
};

export default getRankedTweets;
