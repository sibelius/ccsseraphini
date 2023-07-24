import {
  Client,
  Events,
  GatewayIntentBits,
  Message,
  Snowflake,
} from 'discord.js';

import { config, summaryQueue } from './config';

import {
  fetchMessages,
  formatMessageLinks,
  generateLinkMap,
} from './functions';

import { processSummaryJob } from './processes';

export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

client.once(Events.ClientReady, () => {
  console.log('Bot is ready 🚀');

  // Repeat job every day at 23:00 (11pm) UTC
  if (process.env.NODE_ENV === 'production') {
    console.log('Starting summary job');
    summaryQueue.add({}, { repeat: { cron: '0 23 * * * ' } });
  }
});

summaryQueue.process(processSummaryJob);

client.on(Events.MessageCreate, async (msg: any) => {
  if (msg.content === '!getMessages') {
    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);

    let lastID: Snowflake | undefined;
    let messagesToday: Message[] = [];

    const thread = await msg.channel.threads.create({
      name: `Messages from ${oneDayAgo.toLocaleDateString()} - ${new Date().toLocaleDateString()}`,
      reason: 'Messages from the last 24 hours',
    });

    while (true) {
      const newMessages = await fetchMessages(msg.channel, lastID);
      if (newMessages.length === 0) break;

      messagesToday = messagesToday.concat(newMessages);
      lastID = newMessages[newMessages.length - 1].id;
    }

    const linkMap = generateLinkMap(messagesToday);

    let output = '# Content from the day \n\n';
    for (const base in linkMap) {
      output += formatMessageLinks(base, linkMap[base]) + '\n\n';
    }

    const lastThreads = [];

    msg.guild.channels.cache.forEach(async (channel) => {
      // get all threads channel in the last 24 hours with the link
      if (
        channel.isThread() &&
        channel.createdAt > oneDayAgo &&
        client.user.id !== channel.ownerId
      ) {
        lastThreads.push(`${channel.name} - <#${channel.id}>`);
      }
    });

    let outputThreads = `# Threads from the day \n\n`;
    outputThreads += lastThreads.join('\n');

    const truncatedContent = output.slice(0, 2000);
    const truncatedContentThreads = outputThreads.slice(0, 2000);

    if (truncatedContent.trim() !== '') {
      // Send the message in the same channel.
      thread.send(truncatedContent);
      thread.send(truncatedContentThreads);
      // Uncomment the line below if you want to tweet the resume.
      // tweetResume(truncatedContent);
    } else {
      thread.send('No links were found today.');
    }
  }
});

client.login(config.DISCORD_BOT_TOKEN);
