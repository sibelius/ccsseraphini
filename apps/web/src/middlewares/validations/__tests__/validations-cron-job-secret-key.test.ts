import { NextApiRequest, NextApiResponse } from 'next';
import { config } from 'config';
import flood from 'pages/api/discord/flood';

test('CronjobOrg should provide secretkey in the header', async () => {
  Object.defineProperties(config, {
    CRONJOB_HEADER_KEY: {
      value: 'X-Cronjob-Org-Secretkey',
    },
    CRONJOB_HEADER_VALUE: {
      value: '2313873457',
    },
  });

  const req = {
    method: 'POST',
    headers: {
      'X-Cronjob-Org-Secretkey': undefined,
    },
  } as Partial<NextApiRequest>;

  const res = {
    status: jest.fn(() => res),
    send: jest.fn(),
  } as Partial<NextApiResponse>;

  await flood(req as NextApiRequest, res as NextApiResponse).catch(
    (error: Error) => error,
  );

  expect(res.send).toBeCalledWith(
    'CronjobOrg should provide secretkey in the header',
  );
  expect(res.status).toBeCalledWith(400);
});
