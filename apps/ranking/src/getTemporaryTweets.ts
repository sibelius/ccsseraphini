import { TemporaryTweet, TweetFilter } from './types/index';
import { TemporaryTweetModel } from './schema/TemporaryTweet';

const getTemporaryTweets = async ({
  created_at,
}: Partial<TweetFilter> = {}): Promise<TemporaryTweet[]> => {
  const tweetFilter: Record<string, any> = {};

  if (!!created_at) {
    tweetFilter['created_at'] = { $gte: created_at };
  }

  try {
    const tweets: TemporaryTweet[] = await TemporaryTweetModel.find({
      ...tweetFilter,
    });

    return tweets;
  } catch (error) {
    console.error('Fail to get tweets', error, { created_at });
    return [];
  }
};

export default getTemporaryTweets;
