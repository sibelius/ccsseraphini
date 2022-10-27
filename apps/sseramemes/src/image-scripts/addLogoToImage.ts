import Jimp from 'jimp';
import * as path from 'path';
import { resizeImage, TWITTER_IMAGE_SIZE } from './index';

export const addLogoToImage = async (buffer: Buffer): Promise<Buffer> => {
  const logo: Jimp = await Jimp.read(
    path.join(process.cwd(), './static/logo.png'),
  );
  logo.resize(40, 40);
  const meme: Jimp = await Jimp.read(buffer);
  if (
    meme.getHeight() < TWITTER_IMAGE_SIZE &&
    meme.getWidth() < TWITTER_IMAGE_SIZE
  ) {
    logo.opacity(0.5);
  }
  meme.composite(logo, meme.getWidth() - 50, meme.getHeight() - 50);
  const memeBuffer = await meme.getBufferAsync(meme.getMIME());
  return await resizeImage(memeBuffer);
};
