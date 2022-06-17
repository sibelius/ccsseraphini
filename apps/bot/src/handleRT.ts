import { TwitterApi, TweetV1 } from 'twitter-api-v2';
import { config } from './config';

const client = new TwitterApi({
  appKey: config.TWITTER_API_KEY,
  appSecret: config.TWITTER_API_KEY_SECRET,
  accessToken: config.TWITTER_ACCESS_TOKEN,
  accessSecret: config.TWITTER_ACCESS_TOKEN_SECRET,
});

export const handleRT = async (id: string) => {
  await client.v1.post(`statuses/retweet/${id}.json`);
};
