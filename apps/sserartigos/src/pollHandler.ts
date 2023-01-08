import { checkVotingAbility } from './common/utils/utils';
import { DiscordMessage } from './types';

/**
 * Messages that already have a poll.
 */
const messagesWithPoll = [];

export const createPoll = (message: DiscordMessage) => {
  if (messagesWithPoll.includes(message.id) || !checkVotingAbility(message))
    return;

  messagesWithPoll.push(message.id);
  message.react('💯');
  message.react('👎');
};
