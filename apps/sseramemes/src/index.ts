import 'dotenv/config';
import { Client, GatewayIntentBits, Events, TextChannel } from 'discord.js';
import { handleMemeVoting, isMeme } from './handleMemeVoting';
import { readyMessage } from './readyMessage';
import { EMOJIS_POINTS } from './score';
import { listenToMentions } from './twitterMentions';
import { addMemeTextManual } from './image-scripts';

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    /**
     * https://stackoverflow.com/a/73249884/8786986
     */
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, async () => {
  console.log(readyMessage);

  const memeChannel = client.channels.cache.get(
    process.env.DISCORD_MEMES_CHANNEL_ID,
  ) as TextChannel;

  await memeChannel.send(readyMessage);
  await memeChannel.send(addMemeTextManual);
  // try {
  //   await listenToMentions(memeChannel);
  // } catch (err) {
  //   const msg = `☹️ Error listening to Twitter mentions: ${err}`;
  //   await memeChannel.send(msg);
  // }
});

client.on(Events.MessageCreate, async (message) => {
  /**
   * Add all emojis to the message to make easy the voting.
   */
  if (await isMeme(message)) {
    await Promise.all(
      Object.keys(EMOJIS_POINTS).map((emoji) => message.react(emoji)),
    );
  }
});

client.on(Events.MessageReactionAdd, handleMemeVoting);

client.on(Events.MessageReactionAdd, handleMemeVoting);

client.login(process.env.DISCORD_TOKEN);
