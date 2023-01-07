import { shouldBeVoted } from './common/utils/utils';
import { DiscordMessage } from './types';

/**
 * Messages that already have a poll.
 */
const messagesWithPoll = [];

export const createPoll = (message: DiscordMessage) => {
  if (messagesWithPoll.indexOf(message.id) !== -1 || !shouldBeVoted(message))
    return;

  messagesWithPoll.push(message.id);
  message.react('💯');
  message.react('👎');
};
