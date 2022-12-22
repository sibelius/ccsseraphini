import { TwitterApi } from 'twitter-api-v2';

type AddMetadataParams = {
  mediaId: string;
  alt: string;
  mimeType: string;
};

export const addMetadata = async (
  client: TwitterApi,
  params: AddMetadataParams,
) => {
  const { mediaId, alt, mimeType } = params;

  if (mimeType.includes('image') && alt?.trim().length > 0) {
    await client.v1.createMediaMetadata(mediaId, {
      alt_text: {
        text: alt,
      },
    });
  }
};
