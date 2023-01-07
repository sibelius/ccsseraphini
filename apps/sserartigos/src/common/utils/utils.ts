import { Message, PartialMessage } from 'discord.js';
import { config } from '../../config';
import { getArticles } from './getArticles';

export const shouldBeVoted = (message: Message | PartialMessage): boolean => {
  return (
    config.LISTENED_USERS_ID.some((value) => value === message.author.id) &&
    getArticles(message.content).length >= 1 &&
    message.attachments.size === 0
  );
};
