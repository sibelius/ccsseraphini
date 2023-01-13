import { TextChannel } from 'discord.js';
import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const tweet = async (url: string) => {
  const tweet = await client.v1.tweet(url, {});
  const tweetUrl = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;
  return tweetUrl;
};

const postOnChannel = (tweetUrl: string, channel: TextChannel) => {
  if (!channel) {
    return;
  }

  return channel.send(tweetUrl);
};

export const tweetArticles = async (urls: string[], channel: TextChannel) => {
  const promisses = urls.map((url) =>
    tweet(url).then((tweetUrl) => postOnChannel(tweetUrl, channel)),
  );

  await Promise.all(promisses);
  return;
};
