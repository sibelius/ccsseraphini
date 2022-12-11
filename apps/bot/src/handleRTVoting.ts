import {
  MessageReaction,
  PartialMessageReaction,
  Message,
  PartialMessage,
  User,
} from 'discord.js';
import { MIN_POINTS_TO_TWEET } from './score';
import { EMOJIS_POINTS, emojiRetweet } from './score';
import { config } from './config';
import { handleRT } from './handleRT';

const isMessageFromBotChannel = (
  message: Message | PartialMessage,
): boolean => {
  return message.channelId === config.DISCORD_BOT_CHANNEL_ID;
};

export const isTweet = (content: string) => {
  // extract id from twitter message
  const tokens = content?.split('/');

  if (tokens.length !== 6) {
    return false;
  }

  const tweetId = tokens[tokens.length - 1];

  if (!tweetId) {
    return false;
  }

  const url = new URL(content);

  if (url.origin !== 'https://twitter.com') {
    return false;
  }

  return true;
};

// not sure we need this
const messagesAlreadyRTTweeted = [];

export const handleRTVoting = async (
  message: MessageReaction | PartialMessageReaction,
  user: User,
) => {
  if (!isMessageFromBotChannel(message.message)) {
    return;
  }

  if (!isTweet(message.message.content)) {
    return;
  }

  // extract id from twitter message
  const tokens = message.message.content?.split('/');
  const tweetId = tokens[tokens.length - 1];

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

  // eslint-disable-next-line
  console.log('Points: ', {
    tweet: message.message.content,
    points,
  });

  // sibelius can automatically retweet the tweet
  if (user.username === 'sibelius') {
    if (message.emoji.name === '💯') {
      await handleRT(tweetId);

      await message.message.react(emojiRetweet);
      return;
    }
  }

  if (points < MIN_POINTS_TO_TWEET) {
    return;
  }

  if (messagesAlreadyRTTweeted.includes(message.message.id)) {
    /**
     * Message has already been tweeted.
     */
    return;
  }

  messagesAlreadyRTTweeted.push(message.message.id);

  await handleRT(tweetId);

  // eslint-disable-next-line
  console.log('RT: ', message.message.content);

  await message.message.react(emojiRetweet);
};
