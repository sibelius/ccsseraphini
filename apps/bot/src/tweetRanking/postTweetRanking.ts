import createPostFromRankedTweets from './createPostFromRankedTweets';
import { getRankingPeriod } from './getRankingPeriod';

const postTweetRanking = async (until: Date): Promise<void> => {
  const { start, end }: Record<string, Date> = getRankingPeriod(until);

  await createPostFromRankedTweets(start, end);
};

export default postTweetRanking;