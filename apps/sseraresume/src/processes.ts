import { Snowflake, Message, TextChannel } from 'discord.js';

import { client } from './index';

import {
  fetchMessages,
  formatMessageLinks,
  generateLinkMap,
} from './functions';

export const processSummaryJob = async (job, done) => {
  // Replace with your actual Discord channel IDs.
  const channelIds = ['CHANNEL_ID_1', 'CHANNEL_ID_2', 'CHANNEL_ID_3'];

  let messagesToday: Message[] = [];

  for (let channelId of channelIds) {
    const channel = (await client.channels.fetch(channelId)) as TextChannel;

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

    let output = '# Content from the day \n\n';
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
