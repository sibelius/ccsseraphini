import { scheduleJob } from 'node-schedule';
import { getSyncRankedTweetsFn } from '@ccsseraphini/ranking/src/getSyncRankedTweetsFn';

import { config } from '../../config';
import { getRuleFromConfig } from './getRuleFromConfig';

const syncRankedTweetJob = () => {
  const rule = getRuleFromConfig('SYNC_TWEETS_RULE');
  if (!rule) return;

  const bearerToken = config.TWITTER_BEARER_TOKEN;

  const syncRankedTweets = getSyncRankedTweetsFn(bearerToken);

  scheduleJob(rule, syncRankedTweets);
  console.info('Sync ranked tweet job started, with the rule: ', rule);
};
export default syncRankedTweetJob;
