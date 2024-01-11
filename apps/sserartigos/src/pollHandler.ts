import { getArticles } from './common/utils/getArticles';
import { checkVotingAbility } from './common/utils/utils';
import { DiscordMessage } from './types';

/**
 * Messages that already have a poll.
 */
const messagesWithPoll = [];
const messagesWithLinkEmoji = [];

export const createPoll = (message: DiscordMessage) => {
  if (messagesWithPoll.includes(message.id) || !checkVotingAbility(message))
    return;

  messagesWithPoll.push(message.id);
  message.react('💯');
  message.react('👎');
};

export const addLinkEmoji = (message: DiscordMessage) => {
  const canAddEmoji =
    getArticles(message.content).length >= 1 && message.attachments.size === 0;

  if (messagesWithLinkEmoji.includes(message.id) || !canAddEmoji) {
    return;
  }

  messagesWithLinkEmoji.push(message.id);
  message.react('🔗');
};
