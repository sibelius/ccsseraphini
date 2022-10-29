import fetch from 'node-fetch';

const GRAPH_API_ENDPOINT = 'https://graph.facebook.com/v15.0';

/**
 * Retrieves on `me/accounts` endpoint.
 * https://developers.facebook.com/tools/explorer?method=GET&path=me%2Faccounts&version=v15.0
 */
const INSTAGRAM_USER_ID = process.env.INSTAGRAM_USER_ID;

/**
 * Retrieves on https://developers.facebook.com/tools/accesstoken/
 * How to get long lived token: https://developers.facebook.com/docs/pages/access-tokens
 */
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;

/**
 * Implementing the Instagram Graph API.
 * https://developers.facebook.com/docs/instagram-api/guides/content-publishing?locale=en_US#single-media-posts
 */
export const postMemeOnInstagram = async ({
  caption,
  memeUrl,
}: {
  caption?: string;
  memeUrl: string;
}) => {
  const { id } = await fetch(
    `${GRAPH_API_ENDPOINT}/${INSTAGRAM_USER_ID}/media?caption=${caption}&image_url=${memeUrl}&access_token=${INSTAGRAM_ACCESS_TOKEN}`,
    {
      method: 'POST',
    },
  ).then((res) => res.json() as Promise<{ id: string }>);

  const response = await fetch(
    `${GRAPH_API_ENDPOINT}/${INSTAGRAM_USER_ID}/media_publish?creation_id=${id}&access_token=${INSTAGRAM_ACCESS_TOKEN}`,
    {
      method: 'POST',
    },
  ).then((res) => res.json() as Promise<{ id: string }>);

  return response;
};
