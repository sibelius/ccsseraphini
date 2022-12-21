import fs from 'fs';
import ffmpeg from 'ffmpeg';
import path from 'path';
import { getLogoBuffer } from './addLogoToImage';

/**
 * equivalent of a -an option
 * @param from{string} where the video is located
 * @param where {string} where the video will be saved
 */
const removeAudioFromVideo = async (from: string, where: string) => {
  const video = await new ffmpeg(from);
  await video.setDisableAudio();
  await video.save(where);
};
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
    await removeAudioFromVideo('temp-video-with-logo.mp4', 'temp-final.mp4');
    const videoWithLogo = await fs.promises.readFile('temp-final.mp4');

    // remove files
    await fs.promises.unlink(tempFilePath);
    await fs.promises.unlink('temp-logo.png');
    await fs.promises.unlink('temp-video-with-logo.mp4');
    await fs.promises.unlink('temp-final.mp4');

    return videoWithLogo;
  } catch (e) {
    console.log(e);
  }
};
