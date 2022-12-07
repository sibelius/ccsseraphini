import { RankedTweet, TemporaryTweet } from './types';
import getTemporaryTweets from './getTemporaryTweets';
import getRankedTweetsFromApi from './getRankedTweetsFromApi';
import { DateTime } from 'luxon';

const getRankedTweets = async (date: DateTime): Promise<RankedTweet[]> => {
  const created_at = date.toJSDate();

  try {
    const temporaryTweets: TemporaryTweet[] = await getTemporaryTweets({
      created_at,
    });

    if (!temporaryTweets?.length) {
      console.error('No tweets found in database');
      return [];
    }

    const tweets = await getRankedTweetsFromApi(temporaryTweets);

    return tweets;
  } catch (error) {
    console.error('Fail to get tweets from Twitter API', error, { created_at });
  }
};

export default getRankedTweets;
