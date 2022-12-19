import getTweetIdChunks from './getTweetIdChunks';
import parseToRankedTweet from './parseToRankedTweet';
import getTweetsByIdChunks from './getTweetsByIdChunks';
import { TweetData, TweetWithId, RankedTweet } from './types/index';

const getRankedTweetsFromApi = async (
  tweets: TweetWithId[],
  bearerToken: string,
): Promise<RankedTweet[]> => {
  if (!tweets.length) {
    console.info('Tweets are empty');
    return [];
  }

  const idChunks: string[][] = getTweetIdChunks(tweets);
  const tweetsData: TweetData[] = await getTweetsByIdChunks(
    idChunks,
    bearerToken,
  );
  if (!tweetsData.length) {
    console.error('Not found tweets in TwitterAPI');
    return [];
  }

  return tweetsData.map(parseToRankedTweet);
};

export default getRankedTweetsFromApi;
