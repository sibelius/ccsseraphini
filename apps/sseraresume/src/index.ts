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

  // summary queue every 24 hours
  summaryQueue.add({}, { repeat: { cron: '0 0 * * *' } });

  // >> tests purposes
  // summaryQueue.add({}, { delay: 10});
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

    const truncatedContent = output.slice(0, 2000);

    if (truncatedContent.trim() !== '') {
      // Send the message in the same channel.
      thread.send(truncatedContent);
      // Uncomment the line below if you want to tweet the resume.
      // tweetResume(truncatedContent);
    } else {
      thread.send('No links were found today.');
    }
  }
});

client.login(config.DISCORD_BOT_TOKEN);
