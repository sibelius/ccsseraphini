import getTopTweets from './getTopTweets';
import publishRanking from './publishRanking';
import RankedTweetModel from './schema/RankedTweet';
import { RankedTweet } from './types';

const createPostFromRankedTweets = async (created_at: Date): Promise<void> => {
  try {
    const tweets: RankedTweet[] = await RankedTweetModel.find({
      created_at: { $gte: created_at },
    });
    const totalTweets = tweets.length;
    const topTweets = getTopTweets(tweets, 3);

    await publishRanking(topTweets, totalTweets, created_at);
  } catch (error) {
    console.error('Fail to create post from ranked tweets', error, {
      created_at,
    });
  }
};

export default createPostFromRankedTweets;
