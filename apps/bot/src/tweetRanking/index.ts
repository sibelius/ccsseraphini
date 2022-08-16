import { JobCallback } from 'node-schedule';

import getRankedTweets from './getRankedTweets';
import saveRankedTweets from './saveRankedTweets';
import deleteTemporaryTweets from './deleteTemporaryTweets';
import createPostFromRankedTweets from './createPostFromRankedTweets';

const tweetRanking = (since: Date) => {
  const execute: JobCallback = async () => {
    try {
      const until = new Date();
      const rankedTweets = await getRankedTweets(since);
      if (!rankedTweets?.length) {
        console.info('Unable to calculate tweet ranking');
        return;
      }

      try {
        await saveRankedTweets(rankedTweets);
        await deleteTemporaryTweets(since, until);
      } catch (error) {
        console.error('Fail to save ranked tweets', error);
        console.info("Temporary tweets wasn't deleted");
      }

      await createPostFromRankedTweets(since, until);
    } catch (error) {
      console.error('Fail to calculate tweet ranking', error);
    }
  };

  return execute;
};

export const dailyTweetRanking = () =>
  tweetRanking(new Date(Date.now() - 86400000));

export default tweetRanking;
