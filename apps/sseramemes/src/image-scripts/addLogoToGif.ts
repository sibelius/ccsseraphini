import { BitmapImage, GifCodec, GifFrame, GifUtil } from 'gifwrap';
import Jimp from 'jimp';
import { addLogoToImage } from './index';

const codec = new GifCodec();
export const addLogoToGif = async (buffer: Buffer): Promise<Buffer> => {
  const gif = await codec.decodeGif(buffer);

  const p = gif.frames.map(async (frame) => {
    const jimpImage = GifUtil.copyAsJimp(Jimp, frame);
    const buffer = await jimpImage.getBufferAsync(jimpImage.getMIME());
    const buffWithLogo = await addLogoToImage(buffer);
    const frameWithLogo = await Jimp.read(buffWithLogo);
    const bitmap = new BitmapImage(frameWithLogo.bitmap);
    GifUtil.quantizeDekker(bitmap, 256);
    return new GifFrame(bitmap);
  });
  const gifWithLogo = await Promise.all(p);
  const buf = await codec.encodeGif(gifWithLogo, { loops: 0 });
  return buf.buffer;
};
