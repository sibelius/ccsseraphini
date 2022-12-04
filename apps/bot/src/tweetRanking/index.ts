import { JobCallback } from 'node-schedule';

import getRankedTweets from './getRankedTweets';
import saveRankedTweets from './saveRankedTweets';
import deleteTemporaryTweets from './deleteTemporaryTweets';
import postTweetRanking from './postTweetRanking';
import { getDayBeforeDate } from '../date/getDayBeforeDate';

const tweetRanking = (since: Date, until: Date = new Date()) => {
  const endDate = getDayBeforeDate(until);
  
  const execute: JobCallback = async () => {
    try {
      const rankedTweets = await getRankedTweets(since);
      if (!rankedTweets?.length) {
        console.info('Unable to calculate tweet ranking');
        return;
      }

      try {
        await saveRankedTweets(rankedTweets);
        await deleteTemporaryTweets(since, endDate);
      } catch (error) {
        console.error('Fail to save ranked tweets', error);
        console.info("Temporary tweets wasn't deleted");
      }
    } catch (error) {
      console.error('Fail to calculate tweet ranking', error);
    }

    try {
      await postTweetRanking(endDate);
    } catch (error) {
      console.error('Fail to handle ranking', error);
    }
  };

  return execute;
};

export default tweetRanking;
