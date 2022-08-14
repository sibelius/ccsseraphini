import { Client } from 'discord.js';
import { GatewayIntentBits, TextChannel } from 'discord.js';

import { config } from './config';
import { debugConsole } from './debugConsole';
import { tweetStream } from './tweetStream';
import { readyMessage } from './readyMessage';
import { EMOJIS_POINTS } from './score';
import { handleRTVoting } from './handleRTVoting';
import connectDB from './mongodb';
import saveTemporaryTweet from './tweetRanking/saveTemporaryTweet';
import rankingJob from './tweetRanking/rankingJob';

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
  ],
});

let botChannel: TextChannel;

client.once('ready', async () => {
  console.log(readyMessage);

  rankingJob('* 12 * * * *');

  try {
    await connectDB();
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
  }

  botChannel = client.channels.cache.get(
    config.DISCORD_BOT_CHANNEL_ID,
  ) as TextChannel;

  // send message to bot channel
  // await botChannel.send(readyMessage);
});

export const twitterBaseUrl = 'https://twitter.com/';

const processTweet = async (tweet) => {
  await saveTemporaryTweet(tweet);
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
  // TODO - handle error
  for await (const tweet of tweetStream()) {
    await processTweet(tweet);
  }
};

client.on('messageReactionAdd', handleRTVoting);

client.on('messageReactionRemove', handleRTVoting);

client.on('error', (e) => console.error(e));
client.on('warn', (e) => console.warn(e));
client.on('debug', (e) => console.info(e));

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
