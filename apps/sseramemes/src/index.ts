import 'dotenv/config';
import { Client, Intents } from 'discord.js';
import { handleMemeVoting, emojisPoints, isMeme } from './handleMemeVoting';

export const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

client.once('ready', () => {
  console.log('Ready!');
});

client.on('messageCreate', async (message) => {
  /**
   * Add all emojis to the message to make easy the voting.
   */
  if (await isMeme(message)) {
    await Promise.all(
      Object.keys(emojisPoints).map((emoji) => message.react(emoji)),
    );
  }
});

client.on('messageReactionAdd', handleMemeVoting);

client.on('messageReactionRemove', handleMemeVoting);

client.login(process.env.DISCORD_TOKEN);
