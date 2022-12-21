import { TwitterApi } from 'twitter-api-v2';

type addMetadataParams = {
  mediaId: string;
  alt: string;
  mimeType: string;
};

export const addMetadata = async (
  client: TwitterApi,
  params: addMetadataParams,
) => {
  const { mediaId, alt, mimeType } = params;

  if (mimeType.includes('image') && alt) {
    await client.v1.createMediaMetadata(mediaId, {
      alt_text: {
        text: alt,
      },
    });
  }
};
