import { JobCallback, scheduleJob } from 'node-schedule';

import tweetRanking from '..';
import getRuleFromConfig from './getRuleFromConfig';

const rankingJob = () => {
  const rule = getRuleFromConfig('TWEET_RANKING_RULE');
  if (!rule) return;

  const since = new Date(new Date().setHours(0, 0, 0, 0));
  const executeTweetRanking: JobCallback = tweetRanking(since);

  scheduleJob(rule, executeTweetRanking);
  console.info('Ranking Job started, with the rule: ', rule);
};

export default rankingJob;
