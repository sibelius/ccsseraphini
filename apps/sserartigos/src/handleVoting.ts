import { Message } from 'discord.js';
import { shouldBeVoted } from './utils';

export const handleVoting = () => {};

export const addVoting = (message: Message) => {
  if (!shouldBeVoted(message)) return;

  message.react('💯');
  message.react('👎');
};
