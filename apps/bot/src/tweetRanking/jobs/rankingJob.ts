import { scheduleJob } from 'node-schedule';

import { dailyTweetRanking } from '..';
import getRuleFromConfig from './getRuleFromConfig';

const rankingJob = () => {
  const rule = getRuleFromConfig('TWEET_RANKING_RULE');
  if (!rule) return;

  scheduleJob(rule, dailyTweetRanking());
  console.info('Ranking job started, with the rule: ', rule);
};

export default rankingJob;
