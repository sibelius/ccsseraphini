import { scheduleJob, JobCallback } from 'node-schedule';

import { executeDailyTweetRanking } from '.';
import { config } from '../config';

const defaultCronString = config.TWEET_RANKING_CRON_STRING;

const rankingJob = (
  cronString: string = defaultCronString,
  callback: JobCallback = executeDailyTweetRanking,
) => scheduleJob(cronString, callback);

export default rankingJob;
