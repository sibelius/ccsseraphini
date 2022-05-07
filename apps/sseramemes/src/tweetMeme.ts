import { Message, PartialMessage } from 'discord.js';
import { TwitterApi } from 'twitter-api-v2';
import fetch from 'node-fetch';

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

  try {
    const mediaId = await client.v1.uploadMedia(buffer, {
      mimeType: attachment.contentType,
    });

    return mediaId;
  } catch {
    return undefined;
  }
};

export const tweetMeme = async (message: Message | PartialMessage) => {
  const mediaId = await uploadMeme(message);

  const mediaIds = mediaId ? [mediaId] : undefined;

  const { id_str, user } = await client.v1.tweet(message.content, {
    media_ids: mediaIds,
  });

  const tweetUrl = `https://twitter.com/${user.screen_name}/status/${id_str}`;

  return { tweetUrl };
};
