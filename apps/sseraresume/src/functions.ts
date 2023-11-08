import { Message, Snowflake, TextChannel } from 'discord.js';
import { urlRegex } from './constants';

import { client } from './index';

// Function to format message links.
export const formatMessageLinks = (title: string, links: string[]): string =>
  `### ${title}\n${links.map((link) => `- <${link}>`).join('\n')}`;

// Function to get links from a message.
export const getLinksFromMessage = (message: Message): string[] =>
  Array.from(message.content.matchAll(urlRegex), (m) => m[0]);

// Function to fetch messages from a channel that were sent in the last 24 hours.
export const fetchMessages = async (
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
export const generateLinkMap = (
  messages: Message[],
): { [key: string]: string[] } => {
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
