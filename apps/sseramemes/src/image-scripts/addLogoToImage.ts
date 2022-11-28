import sharp from 'sharp';
import * as path from 'path';
import { resizeImage, TWITTER_IMAGE_SIZE } from './index';

/**
 * This is a workaround
 * @deprecated
 * @param height
 * @param width
 */
const getLogoWithOpacity = (height: number, width: number): string => {
  if (height < TWITTER_IMAGE_SIZE || width < TWITTER_IMAGE_SIZE)
    return './static/logo-opacity.png';

  return './static/logo.png';
};
const compositionOptions = (height: number, width: number, isGif: boolean) => {
  if (isGif) {
    return {
      gravity: 'southeast',
    };
  }
  return {
    top: height - 40,
    left: width - 40,
  };
};
export const getLogoBuffer = async (defaultURL = './static/logo.png') => {
  const logo = await sharp(path.join(process.cwd(), defaultURL)).resize(40, 40);
  return logo.toBuffer();
};
export const addLogoToImage = async (
  buffer: Buffer,
  animated = false,
): Promise<Buffer> => {
  const { width, height } = await sharp(buffer, { animated }).metadata();

  // TODO: Make add opacity to logo when is smaller than TWITTER_IMAGE_SIZE
  const logoURL = getLogoWithOpacity(height, width);
  const logo = await getLogoBuffer(logoURL);
  const options = compositionOptions(height, width, animated);
  const meme = await sharp(buffer)
    .composite([
      {
        input: logo,
        ...options,
      },
    ])
    .toBuffer();
  return await resizeImage(meme);
};
