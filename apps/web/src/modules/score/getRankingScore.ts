import connectDB from 'modules/db/mongob';
import { RankedTweetModel } from 'modules/db/schema/RankedTweet';
import { UserRanking } from 'types/Ranking';

export async function getRankingScore(author_id: string): Promise<UserRanking> {
  try {
    await connectDB();
  } catch (error) {
    console.error('Error connecting to database:', error);
    throw new Error('Error connecting to database');
  }

  const query = RankedTweetModel.aggregate<UserRanking>([
    {
      $match: { author_id: author_id },
    },
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
    { $limit: 1 },
  ]);

  const ranking = await query.exec();

  if (ranking?.length === 0)
    return {
      _id: author_id,
      score: 0,
      retweets: 0,
      replies: 0,
      likes: 0,
      quotes: 0,
      tweets: 0,
    } as UserRanking;

  return ranking[0];
}
