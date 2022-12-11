import { addLogoToImage } from './index';
export const addLogoToGif = async (buffer: Buffer): Promise<Buffer> => {
  return addLogoToImage(buffer, true);
};
