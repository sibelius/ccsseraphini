import { countNewAuthors } from './countNewAuthors';
import RankedTweetModel from './schema/RankedTweet';
import { Stats } from './types';

export async function getStats(since: Date, until: Date): Promise<Stats> {
  const [stats]: Stats[] = await RankedTweetModel.aggregate([
    {
      $match: {
        created_at: {
          $gte: since,
          $lte: until,
        },
      },
    },
    {
      $group: {
        _id: null,
        unique_authors: {
          $addToSet: '$author_id',
        },
        likes: {
          $sum: '$public_metrics.like_count',
        },
        retweets: {
          $sum: '$public_metrics.retweet_count',
        },
        replies: {
          $sum: '$public_metrics.reply_count',
        },
        quotes: {
          $sum: '$public_metrics.quote_count',
        },
        mentions: {
          $sum: 1,
        },
      },
    },
    {
      $project: {
        _id: 0,
        uniqueAuthors: {
          $size: '$unique_authors',
        },
        likes: 1,
        retweets: 1,
        replies: 1,
        quotes: 1,
        mentions: 1,
      },
    },
  ]);

  const { newAuthors } = await countNewAuthors(since, until);
  stats.newAuthors = newAuthors;
  stats.since = since;
  stats.until = until;

  return stats;
}
