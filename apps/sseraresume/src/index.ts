import {
  Client,
  Events,
  GatewayIntentBits,
  Message,
  Snowflake,
  TextChannel,
} from 'discord.js';
import { config } from './config';

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.MessageContent,
  ],
});

// Regular expression to match URLs in a string.
const urlRegex = /(https?:\/\/[^\s]+)/g;

// Function to format message links.
const formatMessageLinks = (title: string, links: string[]): string =>
  `### ${title}\n${links.map((link) => `- <${link}>`).join('\n')}`;

// Function to get links from a message.
const getLinksFromMessage = (message: Message): string[] =>
  Array.from(message.content.matchAll(urlRegex), (m) => m[0]);

// Function to fetch messages from a channel that were sent in the last 24 hours.
const fetchMessages = async (
  channel: TextChannel,
  beforeId?: Snowflake,
): Promise<Message[]> => {
  const oneDayAgo = new Date();
  oneDayAgo.setHours(oneDayAgo.getHours() - 24);

  const options = { limit: 100 } as { limit: number; before?: Snowflake };
  if (beforeId) options.before = beforeId;

  const messages = await channel.messages.fetch(options);
  const filtered = [...messages.values()].filter(
    (m) =>
      m.createdTimestamp > oneDayAgo.getTime() &&
      m.author.id !== client.user!.id,
  );

  return filtered;
};

// Function to generate a map of links grouped by the base URL.
const generateLinkMap = (messages: Message[]): { [key: string]: string[] } => {
  const linkMap: { [key: string]: string[] } = {};

  messages
    .filter((m) => urlRegex.test(m.content))
    .forEach((m) => {
      const links = getLinksFromMessage(m);
      for (const link of links) {
        try {
          const url = new URL(link);
          const base = url.hostname;

          if (!linkMap[base]) linkMap[base] = [];
          linkMap[base].push(link);
        } catch (e) {
          console.error(`Invalid URL: ${link}`);
        }
      }
    });

  return linkMap;
};

client.once(Events.ClientReady, () => {
  console.log('Bot is ready 🚀');
});

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
