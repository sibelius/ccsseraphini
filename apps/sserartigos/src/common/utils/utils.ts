import { config } from '../../config';
import { DiscordMessage } from '../../types';
import { getArticles } from './getArticles';

export const shouldBeVoted = (message: DiscordMessage): boolean => {
  return (
    shouldCreatePoll(message) &&
    getArticles(message.content).length >= 1 &&
    message.attachments.size === 0
  );
};

function shouldCreatePoll(message: DiscordMessage) {
  const reactions = message.reactions.valueOf();
  const shouldForcePoll = reactions.some(
    (item) => item.emoji.toString() === '🔗',
  );

  console.log('oi', shouldForcePoll, reactions.size);
  if (shouldForcePoll) return true;
  return config.LISTENED_USERS_ID.some((value) => value === message.author.id);
}
