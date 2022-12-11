import fetch from 'node-fetch';
import fs from 'fs';
import { resizeImage } from '../src/image-scripts';

const testMeme = async () => {
  const image = await fetch(
    'https://pbs.twimg.com/media/FSbQR8oXsAIKkQz?format=png&name=900x900',
  );

  const buffer = Buffer.from(await image.arrayBuffer());
  const resizedBuffer = await resizeImage(buffer);

  /**
   * Save resizedBuffer to file.
   */
  await fs.promises.writeFile('test.png', resizedBuffer);
};

testMeme().then();
