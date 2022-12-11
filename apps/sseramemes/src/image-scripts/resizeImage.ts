import { TWITTER_IMAGE_SIZE } from './index';
import sharp from 'sharp';

export const resizeImage = async (buffer: Buffer): Promise<Buffer> => {
  const { width, height } = await sharp(buffer).metadata();
  const i = sharp(buffer);
  if (height > TWITTER_IMAGE_SIZE) i.resize(null, TWITTER_IMAGE_SIZE);
  if (width > TWITTER_IMAGE_SIZE) i.resize(TWITTER_IMAGE_SIZE, null);
  return await i.toBuffer();
};
