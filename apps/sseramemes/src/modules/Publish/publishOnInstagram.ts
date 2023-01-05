import fetch from 'node-fetch';

const GRAPH_API_ENDPOINT = 'https://graph.facebook.com/v15.0';

/**
 * Retrieves on `me/accounts` endpoint.
 * https://developers.facebook.com/tools/explorer?method=GET&path=me%2Faccounts&version=v15.0
 */
const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID;

/**
 * Retrieves on https://developers.facebook.com/tools/accesstoken/
 * How to get long lived token: https://developers.facebook.com/docs/pages/access-tokens
 */
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

const postMedia = async ({
  caption,
  imageUrl,
  isCarouselItem,
  mediaType,
  children,
}: {
  caption?: string;
  imageUrl?: string;
  isCarouselItem?: boolean;
  mediaType?: 'CAROUSEL' | undefined;
  /**
   * Used for carousel items.
   */
  children?: string[];
}) => {
  const queryParametersObj = {
    access_token: INSTAGRAM_ACCESS_TOKEN,
    caption,
    image_url: imageUrl,
    is_carousel_item: isCarouselItem,
    media_type: mediaType,
    children: children?.join(','),
  };

  const queryParameters = Object.entries(queryParametersObj)
    .filter(([, value]) => {
      return value;
    })
    .map(([key, value]) => {
      return `${key}=${encodeURIComponent(value as string)}`;
    })
    .join('&');

  const { id, error } = await fetch(
    `${GRAPH_API_ENDPOINT}/${INSTAGRAM_ACCOUNT_ID}/media?${queryParameters}`,
    {
      method: 'POST',
    },
  ).then((res) => {
    return res.json() as Promise<{ id: string; error?: any }>;
  });

  if (error) {
    throw error;
  }

  return { id };
};

const createCarouselContainer = async (args: any) => {
  // TODO
  return { id: 'id' };
};

const postMediaPublish = async ({ creationId }: { creationId: string }) => {
  const response = await fetch(
    `${GRAPH_API_ENDPOINT}/${INSTAGRAM_ACCOUNT_ID}/media_publish?creation_id=${creationId}&access_token=${INSTAGRAM_ACCESS_TOKEN}`,
    {
      method: 'POST',
    },
  ).then((res) => {
    return res.json() as Promise<{ id: string; error?: any }>;
  });

  if (response.error) {
    throw response.error;
  }

  return response;
};

const getMedia = async ({ mediaId }: { mediaId: string }) => {
  const response = await fetch(
    `${GRAPH_API_ENDPOINT}/${mediaId}?fields=permalink&access_token=${INSTAGRAM_ACCESS_TOKEN}`,
  ).then((res) => {
    return res.json() as Promise<{ permalink: string }>;
  });

  return response;
};

const hashtags = [
  '#sseramemes',
  '#memes',
  '#programação',
  '#frontend',
  '#backend',
  '#fullstack',
  '#desenvolvedor',
  '#desenvolvedores',
  '#programador',
  '#programadores',
  '#cienciadacomputacao',
  '#sistemasdeinformação',
  '#engenhariadesoftware',
  '#developer',
  '#computacao',
  '#vidadeprogramador',
];

const uniqueHashtags = hashtags.filter((hashtag, index) => {
  return hashtags.indexOf(hashtag) === index;
});

export const publishOnInstagram = async ({
  description,
  medias,
}: {
  description: string;
  medias: {
    url: string;
  }[];
}) => {
  const caption = `${description}\n\n${uniqueHashtags.join(' ')}`;

  const urls = medias.map((media) => media.url);

  const creationId = await (async () => {
    if (urls.length === 1) {
      const { id } = await postMedia({
        caption,
        imageUrl: urls[0],
      });

      return id;
    }

    const { id } = await createCarouselContainer({
      caption,
      urls,
    });

    return id;
  })();

  const { id: mediaId } = await postMediaPublish({ creationId });

  const { permalink } = await getMedia({ mediaId });

  return { permalink };
};
