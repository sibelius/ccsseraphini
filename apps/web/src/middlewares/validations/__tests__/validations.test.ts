import { config } from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import flood from 'pages/api/discord/flood';
import fetchMock from 'jest-fetch-mock';
import { getHttpProtocol } from 'getHttpProtocol';

jest.mock('getHttpProtocol');

beforeAll(() => {
  fetchMock.doMock(() =>
    Promise.resolve({ body: 'ok', status: 200, json: () => jest.fn() }),
  );
});

afterEach(() => fetchMock.resetMocks());

test('Should execute fn', async () => {
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
      'X-Cronjob-Org-Secretkey': '2313873457',
      host: 'test-host',
    },
  } as Partial<NextApiRequest> as NextApiRequest;

  const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
  } as Partial<NextApiResponse> as NextApiResponse;

  await flood(req, res);

  expect(getHttpProtocol).toBeCalledWith(req.headers.host);
});
