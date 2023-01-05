import { config } from '../config';
import { ENDPOINT_URL } from './index';
import 'isomorphic-fetch';

export const postArticle = (articleUrl: string) => {
  const payload = { apiKey: config.FANSFY_API_KEY, url: articleUrl };

  return fetch(ENDPOINT_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};
