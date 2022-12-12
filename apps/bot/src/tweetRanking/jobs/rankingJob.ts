import { JobCallback, scheduleJob } from 'node-schedule';
import { DateTime } from 'luxon';

import { tweetRanking } from './tweetRanking';
import { getRuleFromConfig } from './getRuleFromConfig';

const rankingJob = () => {
  const rule = getRuleFromConfig('TWEET_RANKING_RULE');
  if (!rule) return;

  const executeTweetRanking: JobCallback = tweetRanking(DateTime.now());

  scheduleJob(rule, executeTweetRanking);
  console.info('Ranking Job started, with the rule: ', rule);
};

export default rankingJob;
