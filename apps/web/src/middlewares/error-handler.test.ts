import { NextApiRequest, NextApiResponse } from 'next';
import withErrorHandler from './error-handler';

describe('withErrorHandler', () => {
  const req: Partial<NextApiRequest> = {
    query: {
      username: 'pjonatansr',
    },
    cookies: {},
    env: {},
    body: {},
  };

  const res: Partial<NextApiResponse> = {
    status: jest.fn((statusCode: number) => {
      res.statusCode = statusCode;
      return res as NextApiResponse;
    }),
    json: jest.fn((result) => {
      const { message } = result;
      (res as Partial<NextApiResponse> & { message: string }).message = message;
    }),
  };

  test('should return default status 500 whenever failed without status Code', async () => {
    const fn = withErrorHandler(() => {
      throw new Error('Oops, something went wrong!');
    });

    await fn(req as NextApiRequest, res as NextApiResponse);
    expect(res.statusCode).toBe(500);
  });

  test('should return the same status code from the error whenever have a status code', async () => {
    const fn = withErrorHandler(() => {
      return Promise.reject({
        statusCode: 401,
        message: 'Oops, something went wrong!',
      });
    });

    await fn(req as NextApiRequest, res as NextApiResponse);
    expect(res.statusCode).toBe(401);
  });

  test("should return a default message when doesn't have error message", async () => {
    const fn = withErrorHandler(() => {
      return Promise.reject({ statusCode: 503 });
    });

    const { message } = res as Partial<NextApiResponse> & { message: string };

    await fn(req as NextApiRequest, res as NextApiResponse);

    expect(message).toBeDefined();
    expect(typeof message).toBe(typeof '');
    expect(message).toBeTruthy();
  });
});
