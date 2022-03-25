import { User } from 'types/User';
import { getTwitterAuthorization } from './getTwitterAuthorization';

export type Result = {
  data: User;
};

export const userProfile = async (
  username: string,
  accessToken: string,
): Promise<Result> => {
  const url = `https://api.twitter.com/2/users/by/username/${username}`;
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getTwitterAuthorization(accessToken),
    },
    method: 'GET',
  };
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};
