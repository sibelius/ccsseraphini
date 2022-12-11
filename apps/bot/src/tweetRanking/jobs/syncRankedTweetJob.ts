import { scheduleJob } from 'node-schedule';
import syncRankedTweets from '../syncRankedTweets';
import getRuleFromConfig from './getRuleFromConfig';

const syncRankedTweetJob = () => {
  const rule = getRuleFromConfig('SYNC_TWEETS_RULE');
  if (!rule) return;

  scheduleJob(rule, syncRankedTweets);
  console.info('Sync ranked tweet job started, with the rule: ', rule);
};
export default syncRankedTweetJob;
