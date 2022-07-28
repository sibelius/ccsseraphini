import { NextApiRequest, NextApiResponse } from 'next';
import flood from 'pages/api/discord/flood';

test('Should validate CRONJOB_HEADER_KEY', async () => {
  const req = {
    method: 'POST',
  } as Partial<NextApiRequest>;

  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  } as Partial<NextApiResponse>;

  await flood(req as NextApiRequest, res as NextApiResponse).catch(
    (error: Error) => error,
  );

  expect(res.status).toBeCalledWith(500);
  expect(res.json).toBeCalledWith({ error: 'env CRONJOB_HEADER_KEY not set' });
});
