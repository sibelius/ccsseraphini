import { Message } from 'discord.js';
import { shouldBeVoted } from './utils';

export const handleVoting = () => {};

export const addVoting = (message: Message) => {
  if (!shouldBeVoted(message)) return;

  message.react('💯');
  message.react('👎');
};
const isVotingDone = (message: Message | PartialMessage): boolean => {
  return calculateScore(message.reactions.cache) >= MIN_POINTS_TO_PUSH;
};

export const calculateScore = (
  reactions: Collection<string, MessageReaction>,
): number => {
  return reactions.reduce((acc, value, key) => {
    const points = EMOJIS_POINTS[key] ?? 0;
    return (value.count - 1) * points + acc;
  }, 0);
};
