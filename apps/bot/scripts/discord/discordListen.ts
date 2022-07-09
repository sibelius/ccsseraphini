import 'isomorphic-fetch';
import { Client, Intents, TextChannel } from 'discord.js';
import { config } from '../../src/config';
import { debugConsole } from '../../src/debugConsole';

export const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.once('ready', async () => {
  console.log('ready');

  const botChannel = client.channels.cache.get(
    config.DISCORD_BOT_CHANNEL_ID,
  ) as TextChannel;

  // await botChannel.send('sibs');
});

const listen = (...args) => {
  console.log('messsage');
  debugConsole({ args });
};

client.on('messageReactionAdd', listen);

client.on('messageReactionRemove', listen);

client.on('interactionCreate', async (interaction) => {
  console.log('interactionCreate: ');
  debugConsole({
    interaction,
  });
});

client.on('error', (e) => console.error(e));
client.on('warn', (e) => console.warn(e));
client.on('debug', (e) => console.info(e));

client.login(config.DISCORD_BOT_TOKEN);

console.log('config: ', config);
