import {
  MessageReaction,
  PartialMessageReaction,
  Message,
  PartialMessage,
} from 'discord.js';
import { tweetMeme } from './tweetMeme';
import { MIN_POINTS_TO_TWEET } from './config';

export const emojisPoints = {
  '💯': 1,
  '👎': -3,
};

const isMessageFromChannelMemes = (
  message: Message | PartialMessage,
): boolean => {
  return message.channelId === process.env.DISCORD_MEMES_CHANNEL_ID;
};

/**
 * Conditions to be a meme:
 *
 * - Check if the message is from the memes channel.
 * - Check if message has 1 attachment.
 */
export const isMeme = async (
  msg: MessageReaction | PartialMessageReaction | Message,
): Promise<boolean> => {
  let message: Message | PartialMessage;

  if ('message' in msg) {
    /**
     * Message from reactions event.
     */
    message = msg.message;
  } else {
    /**
     * Message from messageCreate event.
     */
    message = msg;
  }

  if (!isMessageFromChannelMemes(message)) {
    return false;
  }

  if (message.attachments.size !== 1) {
    return false;
  }

  return true;
};

export const handleMemeVoting = async (
  message: MessageReaction | PartialMessageReaction,
) => {
  if (!(await isMeme(message))) {
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

  const { tweetUrl } = await tweetMeme(message.message);

  await message.message.channel.send(`${tweetUrl} 🚀`);
};
