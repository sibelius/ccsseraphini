import {
  MessageReaction,
  PartialMessageReaction,
  Message,
  PartialMessage,
} from 'discord.js';
import { tweetMeme } from './tweetMeme';
import { MIN_POINTS_TO_TWEET_MEME, EMOJIS_POINTS } from './score';
import { memeConditions } from './types';

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

  const conditionsToBeAMeme: memeConditions = [
    isMessageFromChannelMemes(message),
    message.attachments.size == 1,
  ];

  return !conditionsToBeAMeme.includes(false);
};

/**
 * Messages that already have been tweeted since the last time the bot was
 * restarted.
 */
const messagesAlreadyTweeted = [];

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

    if (EMOJIS_POINTS[emoji]) {
      /**
       * `count - 1` to ignore bot's reaction.
       */
      return counter + EMOJIS_POINTS[emoji] * (count - 1);
    }

    return counter;
  }, 0);

  if (points < MIN_POINTS_TO_TWEET_MEME) {
    return;
  }

  if (messagesAlreadyTweeted.includes(message.message.id)) {
    /**
     * Message has already been tweeted.
     */
    return;
  }

  messagesAlreadyTweeted.push(message.message.id);

  try {
    const { tweetUrl } = await tweetMeme(message.message);
    await message.message.channel.send(`🚀 ${tweetUrl}`);
  } catch (error) {
    await message.message.channel.send(`🚨 Error: ${error.message}`);
  }
};
