jest.mock('node-fetch', () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock('twitter-api-v2', () => ({
  TwitterApi: jest.fn().mockReturnValue({
    v1: {
      uploadMedia: jest.fn(),
    },
  }),
}));

jest.mock('ffmpeg');

const mockOriginalImage = Buffer.from('mockOriginalImage');

const mockImageWithLogo = Buffer.from('mockImageWithLogo');

jest.mock('./image-scripts/addLogoToImage', () => ({
  addLogoToImage: jest.fn().mockImplementation(() => {
    return Promise.resolve(mockImageWithLogo);
  }),
}));

import { uploadMeme } from './tweetMeme';
import fetch from 'node-fetch';
import { TwitterApi } from 'twitter-api-v2';

test.each([
  /**
   * Add logo.
   */
  ['image/jpg', mockImageWithLogo],
  ['image/jpeg', mockImageWithLogo],
  ['image/png', mockImageWithLogo],
  /**
   * Don't add logo.
   */
  // ['video/mp4', mockOriginalImage], // this was breaking
  ['image/gif', mockOriginalImage],
])('test add logo to specific mime types only: %s', async (mimeType, image) => {
  const imageUrl = 'https://example.com/media/D-QZ_7fX0AAqZQ-.jpg';

  const message: any = {
    attachments: {
      first: () => ({
        contentType: mimeType,
        attachment: {
          toString: () => imageUrl,
        },
      }),
    },
  };

  (fetch as jest.Mock).mockImplementation((url: string) => {
    if (url === imageUrl) {
      return {
        arrayBuffer: () => Promise.resolve(mockOriginalImage),
      };
    }

    return Promise.reject();
  });

  const client = new TwitterApi();

  await uploadMeme(message);

  expect(client.v1.uploadMedia).toHaveBeenCalledWith(image, { mimeType });
});
