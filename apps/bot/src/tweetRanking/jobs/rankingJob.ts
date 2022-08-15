import { scheduleJob, JobCallback } from 'node-schedule';

import { dailyTweetRanking } from '..';
import { config } from '../../config';

const defaultCronString = config.TWEET_RANKING_CRON_STRING;

const rankingJob = (
  cronString: string = defaultCronString,
  callback: JobCallback = dailyTweetRanking,
) => {
  scheduleJob(cronString, callback);
  console.log('Ranking job started, cron string: ', cronString);
};

export default rankingJob;
