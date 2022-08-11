import { Client } from 'twitter-api-sdk';
import { config } from '../config';

const getTweetsFromApi = async (ids: string[]) => {
  const bearerToken = config.TWITTER_BEARER_TOKEN;

  if (!bearerToken) {
    console.error('Bearer token is not defined');
    return;
  }

  const {
    tweets: { findTweetsById },
  } = new Client(bearerToken);

  const result = await findTweetsById({
    ids,
    expansions: ['author_id'],
    'tweet.fields': ['public_metrics', 'created_at'],
  });

  return result;
};

export default getTweetsFromApi;
