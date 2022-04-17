import { config } from '../../../config';
import { NextApiRequest, NextApiResponse } from 'next';
// eslint-disable-next-line
import { discordGuildJoinPut } from '../../../modules/discord/discordGuildJoinPut';
import { getHttpProtocol } from 'getHttpProtocol';
import { getSession } from 'next-auth/react';
import { getUserScore } from 'modules/score/getUserScore';

export interface DiscordUser {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
  public_flags: number;
  flags: number;
  locale: string;
  mfa_enabled: boolean;
  premium_type: number;
}

const scope = [
  'identify',
  'guilds.join', // join user to a guild
].join(' ');

export const oauthDiscord = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const host = req.headers.host as string;
  const httpProtocol = getHttpProtocol(host);

  const DISCORD_REDIRECT_URI = `${httpProtocol}://${host}/api/discord/oauth`;

  const OAUTH_QS = new URLSearchParams({
    client_id: config.DISCORD_CLIENT_ID,
    redirect_uri: DISCORD_REDIRECT_URI,
    response_type: 'code',
    scope,
  }).toString();

  const OAUTH_URI = `https://discord.com/api/oauth2/authorize?${OAUTH_QS}`;

  if (req.method !== 'GET') {
    res.redirect('/');
    return;
  }

  const { code = null, error = null } = req.query;

  if (error) {
    res.redirect(`/?error=${req.query.error}`);
    return;
  }

  if (!code || typeof code !== 'string') {
    res.redirect(OAUTH_URI);
    return;
  }

  // check if user has signature already
  const body = new URLSearchParams({
    client_id: config.DISCORD_CLIENT_ID,
    client_secret: config.DISCORD_CLIENT_SECRET,
    grant_type: 'authorization_code',
    redirect_uri: DISCORD_REDIRECT_URI,
    code,
    scope,
  }).toString();

  const response = await fetch('https://discord.com/api/oauth2/token', {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    body,
  });
  const data = await response.json();

  const { access_token = null, token_type = 'Bearer' } = data;

  if (!access_token || typeof access_token !== 'string') {
    res.redirect('/?error=discord-invalid-client');
    return;
  }

  const authorization = `${token_type} ${access_token}`;

  // debug only
  // console.log('==========================================================');
  // console.log(`export DISCORD_AUTHORIZATION="${token_type} ${access_token}"`)
  // console.log('==========================================================');

  const me: DiscordUser | { unauthorized: true } = await fetch(
    'http://discord.com/api/users/@me',
    {
      headers: { Authorization: authorization },
    },
  ).then((res) => res.json());

  if (!('id' in me)) {
    res.redirect(OAUTH_URI);
    return;
  }

  const session = await getSession({ req });
  if (!session) {
    res.redirect('/?error=twitter-session-required&status=401');
    return;
  }

  const { username: twitterUsername } = session;

  if (!twitterUsername) {
    res.redirect('/?error=twitter-username-not-found&status=404');
    return;
  }

  const DISCORD_SCORE_THRESHOLD = config.DISCORD_SCORE_THRESHOLD;
  if (!DISCORD_SCORE_THRESHOLD) {
    res.redirect('/?error=no-discord-score-threshold');
    return;
  }

  const { userScore } = await getUserScore(twitterUsername as string);

  if (!userScore) {
    res.redirect('/?error=unsuccesful-attempt-to-retrieve-user-score');
    return;
  }

  if (userScore.total < DISCORD_SCORE_THRESHOLD) {
    res.redirect(
      `/?error=score-must-be-at-least-${DISCORD_SCORE_THRESHOLD}&status=400`,
    );
    return;
  }

  // join discord
  const responseGuildJoin = await discordGuildJoinPut(
    config.GUILD_ID,
    me.id,
    access_token,
  );

  // eslint-disable-next-line
  console.log('join guild status: ', responseGuildJoin);

  res.redirect('/');
};

export default oauthDiscord;
