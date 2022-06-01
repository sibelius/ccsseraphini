import { Message, PartialMessage } from 'discord.js';
import { TwitterApi, TweetV1 } from 'twitter-api-v2';
import fetch from 'node-fetch';
import { RETWEET_MEME_TIMEOUT } from './config';
import { addLogoToImage } from './addLogoToImage';

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

export const ALLOWED_MEME_TYPES_TO_ADD_LOGO = [
  'image/jpg',
  'image/jpeg',
  'image/png',
];

export const uploadMeme = async (message: Message | PartialMessage) => {
  const attachment = message.attachments.first();

  const image = await fetch(attachment.attachment.toString());

  let buffer = Buffer.from(await image.arrayBuffer());

  let newBuffer = buffer;

  const mimeType = attachment.contentType;

  /**
   * If the buffer is a image, we add logo.
   */
  if (ALLOWED_MEME_TYPES_TO_ADD_LOGO.includes(mimeType)) {
    newBuffer = await addLogoToImage(buffer);
  }

  try {
    const mediaId = await client.v1.uploadMedia(newBuffer, { mimeType });
    return mediaId;
  } catch {
    return undefined;
  }
};

/**
 * Retweet the tweet after timeout.
 */
const scheduleRetweet = (tweet: TweetV1) => {
  setTimeout(async () => {
    try {
      await client.v1.post(`statuses/retweet/${tweet.id_str}.json`);
    } catch (err) {
      console.error(err);
    }
  }, RETWEET_MEME_TIMEOUT);
};

export const tweetMeme = async (message: Message | PartialMessage) => {
  const mediaId = await uploadMeme(message);

  const mediaIds = mediaId ? [mediaId] : undefined;
  
  const messageContent = message.content.replace(/@\\[A-Za-z0-9_]{4,15}/mg,'').replace(/(@[A-Za-z0-9_]{4,15})#[\d]{1,}/mg,'$1');

  const tweet = await client.v1.tweet(messageContent, {
    media_ids: mediaIds,
  });

  scheduleRetweet(tweet);

  const tweetUrl = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;

  return { tweetUrl };
};
