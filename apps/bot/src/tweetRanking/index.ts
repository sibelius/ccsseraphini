import { JobCallback } from 'node-schedule';

import publishRanking from './publishRanking';
import getRankedTweets from './getRankedTweets';
import saveRankedTweets from './saveRankedTweets';
import deleteTemporaryTweets from './deleteTemporaryTweets';
import getTopTweets from './getTopTweets';

const tweetRanking = (since: Date, size: number = 3) => {
  const execute: JobCallback = async () => {
    try {
      const startDate = new Date();
      const rankedTweets = await getRankedTweets(since);
      if (!rankedTweets?.length) {
        console.info('Unable to calculate tweet ranking');
        return;
      }

      try {
        await saveRankedTweets(rankedTweets);
        await deleteTemporaryTweets(since, startDate);
      } catch (error) {
        console.error('Fail to save ranked tweets', error);
        console.info("Temporary tweets wasn't deleted");
      }

      const totalTweets: number = rankedTweets.length;
      const topTweets = getTopTweets(rankedTweets, size);
      await publishRanking(topTweets, totalTweets, since);
    } catch (error) {
      console.error('Fail to calculate tweet ranking', error);
    }
  };

  return execute;
};

export const dailyTweetRanking = () =>
  tweetRanking(new Date(Date.now() - 86400000));

export default tweetRanking;
