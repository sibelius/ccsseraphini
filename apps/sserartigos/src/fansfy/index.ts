import { postArticle } from './postArticle';

export const ENDPOINT_URL = 'https://api.fansfy.io/v1/publish';

export const postAllArticles = async (links: string[]) => {
  const promisses = links.map((link) => postArticle(link));

  await Promise.all(promisses).then((responses) => {
    responses.forEach(verifyIfHasError);
  });

  return;
};

function verifyIfHasError(res: Response) {
  if (!res.ok) throw new Error(`response from API was: ${res.status}`);
}
