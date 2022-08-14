import { JobCallback } from 'node-schedule';

import { RankedTweet } from './types';
import publishRanking from './publishRanking';
import getRankedTweets from './getRankedTweets';
import saveRankedTweets from './saveRankedTweets';
import deleteTemporaryTweets from './deleteTemporaryTweets';

const tweetRanking = (since: Date, size: number = 3) => {
  const execute: JobCallback = async () => {
    try {
      const startDate = new Date();
      const rankedTweets = await getRankedTweets(since);
      if (!rankedTweets?.length) {
        console.info('Unable to calculate tweet ranking');
        return;
      }

      //Persist all ranked tweets
      await saveRankedTweets(rankedTweets);
      await deleteTemporaryTweets(since, startDate);
      const topTweets = rankedTweets
        .sort((a: RankedTweet, b: RankedTweet) => b.score - a.score)
        .slice(0, size);
      await publishRanking(topTweets);
    } catch (error) {
      console.error('Fail to calculate tweet ranking', error);
    }
  };

  return execute;
};

export const executeDailyTweetRanking: JobCallback = async () => {
  const date = new Date(Date.now() - 86400000); // 24 hours in milliseconds
  return tweetRanking(date);
};

export default tweetRanking;
