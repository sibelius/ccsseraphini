import { addLogoToGif } from '../src/image-scripts/addLogoToGif';
import { GifUtil } from 'gifwrap';
import * as fs from 'fs';

const testAddLogoToGif = async () => {
  const gif = await GifUtil.read('test.gif');
  const gifWithWatermark = await addLogoToGif(gif.buffer);

  /**
   * Save bufferWithWatermark to file.
   */
  await fs.promises.writeFile('test-logo.gif', gifWithWatermark);
};

testAddLogoToGif().then();
