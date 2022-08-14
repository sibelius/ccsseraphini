import TemporaryTweetModel from './schema/TemporaryTweet';
import { TemporaryTweet, TweetFilter } from './types';

const getTemporaryTweets = async ({
  created_at,
}: Partial<TweetFilter> = {}): Promise<TemporaryTweet[]> => {
  const tweetFilter = {};

  if (!!created_at) {
    tweetFilter['created_at'] = { $gte: created_at };
  }

  try {
    const tweets: TemporaryTweet[] = await TemporaryTweetModel.find({
      ...tweetFilter,
    });

    return tweets;
  } catch (error) {
    console.error('Fail to get tweets', error);
  }
};

export default getTemporaryTweets;
