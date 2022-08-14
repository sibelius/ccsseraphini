import { RankedTweet } from './types';
import RankedTweetModel from './schema/RankedTweet';

const findRankedTweetsForSync = async (
  date: Date = new Date(),
): Promise<RankedTweet[]> => {
  const twoDaysAgo = new Date(date.setDate(date.getDate() - 2));
  const oneMonthAgo = new Date(date.setMonth(date.getMonth() - 1));

  const tweets: RankedTweet[] = await RankedTweetModel.find({
    changes_since_last_update: {
      $ne: false,
    },
    $or: [
      {
        last_updated: {
          $lte: twoDaysAgo,
        },
        created_at: {
          $gte: oneMonthAgo,
        },
      },
      {
        last_updated: {
          $eq: null,
        },
        created_at: {
          $lte: twoDaysAgo,
          $gte: oneMonthAgo,
        },
      },
    ],
  });

  return tweets;
};

export default findRankedTweetsForSync;
