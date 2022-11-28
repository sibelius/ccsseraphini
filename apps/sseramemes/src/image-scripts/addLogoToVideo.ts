import fs from 'fs';
import ffmpeg from 'ffmpeg';
import path from 'path';
import { getLogoBuffer } from './addLogoToImage';

export const addLogoToVideo = async (
  video: Buffer,
  mimeType: string,
): Promise<Buffer> => {
  // save buffer in a temp file
  const tempFilePath = `temp.${mimeType.split('/')[1]}`;
  await fs.promises.writeFile(tempFilePath, video);
  const videoEditor = await new ffmpeg(tempFilePath);
  const logoBuffer = await getLogoBuffer();

  await fs.promises.writeFile('temp-logo.png', logoBuffer);

  try {
    await videoEditor.fnAddWatermark(
      path.join(process.cwd(), './temp-logo.png'),
      'temp-video-with-logo.mp4',
      { position: 'SW' },
    );
    const videoWithLogo = await fs.promises.readFile(
      'temp-video-with-logo.mp4',
    );

    // remove files
    await fs.promises.unlink(tempFilePath);
    await fs.promises.unlink('temp-logo.png');
    await fs.promises.unlink('temp-video-with-logo.mp4');

    return videoWithLogo;
  } catch (e) {
    console.log(e);
  }
};
