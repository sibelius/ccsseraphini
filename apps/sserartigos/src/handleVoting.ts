import {
  Collection,
  Message,
  MessageReaction,
  PartialMessage,
  User,
} from 'discord.js';
import { shouldBeVoted } from './common/utils/utils';
import { getArticles } from './common/utils/getArticles';
import { postAllArticles } from './fansfy';
import { handleError } from './notification';
import { EMOJIS_POINTS, MIN_POINTS_TO_PUSH } from './score';
import { createPoll } from './pollHandler';
import { DiscordMessage } from './types';

/**
 * Messages that already have been tweeted since the last time the bot was
 * restarted.
 */
const messagesAlreadyVoted = [];

export const handleVoting = (reaction: MessageReaction, user: User) => {
  const message = reaction.message;

  if (shouldBeVoted(message)) {
    createPoll(message);
  }

  if (shouldNotFinishVoting(user, message)) {
    return;
  }

  messagesAlreadyVoted.push(message.id);

  const links = getArticles(message.content);

  postAllArticles(links)
    .then(() => message.react('🚀'))
    .catch((e) => handleError(e, message));
};

const isVotingDone = (message: DiscordMessage): boolean => {
  return calculateScore(message.reactions.cache) >= MIN_POINTS_TO_PUSH;
};

export const calculateScore = (
  reactions: Collection<string, MessageReaction>,
) => {
  return reactions.reduce((acc, value, key) => {
    const points = EMOJIS_POINTS[key] ?? 0;
    return (value.count - 1) * points + acc;
  }, 0);
};

const shouldNotFinishVoting = (user: User, message: DiscordMessage) => {
  return (
    user.bot ||
    !shouldBeVoted(message) ||
    !isVotingDone(message) ||
    messagesAlreadyVoted.includes(message.id)
  );
};
