import 'isomorphic-fetch';
import { isMainScript } from '../isMainScript';

const run = async () => {
  const authorization = process.env.DISCORD_AUTHORIZATION;
  const botToken = process.env.DISCORD_BOT_TOKEN;

  if (!authorization) {
    // eslint-disable-next-line
    console.log('DISCORD_AUTHORIZATION is not set');
    // eslint-disable-next-line
    console.log('export DISCORD_AUTHORIZATION="Bearer <token>"');
    return;
  }

  if (!botToken) {
    // eslint-disable-next-line
    console.log('DISCORD_BOT_TOKEN is not set');
    // eslint-disable-next-line
    console.log('export DISCORD_BOT_TOKEN="Bearer <token>"');
    return;
  }

  // const guildId = '905315417298448405';
  const guildId = '751032355279339583';
  const userId = '112368837852180480';

  const payload = {
    access_token: authorization,
    // nick: 'sibs',
    // roles: [],
    // mute: false,
    // deaf: false,
  };

  const url = `http://discord.com/api/guilds/${guildId}/members/${userId}`;
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: botToken,
    },
    method: 'PUT',
    body: JSON.stringify(payload),
  };

  console.log({
    url,
    payload,
    botToken,
  });

  const response = await fetch(url, options);

  console.log({
    response,
  });

  const data = await response.text();

  console.log({
    status: response.status,
    data,
  });
};

(async () => {
  if (!isMainScript(require, module)) {
    return;
  }
  try {
    await run();
  } catch (err) {
    // eslint-disable-next-line
    console.log('err: ', err);
    process.exit(1);
  }
  process.exit(0);
})();
