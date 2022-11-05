import fs from 'fs';
import ffmpeg from 'ffmpeg';
import path from 'path';
import Jimp from 'jimp';

export const addLogoToVideo = async (video: Buffer): Promise<Buffer> => {
  // save buffer in a temp file
  await fs.promises.writeFile('temp.mp4', video);
  const videoEditor = await new ffmpeg('temp.mp4');

  const logo = await Jimp.read(path.join(process.cwd(), './static/logo.png'));
  logo.resize(40, 40);
  const logoBuffer = await logo.getBufferAsync(logo.getMIME());
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
    await fs.promises.unlink('temp.mp4');
    await fs.promises.unlink('temp-logo.png');
    await fs.promises.unlink('temp-video-with-logo.mp4');

    return videoWithLogo;
  } catch (e) {
    console.log(e);
  }
};
