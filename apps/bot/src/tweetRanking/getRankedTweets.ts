import getTemporaryTweets from './getTemporaryTweets';
import { RankedTweet, TweetData, TemporaryTweet } from './types';
import parseToRankedTweet from './parseToRankedTweet';
import { getTweetIdChunks } from './getTweetIdChunks';
import { getTweetsByIdChunks } from './getTweetsByIdChunks';
import saveRankedTweets from './saveRankedTweets';

const getRankedTweets = async (created_at: Date): Promise<RankedTweet[]> => {
  const temporaryTweets: TemporaryTweet[] = await getTemporaryTweets({
    created_at,
  });

  if (!temporaryTweets?.length) {
    console.error('No tweets found in database');
    return [];
  }

  try {
    const tweetIdChunks = getTweetIdChunks(temporaryTweets);
    const tweets: TweetData[] = await getTweetsByIdChunks(tweetIdChunks);

    if (!tweets.length) {
      console.error('Not found tweets in API');
      return [];
    }

    return tweets.map(parseToRankedTweet);
  } catch (error) {
    console.error('Fail to get tweets from Twitter API', error);
  }
};

export default getRankedTweets;
