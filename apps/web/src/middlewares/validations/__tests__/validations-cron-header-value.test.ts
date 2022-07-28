import { config } from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import flood from 'pages/api/discord/flood';

test('Should validate CRONJOB_HEADER_VALUE', async () => {
  Object.defineProperties(config, {
    CRONJOB_HEADER_KEY: {
      value: '2313873457',
    },
  });

  const req = {
    method: 'POST',
  } as Partial<NextApiRequest>;

  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  } as Partial<NextApiResponse>;

  await flood(req as NextApiRequest, res as NextApiResponse).catch(
    (error) => error,
  );

  expect(res.json).toBeCalledWith({
    error: 'env CRONJOB_HEADER_VALUE not set',
  });
  expect(res.status).toBeCalledWith(500);
});
