import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

// TODO create tests for this function
const withErrorHandler =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      return await fn(req, res);
    } catch (err: any) {
      const statusCode = err.statusCode || 500;
      const message = err.message || 'Oops, something went wrong!';
      res.status(statusCode).json({ statusCode, message });
    }
  };

export default withErrorHandler;
