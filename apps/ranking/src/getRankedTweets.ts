import { DateTime } from 'luxon';

import getTemporaryTweets from './getTemporaryTweets';
import { RankedTweet, TemporaryTweet } from './types/index';
import getRankedTweetsFromApi from './getRankedTweetsFromApi';

const getRankedTweets = async (
  date: DateTime,
  bearerToken: string,
): Promise<RankedTweet[]> => {
  const created_at = date.toJSDate();

  try {
    const temporaryTweets: TemporaryTweet[] = await getTemporaryTweets({
      created_at,
    });

    if (!temporaryTweets?.length) {
      console.error('No tweets found in database');
      return [];
    }

    const tweets = await getRankedTweetsFromApi(temporaryTweets, bearerToken);

    return tweets;
  } catch (error) {
    console.error('Fail to get tweets from Twitter API', error, { created_at });
    return [];
  }
};

export default getRankedTweets;
