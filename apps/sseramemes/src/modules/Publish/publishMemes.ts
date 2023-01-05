import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { publishOnInstagram } from './publishOnInstagram';

const client = new S3Client({});

type PublishMemesInput = {
  id: string;
  description?: string;
  medias: {
    mimeType: string;
    alt?: string;
    buffer: Buffer;
  }[];
};

export const uploadMediasOnS3 = async ({
  id,
  description,
  medias,
}: PublishMemesInput) => {
  const mediasOnS3 = await Promise.all(
    medias.map(async ({ mimeType, alt, buffer }, index) => {
      const key = `memes/${id}/media_${index}.${mimeType.split('/')[1]}`;

      await client.send(
        new PutObjectCommand({
          Body: buffer,
          Bucket: process.env.AWS_BUCKET_NAME,
          ContentType: mimeType,
          Key: key,
          Metadata: {
            alt,
            description,
          },
        }),
      );

      const url = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;

      return { key, mimeType, alt, url };
    }),
  );

  return mediasOnS3;
};

export const publishMemes = async ({
  id,
  description,
  medias,
}: PublishMemesInput) => {
  const mediasOnS3 = await uploadMediasOnS3({ id, description, medias });

  try {
    await publishOnInstagram({
      description,
      medias: mediasOnS3,
    });
  } catch (error) {
    console.error(error);
  }
};
