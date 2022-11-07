import fs from 'fs';
import ffmpeg from 'ffmpeg';
import path from 'path';
import Jimp from 'jimp';

export const addLogoToVideo = async (
  video: Buffer,
  mimeType: string,
): Promise<Buffer> => {
  // save buffer in a temp file
  console.time('save video');
  console.time('create temp file & get buffer');
  console.log('creating temp file');
  const tempFilePath = `temp.${mimeType.split('/')[1]}`;
  await fs.promises.writeFile(tempFilePath, video);
  const videoEditor = await new ffmpeg(tempFilePath);
  console.timeEnd('create temp file & get buffer');
  console.log('got temp file buffer');
  console.log('creating logo');
  console.time('create logo');
  const logo = await Jimp.read(path.join(process.cwd(), './static/logo.png'));
  logo.resize(40, 40);
  const logoBuffer = await logo.getBufferAsync(logo.getMIME());

  await fs.promises.writeFile('temp-logo.png', logoBuffer);

  console.log('created logo');
  console.timeEnd('create logo');
  try {
    console.log('adding logo to video');
    console.time('add logo to video');
    await videoEditor.fnAddWatermark(
      path.join(process.cwd(), './temp-logo.png'),
      'temp-video-with-logo.mp4',
      { position: 'SW' },
    );
    console.timeEnd('add logo to video');
    console.time('get buffer');
    const videoWithLogo = await fs.promises.readFile(
      'temp-video-with-logo.mp4',
    );
    console.timeEnd('get buffer');

    console.log(
      'getting buffer of video with logo its type is:',
      typeof videoWithLogo,
    );
    // remove files
    console.time('remove temp files');
    await fs.promises.unlink(tempFilePath);
    await fs.promises.unlink('temp-logo.png');
    await fs.promises.unlink('temp-video-with-logo.mp4');
    console.timeEnd('remove temp files');
    console.log('removed all temp files and returning buffer');
    console.timeEnd('save video');
    return videoWithLogo;
  } catch (e) {
    console.log(e);
  }
};
