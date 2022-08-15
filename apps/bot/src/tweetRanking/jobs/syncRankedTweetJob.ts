import { scheduleJob, JobCallback } from 'node-schedule';

import { config } from '../../config';
import syncRankedTweets from '../syncRankedTweets';

const defaultCronString = config.SYNC_RANKED_TWEET_CRON_STRING;

const syncRankedTweetJob = (cronString: string = defaultCronString) => {
  scheduleJob(cronString, syncRankedTweets);
  console.info('Sync ranked tweet job started, cron string: ', cronString);
};
export default syncRankedTweetJob;
