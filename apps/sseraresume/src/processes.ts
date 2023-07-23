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

  for (let c of channels) {
    let messagesToday: Message[] = [];

    const channel = (await client.channels.fetch(c.id)) as TextChannel;

    const oneDayAgo = new Date();
    oneDayAgo.setHours(oneDayAgo.getHours() - 24);

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

    const linkMap = generateLinkMap(messagesToday);

    let output = `# Content of the day - ${c.name} \n\n`;
    for (const base in linkMap) {
      output += formatMessageLinks(base, linkMap[base]) + '\n\n';
    }

    const truncatedContent = output.slice(0, 2000);

    if (truncatedContent.trim() !== '') {
      thread.send(truncatedContent);
    } else {
      thread.send('No links were found today.');
    }
  }

  done();
};
