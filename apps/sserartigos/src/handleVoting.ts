import { Collection, MessageReaction, User } from 'discord.js';
import { checkVotingAbility } from './common/utils/utils';
import { getArticles } from './common/utils/getArticles';
import { postAllArticles } from './fansfy';
import { handleError } from './notification';
import { EMOJIS_POINTS, MIN_POINTS_TO_PUSH } from './score';
import { DiscordMessage } from './types';
import { tweetArticles } from './tweet';
import { createPoll } from './pollHandler';

/**
 * Messages that already have been tweeted since the last time the bot was
 * restarted.
 */
const messagesAlreadyVoted = [];

export const handleVoting = (reaction: MessageReaction, user: User) => {
  const message = reaction.message;
  const shouldBeVoted = checkVotingAbility(message);
  const shouldNotFinishVoting = checkNotFinishVoting(user, message);

  shouldBeVoted ? createPoll(message) : {};

  if (shouldNotFinishVoting) {
    return;
  }

  messagesAlreadyVoted.push(message.id);

  const links = getArticles(message.content);

  postAllArticles(links)
    .then(() => message.react('🚀'))
    .catch((e) => handleError(e, message));

  tweetArticles(links)
    .then(() => message.react('🐦'))
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

const checkNotFinishVoting = (user: User, message: DiscordMessage) => {
  return (
    user.bot ||
    !checkVotingAbility(message) ||
    !isVotingDone(message) ||
    messagesAlreadyVoted.includes(message.id)
  );
};
