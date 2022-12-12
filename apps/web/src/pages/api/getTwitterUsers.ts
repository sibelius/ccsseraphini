import { config } from 'config';
import { TwitterResponse, TwitterUser } from 'types/Ranking';

const BASE_URL = 'https://api.twitter.com/2';
const USERS_URL = 'users';
const USER_FIELDS = 'profile_image_url,username,name';

export const getTwitterUsers = async (
  ids: string[],
): Promise<TwitterUser[]> => {
  const bearerToken = config.TWITTER_BEARER_TOKEN;
  const idString = ids.join(',');
  const url = `${BASE_URL}/${USERS_URL}?ids=${idString}&user.fields=${USER_FIELDS}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    if (!response.ok) {
      return [];
    }

    const twitterData = (await response.json()) as TwitterResponse;
    if (twitterData === null || !Array.isArray(twitterData.data)) {
      return [];
    }

    return twitterData.data;
  } catch (error) {
    console.error('Error getting ranking:', error);
    return [];
  }
};
