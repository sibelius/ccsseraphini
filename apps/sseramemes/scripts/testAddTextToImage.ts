import fetch from 'node-fetch';
import * as fs from 'fs';
import { addLogoToImage, addTextToImage } from '../src/image-scripts';
import { Message } from 'discord.js';

const testMeme = async () => {
  const image = await fetch(
    'https://pbs.twimg.com/media/FSbQR8oXsAIKkQz?format=png&name=900x900',
  );

  const buffer = Buffer.from(await image.arrayBuffer());
  const bufferWithText = await addTextToImage(
    {
      content:
        ';meme text="eai jeff" position="top-center" location="north" color="xlarge-black"',
    } as Message,
    buffer,
  );
  const bufferWithWatermark = await addLogoToImage(bufferWithText);
  /**
   * Save bufferWithWatermark to file.
   */
  await fs.promises.writeFile('test.png', bufferWithWatermark);
};

testMeme().then();
