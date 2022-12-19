import { RankedTweet } from './types/index';
import { RankedTweetModel } from './schema/RankedTweet';

const saveRankedTweets = async (tweets: RankedTweet[]): Promise<void> => {
  try {
    await RankedTweetModel.bulkWrite(
      tweets.map((tweet) => ({
        replaceOne: {
          filter: { tweet_id: tweet.tweet_id },
          replacement: tweet,
          upsert: true,
        },
      })),
      { ordered: false },
    );
  } catch (error) {
    console.error('Fail to save ranked tweets', error, { tweets });
    throw error;
  }
};

export default saveRankedTweets;
