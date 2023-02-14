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
  IGNORED_CHANNELS: process.env.IGNORED_CHANNELS.split(',') as string[],
  GITHUB_TOKEN: process.env.GITHUB_TOKEN as string,
  GIT_REPO_OWNER: process.env.GIT_REPO_OWNER as string,
  GIT_REPO_NAME: process.env.GIT_REPO_NAME as string,
  ZETTELKASTEN_FILE_PATH: process.env.ZETTELKASTEN_FILE_PATH as string,
  GIT_REPO_BRANCH: process.env.GIT_REPO_BRANCH as string,
  DISCORD_SSERARTICLES_CHANNEL_ID: process.env
    .DISCORD_SSERARTICLES_CHANNEL_ID as string,

  FANSFY_API_KEY: process.env.FANSFY_API_KEY as string,

  PORT: 3000,
} as const;
