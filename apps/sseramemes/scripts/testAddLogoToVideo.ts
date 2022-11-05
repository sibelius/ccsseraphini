import * as fs from 'fs';
import { addLogoToVideo } from '../src/image-scripts/addLogoToVideo';
/**
 * For testing, please do have a video file in the root of the project named raw.mp4
 */
const testAddLogoToVideo = async () => {
  const video = await fs.promises.readFile('raw.mp4');

  const bufferWithWatermark = await addLogoToVideo(video);

  /**
   * Save bufferWithWatermark to file.
   */
  await fs.promises.writeFile('test-video.mp4', bufferWithWatermark);
};

testAddLogoToVideo().then();
