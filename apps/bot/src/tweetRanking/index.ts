import { JobCallback } from 'node-schedule';
import { DateTime } from 'luxon';

import getRankedTweets from './getRankedTweets';
import saveRankedTweets from './saveRankedTweets';
import deleteTemporaryTweets from './deleteTemporaryTweets';
import postTweetRanking from './postTweetRanking';

const tweetRanking = (since: DateTime, until: DateTime = DateTime.now()) => {
  const startDate: DateTime = since.startOf('day');

  const endDate: DateTime = until.endOf('day').minus({ days: 1 });

  const execute: JobCallback = async () => {
    try {
      const rankedTweets = await getRankedTweets(startDate);
      if (!rankedTweets?.length) {
        console.info('Unable to calculate tweet ranking');
        return;
      }

      try {
        await saveRankedTweets(rankedTweets);
        await deleteTemporaryTweets(startDate, endDate);
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
