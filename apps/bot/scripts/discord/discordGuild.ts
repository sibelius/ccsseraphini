import 'isomorphic-fetch';
import { isMainScript } from '../isMainScript';

const run = async () => {
  const authorization = process.env.DISCORD_AUTHORIZATION;

  if (!authorization) {
    // eslint-disable-next-line
    console.log('DISCORD_AUTHORIZATION is not set');
    // eslint-disable-next-line
    console.log('export DISCORD_AUTHORIZATION="Bearer <token>"');
    return;
  }
  const guildId = '751032355279339583';

  const url = `http://discord.com/api/guilds/${guildId}`;
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: authorization,
    },
    method: 'GET',
  };
  const response = await fetch(url, options);

  console.log({
    response,
  });

  const data = await response.json();

  console.log({
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
