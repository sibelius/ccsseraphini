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

  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID as string,
  DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN as string,
  GUILD_ID: process.env.GUILD_ID as string,
  LISTENED_USER_ID: process.env.LISTENED_USER_ID as string,

  PORT: 3000,
} as const;
