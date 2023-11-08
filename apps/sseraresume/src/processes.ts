import { Snowflake, Message, TextChannel } from 'discord.js';

import { client } from './index';

import {
  fetchMessages,
  formatMessageLinks,
  generateLinkMap,
} from './functions';
import { config } from './config';

export const processSummaryJob = async (job, done) => {
  // Replace with your actual Discord channel IDs.
  const channels = [
    {
      name: 'General',
      id: config.GENERAL_CHANNEL_ID,
    },
    {
      name: 'Open Source',
      id: config.OPEN_SOURCE_CHANNEL_ID,
    },
    {
      name: 'Business and Startups',
      id: config.STARTUPS_CHANNEL_ID,
    },
  ];

  const oneDayAgo = new Date();
  oneDayAgo.setHours(oneDayAgo.getHours() - 24);

  for (let c of channels) {
    let messagesToday: Message[] = [];

    const channel = (await client.channels.fetch(c.id)) as TextChannel;

    let lastID: Snowflake | undefined;

    const thread = await channel.threads.create({
      name: `Messages from ${oneDayAgo.toLocaleDateString()} - ${new Date().toLocaleDateString()}`,
      reason: 'Messages from the last 24 hours',
    });

    while (true) {
      const newMessages = await fetchMessages(channel, lastID);
      if (newMessages.length === 0) break;

      messagesToday = messagesToday.concat(newMessages);
      lastID = newMessages[newMessages.length - 1].id;
    }

    // get channel cache by guild id

    const linkMap = generateLinkMap(messagesToday);

    let output = `# Content of the day - ${c.name} \n\n`;

    for (const base in linkMap) {
      output += formatMessageLinks(base, linkMap[base]) + '\n\n';
    }

    const truncatedContent = output.slice(0, 2000);

    const guild = await client.guilds.fetch(config.GUILD_ID);

    const lastThreads = [];

    guild.channels.cache.forEach(async (guildChannel) => {
      // get all threads channel in the last 24 hours with the link
      if (
        guildChannel.isThread() &&
        guildChannel.createdAt > oneDayAgo &&
        client.user.id !== guildChannel.ownerId &&
        guildChannel.parentId === channel.id
      ) {
        lastThreads.push(`${guildChannel.name} - <#${guildChannel.id}>`);
      }
    });

    let threadOutput = `# Threads of the day\n\n`;

    threadOutput += lastThreads.join('\n');

    const truncatedContentThreads = threadOutput.slice(0, 2000);

    if (truncatedContent.trim() !== '') {
      thread.send(truncatedContent);
      thread.send(truncatedContentThreads);
    } else {
      thread.send('No links were found today.');
    }
  }

  done();
};
