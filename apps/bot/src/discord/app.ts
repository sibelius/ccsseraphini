import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import cors from 'koa-cors';
import { DISCORD_REDIRECT_URI, OAUTH_URI, scope } from './oauth';
import { config } from '../config';

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

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(convert(cors({ maxAge: 86400, credentials: true })));

router.get('/api/discord/oauth', async (ctx) => {
  const { code = null, error = null } = ctx.query;

  if (error) {
    ctx.status = 400;
    return;
  }

  if (!code || typeof code !== 'string') {
    ctx.redirect(OAUTH_URI);
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
    ctx.status = 400;
    return;
  }

  const authorization = `${token_type} ${access_token}`;

  // debug only
  console.log('==========================================================');
  console.log(`export DISCORD_AUTHORIZATION="${token_type} ${access_token}"`);
  console.log('==========================================================');

  const me: DiscordUser | { unauthorized: true } = await fetch(
    'http://discord.com/api/users/@me',
    {
      headers: { Authorization: authorization },
    },
  ).then((res) => res.json());

  if (!('id' in me)) {
    ctx.redirect(OAUTH_URI);
    return;
  }

  ctx.status = 200;
  ctx.body = {
    message: 'success',
  };
});

app.use(router.routes()).use(router.allowedMethods());

export default app;
