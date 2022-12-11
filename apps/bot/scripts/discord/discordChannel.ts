import 'isomorphic-fetch';
import { isMainScript } from '../isMainScript';
import { Client, Intents } from 'discord.js';
import { config } from '../../src/config';
import { readyMessage } from 'sseramemes/src/readyMessage';

export const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

// const run = async () => {
//   await client.login(config.DISCORD_BOT_TOKEN);
//
//   const channel = client.channels.cache.find(channel => {
//     console.log({
//       channel,
//     });
//
//     return channel.name === 'general';
//   });
//
//   console.log({
//     channel,
//   });
// };

client.once('ready', async () => {
  console.log('ready');
  const channel = client.channels.cache.find((channel) => {
    // console.log({
    //   channel,
    // });

    return channel.name === 'tweets';
  });

  console.log({
    channel,
  });
});

client.login(config.DISCORD_BOT_TOKEN);

// (async () => {
//   if (!isMainScript(require, module)) {
//     return;
//   }
//   try {
//     await run();
//   } catch (err) {
//     // eslint-disable-next-line
//     console.log('err: ', err);
//     process.exit(1);
//   }
//   process.exit(0);
// })();
