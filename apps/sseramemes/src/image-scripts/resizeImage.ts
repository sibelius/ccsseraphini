import Jimp from 'jimp';
const TWITTER_IMAGE_SIZE = 504;

export const resizeImage = async (buffer: Buffer): Promise<Buffer> => {
  const image: Jimp = await Jimp.read(buffer);
  if (image.getHeight() > TWITTER_IMAGE_SIZE) {
    image.resize(Jimp.AUTO, TWITTER_IMAGE_SIZE).quality(100);
  }
  if (image.getWidth() > TWITTER_IMAGE_SIZE) {
    image.resize(TWITTER_IMAGE_SIZE, Jimp.AUTO).quality(100);
  }
  return await image.getBufferAsync(image.getMIME());
};
