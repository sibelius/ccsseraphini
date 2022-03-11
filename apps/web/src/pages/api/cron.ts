import type { NextApiRequest, NextApiResponse } from 'next';
import { MeiliSearch } from 'meilisearch';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (!process.env.MEILISEARCH_API_KEY || !process.env.MEILISEARCH_HOST_URL) {
    return res.status(401).json({
      error: 'No MeiliSearch Token found found',
    });
  }

  const query = '-RT cc @sseraphini';

  const httpProtocol = req.headers.host?.includes('localhost')
    ? 'http'
    : 'https';

  const url2 = (nextToken: string) =>
    `${httpProtocol}://${req.headers.host}/api/tweets?nextToken=${nextToken}&query=${query}`;

  const url = `${httpProtocol}://${req.headers.host}/api/tweets?query=${query}`;

  const response = await fetch(url);
  if (response.status !== 200) {
    return {
      props: {
        error: true,
      },
    };
  }
  const data = await response.json();

  const client = new MeiliSearch({
    host: process.env.MEILISEARCH_HOST_URL,
    apiKey: process.env.MEILISEARCH_API_KEY,
  });

  const index = client.index('tweets');

  let nextToken = data.nextToken;
  let times = 0;
  while (nextToken && times < 2) {
    const response = await fetch(url2(nextToken));
    const data = await response.json();
    await index.addDocuments(data.tweets);

    nextToken = data.nextToken;
    times++;
  }

  return res.status(200).json({
    success: true,
    data,
  });
}
