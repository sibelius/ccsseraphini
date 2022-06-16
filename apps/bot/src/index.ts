import { config } from './config';
import { debugConsole } from './debugConsole';
import { tweetStream } from './tweetStream';
import { Intents, TextChannel } from 'discord.js';
import { Client } from 'discord.js';
import { readyMessage } from './readyMessage';
import { EMOJIS_POINTS } from './score';
import { handleRTVoting } from './handleRTVoting';

export const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
});

let botChannel;

client.once('ready', async () => {
  console.log(readyMessage);

  botChannel = client.channels.cache.get(
    config.DISCORD_BOT_CHANNEL_ID,
  ) as TextChannel;

  // send message to bot channel
  await botChannel.send(readyMessage);
});

export const twitterBaseUrl = 'https://twitter.com/';

const processTweet = async (tweet) => {
  debugConsole(tweet);

  const author = tweet.includes.users.find(
    (user) => user.id === tweet.data.author_id,
  );

  const tweetUrl = `${twitterBaseUrl}${author.username}/status/${tweet.data.id}`;

  // send to discord
  if (botChannel) {
    const message = await botChannel.send(tweetUrl);

    await Promise.all(
      Object.keys(EMOJIS_POINTS).map((emoji) => message.react(emoji)),
    );
  }
};

const run = async () => {
  for await (const tweet of tweetStream()) {
    await processTweet(tweet);
  }
};

client.on('messageReactionAdd', handleRTVoting);

client.on('messageReactionRemove', handleRTVoting);

client.login(config.DISCORD_BOT_TOKEN);

(async () => {
  try {
    await run();
  } catch (err) {
    // eslint-disable-next-line
    console.log(err);

    process.exit(1);
  }

  process.exit(0);
})();
