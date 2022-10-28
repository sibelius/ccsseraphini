import 'dotenv/config';
import { Client, IntentsBitField, TextChannel } from 'discord.js';
import { handleMemeVoting, isMeme } from './handleMemeVoting';
import { readyMessage } from './readyMessage';
import { EMOJIS_POINTS } from './score';
import { listenToMentions } from './twitterMentions';

export const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
  ],
});

client.once('ready', async () => {
  console.log(readyMessage);

  const memeChannel = client.channels.cache.get(
    process.env.DISCORD_MEMES_CHANNEL_ID,
  ) as TextChannel;

  await memeChannel.send(readyMessage);

  await listenToMentions(memeChannel);
});

client.on('messageCreate', async (message) => {
  /**
   * Add all emojis to the message to make easy the voting.
   */
  if (await isMeme(message)) {
    await Promise.all(
      Object.keys(EMOJIS_POINTS).map((emoji) => message.react(emoji)),
    );
  }
});

client.on('messageReactionAdd', handleMemeVoting);

client.on('messageReactionRemove', handleMemeVoting);

client.login(process.env.DISCORD_TOKEN);
