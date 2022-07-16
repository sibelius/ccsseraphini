import { Message, PartialMessage } from 'discord.js';
import { TweetV1, TwitterApi } from 'twitter-api-v2';
import fetch from 'node-fetch';
import { RETWEET_MEME_TIMEOUT } from './score';
import { addLogoToImage, resizeImage } from './image-scripts';
import { getMessageContent } from './getMessageContent';

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
   * If the buffer is an image, we resize it then add logo.
   */
  if (ALLOWED_MEME_TYPES_TO_ADD_LOGO.includes(mimeType)) {
    const resizedImage = await resizeImage(buffer);
    newBuffer = await addLogoToImage(resizedImage);
  }

  try {
    return await client.v1.uploadMedia(newBuffer, { mimeType });
  } catch (err) {
    console.error(err);
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

  const content = await getMessageContent(message);

  const tweet = await client.v1.tweet(content, {
    media_ids: mediaIds,
  });

  scheduleRetweet(tweet);

  const tweetUrl = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;

  return { tweetUrl };
};
