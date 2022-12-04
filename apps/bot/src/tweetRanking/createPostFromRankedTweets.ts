import { DateTime } from 'luxon';
import { getStats } from './getStats';
import getTopTweets from './getTopTweets';
import publishRanking from './publishRanking';
import RankedTweetModel from './schema/RankedTweet';
import { RankedTweet, Stats } from './types';

const createPostFromRankedTweets = async (
  startDate: DateTime,
  endDate: DateTime = startDate.endOf('day'),
  rankingSize: number = 5,
): Promise<void> => {
  try {
    const since = startDate.toJSDate();
    const until = endDate.toJSDate();

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
    const topTweets = getTopTweets(tweets, rankingSize);

    await publishRanking(topTweets, stats);
  } catch (error) {
    console.error('Fail to create post from ranked tweets', error, {
      startDate,
      endDate,
    });
  }
};

export default createPostFromRankedTweets;
