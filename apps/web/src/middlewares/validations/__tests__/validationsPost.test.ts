import { NextApiRequest, NextApiResponse } from 'next';
import flood from 'pages/api/discord/flood';

test('Should validate if not post', async () => {
  const req = { method: 'GET' } as NextApiRequest;

  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  } as Partial<NextApiResponse> as NextApiResponse;

  await flood(req, res);

  expect(res.status).toBeCalledWith(405);
});
