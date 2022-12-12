import { DateTime } from 'luxon';

import { RankedTweet } from './types/index';
import { RankedTweetModel } from './schema/RankedTweet';

const findRankedTweetsForSync = async (
  date: DateTime = DateTime.now(),
): Promise<RankedTweet[]> => {
  const twoDaysAgo = date.startOf('day').minus({ days: 2 }).toJSDate();

  const oneMonthAgo = date.endOf('day').minus({ months: 1 }).toJSDate();

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
