import { MessageReaction, PartialMessageReaction, Message } from 'discord.js';
import { tweetMeme } from './tweetMeme';

export const emojisPoints = {
  '🚀': 1,
  '👎': -3,
};

const MIN_POINTS_TO_TWEET = 3;

/**
 * TODO
 */
const isMessageFromChannelMemes = (
  message: MessageReaction | PartialMessageReaction,
): boolean => {
  return true;
};

/**
 * TODO
 */
export const isMeme = async (
  message: MessageReaction | PartialMessageReaction | Message,
): Promise<boolean> => {
  return true;
};

export const handleMemeVoting = async (
  message: MessageReaction | PartialMessageReaction,
) => {
  if (!isMessageFromChannelMemes(message)) {
    return;
  }

  if (!isMeme(message)) {
    return;
  }

  /**
   * Calculate message points.
   */
  const points = message.message.reactions.cache.reduce((counter, reaction) => {
    const emoji = reaction.emoji.name;
    const count = reaction.count;

    if (emojisPoints[emoji]) {
      /**
       * `count - 1` to ignore bot's reaction.
       */
      return counter + emojisPoints[emoji] * (count - 1);
    }

    return counter;
  }, 0);

  if (points < MIN_POINTS_TO_TWEET) {
    return;
  }

  const { tweetUrl } = await tweetMeme(message);

  await message.message.channel.send(tweetUrl);
};
