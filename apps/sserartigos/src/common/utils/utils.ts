import { config } from '../../config';
import { DiscordMessage } from '../../types';
import { getArticles } from './getArticles';

export const checkVotingAbility = (message: DiscordMessage): boolean => {
  return (
    shouldCreatePoll(message) &&
    getArticles(message.content).length >= 1 &&
    message.attachments.size === 0
  );
};

function shouldCreatePoll(message: DiscordMessage): boolean {
  return config.IGNORED_CHANNELS.every((value) => value !== message.channelId);
}
