import Jimp from 'jimp';
import * as path from 'path';
import { resizeImage } from './index';

export const addLogoToImage = async (buffer: Buffer): Promise<Buffer> => {
  const logo: Jimp = await Jimp.read(
    path.join(process.cwd(), './static/logo.png'),
  );
  logo.resize(40, 40);
  const meme: Jimp = await Jimp.read(buffer);
  meme.composite(logo, meme.getWidth() - 50, meme.getHeight() - 50);
  const memeBuffer = await meme.getBufferAsync(meme.getMIME());
  return await resizeImage(memeBuffer);
};
