import { config } from 'config';
import { NextApiRequest, NextApiResponse } from 'next';
import withValidations from './validations';

type ApiResponse = Partial<NextApiResponse> & {
  message: string;
};

describe('Validations', () => {
  test('Should validate if not post', async () => {
    const fn = withValidations((req, res) => {
      Promise.resolve({
        method: req.method,
        status: res.statusCode,
      });
    });

    const req = {
      method: 'GET',
    } as Partial<NextApiRequest>;

    const res = {
      status: jest.fn((statusCode: number) => {
        res.statusCode = statusCode;
        return res as NextApiResponse;
      }),
      send: jest.fn((message) => {
        (res as Partial<NextApiResponse> & { message: string }).message =
          message;
        return res as NextApiResponse;
      }),
    } as Partial<NextApiResponse>;

    await fn(req as NextApiRequest, res as NextApiResponse).catch(
      (error) => error,
    );

    expect((res as ApiResponse).message).toBe('method not allowed');
    expect(res.statusCode).toBe(405);
  });

  test('Should validate CRONJOB_HEADER_KEY', async () => {
    const fn = withValidations((req, res) => {
      Promise.resolve({
        method: req.method,
        status: res.statusCode,
      });
    });

    const req = {
      method: 'POST',
    } as Partial<NextApiRequest>;

    const res = {
      status: jest.fn((statusCode: number) => {
        res.statusCode = statusCode;
        return res;
      }),
      send: jest.fn((message) => {
        (res as ApiResponse).message = message;
        return res;
      }),
      json: jest.fn(({ error }) => {
        (res as ApiResponse).message = error;
        return res;
      }),
    } as Partial<NextApiResponse>;

    await fn(req as NextApiRequest, res as NextApiResponse).catch(
      (error) => error,
    );

    expect((res as ApiResponse).message).toBe('env CRONJOB_HEADER_KEY not set');
    expect(res.statusCode).toBe(500);
  });

  test('Should validate CRONJOB_HEADER_VALUE', async () => {
    const fn = withValidations((req, res) => {
      Promise.resolve({
        method: req.method,
        status: res.statusCode,
      });
    });

    Object.defineProperties(config, {
      CRONJOB_HEADER_KEY: {
        value: '2313873457',
        configurable: true,
        writable: true,
      },
    });

    const req = {
      method: 'POST',
    } as Partial<NextApiRequest>;

    const res = {
      status: jest.fn((statusCode: number) => {
        res.statusCode = statusCode;
        return res;
      }),
      send: jest.fn((message) => {
        (res as ApiResponse).message = message;
        return res;
      }),
      json: jest.fn(({ error }) => {
        (res as ApiResponse).message = error;
        return res;
      }),
    } as Partial<NextApiResponse>;

    await fn(req as NextApiRequest, res as NextApiResponse).catch(
      (error) => error,
    );

    expect((res as ApiResponse).message).toBe(
      'env CRONJOB_HEADER_VALUE not set',
    );
    expect(res.statusCode).toBe(500);
  });

  test('CronjobOrg should provide secretkey in the header', async () => {
    const fn = withValidations((req, res) => {
      Promise.resolve({
        method: req.method,
        status: res.statusCode,
      });
    });

    Object.defineProperties(config, {
      CRONJOB_HEADER_KEY: {
        value: 'X-Cronjob-Org-Secretkey',
        configurable: true,
        writable: true,
      },
      CRONJOB_HEADER_VALUE: {
        value: '2313873457',
        configurable: true,
        writable: true,
      },
    });

    const req = {
      method: 'POST',
      headers: {
        'X-Cronjob-Org-Secretkey': undefined,
      },
    } as Partial<NextApiRequest>;

    const res = {
      status: jest.fn((statusCode: number) => {
        res.statusCode = statusCode;
        return res;
      }),
      send: jest.fn((message) => {
        (res as ApiResponse).message = message;
        return res;
      }),
      json: jest.fn(({ error }) => {
        (res as ApiResponse).message = error;
        return res;
      }),
    } as Partial<NextApiResponse>;

    await fn(req as NextApiRequest, res as NextApiResponse).catch(
      (error) => error,
    );

    expect((res as ApiResponse).message).toBe(
      'CronjobOrg should provide secretkey in the header',
    );
  });

  test('CronjobOrg should provide a VALID secretkey in the header', async () => {
    const fn = withValidations((req, res) => {
      Promise.resolve({
        method: req.method,
        status: res.statusCode,
      });
    });

    Object.defineProperties(config, {
      CRONJOB_HEADER_KEY: {
        value: 'X-Cronjob-Org-Secretkey',
        configurable: true,
        writable: true,
      },
      CRONJOB_HEADER_VALUE: {
        value: '2313873457',
        configurable: true,
        writable: true,
      },
    });

    const req = {
      method: 'POST',
      headers: {
        'X-Cronjob-Org-Secretkey': '2313873458',
      },
    } as Partial<NextApiRequest>;

    const res = {
      status: jest.fn((statusCode: number) => {
        res.statusCode = statusCode;
        return res;
      }),
      send: jest.fn((message) => {
        (res as ApiResponse).message = message;
        return res;
      }),
      json: jest.fn(({ error }) => {
        (res as ApiResponse).message = error;
        return res;
      }),
    } as Partial<NextApiResponse>;

    await fn(req as NextApiRequest, res as NextApiResponse).catch(
      (error) => error,
    );

    expect((res as ApiResponse).message).toBe(
      'Ops! Wrong header value, check the env variable or cronjob.org account',
    );
    expect(res.statusCode).toBe(401);
  });

  test('Should return the result of the fn', async () => {
    const fn = withValidations((req, res) => {
      res.status(200).send('ok');

      Promise.resolve({
        method: req.method,
        statusCode: res.statusCode,
      });
    });

    Object.defineProperties(config, {
      CRONJOB_HEADER_KEY: {
        value: 'X-Cronjob-Org-Secretkey',
        configurable: true,
        writable: true,
      },
      CRONJOB_HEADER_VALUE: {
        value: '2313873457',
        configurable: true,
        writable: true,
      },
    });

    const req = {
      method: 'POST',
      headers: {
        'X-Cronjob-Org-Secretkey': '2313873457',
      },
    } as Partial<NextApiRequest>;

    const res = {
      status: jest.fn((statusCode: number) => {
        res.statusCode = statusCode;
        return res;
      }),
      send: jest.fn((message) => {
        (res as ApiResponse).message = message;
        return res;
      }),
      json: jest.fn(({ error }) => {
        (res as ApiResponse).message = error;
        return res;
      }),
    } as Partial<NextApiResponse>;

    await fn(req as NextApiRequest, res as NextApiResponse).then(
      (result) => result,
    );

    expect(res.statusCode).toBe(200);
  });
});
