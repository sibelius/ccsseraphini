import { Client } from 'twitter-api-sdk';

import { TweetBatch } from './types/index';

const getTweetBatchFromApi = async (
  ids: string[],
  bearerToken: string,
): Promise<TweetBatch> => {
  if (!bearerToken) {
    console.error('Bearer token is not defined');
    return {};
  }

  const {
    tweets: { findTweetsById },
  } = new Client(bearerToken);

  const result: TweetBatch = await findTweetsById({
    ids,
    expansions: ['author_id'],
    'tweet.fields': ['public_metrics', 'created_at'],
  });

  return result;
};

export default getTweetBatchFromApi;
