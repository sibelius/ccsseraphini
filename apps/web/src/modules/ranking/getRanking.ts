import { RankedTweetModel } from '@ccsseraphini/ranking';
import connectDB from 'modules/db/mongob';
import { UserRanking } from 'types/Ranking';

export type GetRankingError = Error | string;

export async function getRanking(): Promise<UserRanking[]> {
  try {
    await connectDB();
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw new Error('Error connecting to database');
  }

  const query = RankedTweetModel.aggregate<UserRanking>([
    {
      $group: {
        _id: '$author_id',
        score: { $sum: '$score' },
        retweets: { $sum: '$public_metrics.retweet_count' },
        replies: { $sum: '$public_metrics.reply_count' },
        likes: { $sum: '$public_metrics.like_count' },
        quotes: { $sum: '$public_metrics.quote_count' },
        lastTweetRanked: { $last: '$created_at' },
        tweets: { $sum: 1 },
      },
    },
    { $sort: { score: -1 } },
    { $limit: 100 },
  ]);

  const ranking = await query.exec();
  return ranking;
}
