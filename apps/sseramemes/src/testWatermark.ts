import fetch from 'node-fetch';
import Jimp from 'jimp';
import * as path from 'path';
import * as fs from 'fs';

const addWatermark = async (buffer: Buffer): Promise<Buffer> => {
  const watermark: Jimp = await Jimp.read(
    path.join(process.cwd(), './static/watermark.png'),
  );
  watermark.resize(40, 40);
  const meme: Jimp = await Jimp.read(buffer);
  meme.composite(watermark, meme.getWidth() - 50, meme.getHeight() - 50);
  return await meme.getBufferAsync(meme.getMIME());
};

const testMeme = async () => {
  const image = await fetch(
    'https://pbs.twimg.com/media/FSbQR8oXsAIKkQz?format=png&name=900x900',
  );

  const buffer = Buffer.from(await image.arrayBuffer());
  const bufferWithWatermark = await addWatermark(buffer);

  /**
   * Save bufferWithWatermark to file.
   */
  await fs.promises.writeFile('test.png', bufferWithWatermark);
};

testMeme().then();
