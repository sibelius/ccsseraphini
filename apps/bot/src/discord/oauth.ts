import { config } from '../config';

export const DISCORD_REDIRECT_URI = `${config.APP_URI}/api/discord/oauth`;

export const scope = [
  'identify',
  'guilds.join', // join user to a guild
].join(' ');

export const OAUTH_QS = new URLSearchParams({
  client_id: config.DISCORD_CLIENT_ID,
  redirect_uri: DISCORD_REDIRECT_URI,
  response_type: 'code',
  scope,
}).toString();

export const OAUTH_URI = `https://discord.com/api/oauth2/authorize?${OAUTH_QS}`;
