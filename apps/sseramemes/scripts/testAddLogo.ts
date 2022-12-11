import fetch from 'node-fetch';
import * as fs from 'fs';
import { addLogoToImage } from '../src/image-scripts';

const testMeme = async () => {
  const image = await fetch(
    'https://pbs.twimg.com/media/FSbQR8oXsAIKkQz?format=png&name=900x900',
  );

  const buffer = Buffer.from(await image.arrayBuffer());
  const bufferWithWatermark = await addLogoToImage(buffer);

  /**
   * Save bufferWithWatermark to file.
   */
  await fs.promises.writeFile('test.png', bufferWithWatermark);
};

testMeme().then();
