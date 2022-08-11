import TweetModel from './Tweet';
import { TweetDocument, TweetFilter } from './types';

const getTweets = async ({ created_at }: Partial<TweetFilter> = {}): Promise<
  TweetDocument[]
> => {
  const tweetFilter = {};

  if (!!created_at) {
    tweetFilter['created_at'] = { $gte: created_at };
  }

  try {
    const tweets: TweetDocument[] = await TweetModel.find({
      ...tweetFilter,
    });

    return tweets;
  } catch (error) {
    console.error('Fail to get tweets', error);
  }
};

export default getTweets;
