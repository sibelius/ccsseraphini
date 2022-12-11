import dotenvSafe from 'dotenv-safe';
import path from 'path';

const cwd = process.cwd();

const root = path.join.bind(cwd);

dotenvSafe.config({
  path: root('.env'),
  sample: root('.env.example'),
});

export const config = {
  APP_URI: process.env.APP_URI || 'http://localhost:3000',

  TWITTER_BEARER_TOKEN: process.env.TWITTER_BEARER_TOKEN as string,
  TWITTER_CLIENT_ID: process.env.TWITTER_CLIENT_ID as string,
  TWITTER_CLIENT_SECRET: process.env.TWITTER_CLIENT_SECRET as string,

  TWITTER_ACCESS_TOKEN: process.env.TWITTER_ACCESS_TOKEN as string,
  TWITTER_ACCESS_TOKEN_SECRET: process.env
    .TWITTER_ACCESS_TOKEN_SECRET as string,
  TWITTER_API_KEY: process.env.TWITTER_API_KEY as string,
  TWITTER_API_KEY_SECRET: process.env.TWITTER_API_KEY_SECRET as string,

  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID as string,
  DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET as string,
  DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN as string,
  DISCORD_BOT_CHANNEL_ID: process.env.DISCORD_BOT_CHANNEL_ID as string,
  DISCORD_GENERAL_CHANNEL_ID: process.env.DISCORD_GENERAL_CHANNEL_ID as string,

  GUILD_ID: process.env.GUILD_ID as string,
  WEBHOOK_DISCORD: process.env.WEBHOOK_DISCORD as string,

  MONGO_URI: process.env.MONGO_URI as string,

  PORT: 3000,

  TWEET_RANKING_RULE: process.env.TWEET_RANKING_RULE || '10:00',
  SYNC_TWEETS_RULE: process.env.SYNC_TWEETS_RULE || '01:00',
} as const;
