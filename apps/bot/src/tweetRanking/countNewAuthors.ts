import RankedTweetModel from './schema/RankedTweet';
import { Stats } from './types';

export async function countNewAuthors(
  since: Date,
  until: Date,
): Promise<Partial<Stats>> {
  const [stats]: Partial<Stats>[] = await RankedTweetModel.aggregate([
    {
      $group: {
        _id: '$author_id',
        first_created_at: {
          $min: '$created_at',
        },
      },
    },
    {
      $match: {
        first_created_at: {
          $gte: since,
          $lte: until,
        },
      },
    },
    {
      $count: 'newAuthors',
    },
  ]);

  return stats;
}
