import {
  Collection,
  Message,
  MessageReaction,
  PartialMessage,
  User,
} from 'discord.js';
import { EMOJIS_POINTS, MIN_POINTS_TO_PUSH } from './score';
import { shouldBeVoted } from './utils';

/**
 * Messages that already have been tweeted since the last time the bot was
 * restarted.
 */
const messagesAlreadyVoted = [];

export const handleVoting = (reaction: MessageReaction, user: User) => {
  if (dontShouldPushToGithub(user, reaction.message)) return;

  messagesAlreadyVoted.push(reaction.message.id);
};

export const createPoll = (message: Message) => {
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
const dontShouldPushToGithub = (
  user: User,
  message: Message | PartialMessage,
) => {
  return (
    user.bot ||
    !shouldBeVoted(message) ||
    !isVotingDone(message) ||
    messagesAlreadyVoted.includes(message.id)
  );
};
