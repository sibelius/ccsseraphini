import { Message } from 'discord.js';
import { config } from './config';

export const shouldBeVoted = (message: Message): boolean => {
  return (
    message.author.id == config.LISTENED_USER_ID &&
    getArticles(message.content).length >= 1
  );
};

export const getArticles = (messageContent: string): string[] => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return urlRegex.exec(messageContent) ?? [];
};
