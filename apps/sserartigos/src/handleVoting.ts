import {
  Collection,
  Message,
  MessageReaction,
  PartialMessage,
  User,
} from 'discord.js';
import { getArticles, shouldBeVoted } from './common/utils/utils';
import { postAllArticles } from './fansfy';
import { notifySuccess, handleError } from './notification';
import { EMOJIS_POINTS, MIN_POINTS_TO_PUSH } from './score';

/**
 * Messages that already have been tweeted since the last time the bot was
 * restarted.
 */
const messagesAlreadyVoted = [];

export const handleVoting = (reaction: MessageReaction, user: User) => {
  if (shouldNotFinishVoting(user, reaction.message)) return;

  messagesAlreadyVoted.push(reaction.message.id);

  const links = getArticles(reaction.message.content);
  const notification = reaction.message.reply('Postando artigos...');

  postAllArticles(links)
    .then(() => notifySuccess(notification))
    .catch((e) => handleError(e, notification));
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

const shouldNotFinishVoting = (
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
