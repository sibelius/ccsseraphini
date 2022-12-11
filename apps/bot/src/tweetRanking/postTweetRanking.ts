import { DateTime } from 'luxon';
import createPostFromRankedTweets from './createPostFromRankedTweets';
import { getRankingPeriod } from './getRankingPeriod';
import { RankingPeriod } from './types';

const postTweetRanking = async (endDate: DateTime): Promise<void> => {
  const { label, since, until }: RankingPeriod = getRankingPeriod(endDate);

  const sinceStart = since.startOf('day');
  const untilEnd = until.endOf('day');

  console.info(
    `Posting ${label} ranking since ${since} to ${until}. Running at ${DateTime.now()}`,
  );

  await createPostFromRankedTweets(sinceStart, untilEnd);
};

export default postTweetRanking;
