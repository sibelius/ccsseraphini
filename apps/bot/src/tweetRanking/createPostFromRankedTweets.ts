import { getStats } from './getStats';
import getTopTweets from './getTopTweets';
import publishRanking from './publishRanking';
import RankedTweetModel from './schema/RankedTweet';
import { RankedTweet, Stats } from './types';

const createPostFromRankedTweets = async (
  since: Date,
  until: Date = new Date(),
): Promise<void> => {
  try {
    const tweets: RankedTweet[] = await RankedTweetModel.find({
      created_at: {
        $gte: since,
        $lte: until,
      },
    });

    if (!tweets.length) {
      console.error('No tweets found in database');
      return;
    }

    const stats: Stats = await getStats(since, until);
    const topTweets = getTopTweets(tweets, 5);

    await publishRanking(topTweets, stats);
  } catch (error) {
    console.error('Fail to create post from ranked tweets', error, {
      created_at: since,
    });
  }
};

export default createPostFromRankedTweets;
