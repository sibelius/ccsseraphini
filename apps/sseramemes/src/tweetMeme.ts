import { Message, PartialMessage } from 'discord.js';
import { TwitterApi, TweetV1 } from 'twitter-api-v2';
import fetch from 'node-fetch';
import Jimp from 'jimp';
import { RETWEET_MEME_TIMEOUT } from './config';

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const uploadMeme = async (message: Message | PartialMessage) => {
  const attachment = message.attachments.first();

  const image = await fetch(attachment.attachment.toString());

  const buffer = Buffer.from(await image.arrayBuffer());
  const bufferWithWatermark = await addWatermark(buffer);

  try {
    const mediaId = await client.v1.uploadMedia(bufferWithWatermark, {
      mimeType: attachment.contentType,
    });

    return mediaId;
  } catch {
    return undefined;
  }
};

const addWatermark = async (buffer: Buffer): Promise<Buffer> => {
  const watermark: Jimp = await new Promise<Jimp>((resolve) =>
    Jimp.read('../static/watermark.png').then((image: Jimp) =>
      resolve(image.resize(30, 30)),
    ),
  );

  return new Promise((resolve, reject) => {
    Jimp.read(buffer)
      .then(async (image: Jimp) => {
        image.mask(
          watermark,
          Jimp.HORIZONTAL_ALIGN_LEFT,
          Jimp.VERTICAL_ALIGN_BOTTOM,
        );
        const buffer = await image.getBufferAsync(image.getMIME());
        resolve(buffer);
      })
      .catch((err) => reject(err));
  });
};

/**
 * Retweet the tweet after timeout.
 */
const scheduleRetweet = (tweet: TweetV1) => {
  setTimeout(async () => {
    try {
      await client.v1.post(`statuses/retweet/${tweet.id}.json`);
    } catch (err) {
      console.error(err);
    }
  }, RETWEET_MEME_TIMEOUT);
};

export const tweetMeme = async (message: Message | PartialMessage) => {
  const mediaId = await uploadMeme(message);

  const mediaIds = mediaId ? [mediaId] : undefined;

  const tweet = await client.v1.tweet(message.content, {
    media_ids: mediaIds,
  });

  scheduleRetweet(tweet);

  const tweetUrl = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;

  return { tweetUrl };
};
