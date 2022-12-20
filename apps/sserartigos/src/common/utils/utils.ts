import { Message, PartialMessage } from 'discord.js';
import { config } from '../../config';

export const shouldBeVoted = (message: Message | PartialMessage): boolean => {
  return (
    config.LISTENED_USERS_ID.some((value) => value === message.author.id) &&
    getArticles(message.content).length >= 1
  );
};

export const getArticles = (messageContent: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return messageContent.match(urlRegex) ?? [];
};
