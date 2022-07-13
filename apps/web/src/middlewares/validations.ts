import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import { config } from '../config';

const withValidation =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // Adding new security layer, make hard to hackers using the browser for DDoS atack
      if (req.method !== 'POST') {
        return res.status(405).send('method not allowed');
      }

      if (!config.CRONJOB_HEADER_KEY) {
        return res
          .status(500)
          .json({ error: 'env CRONJOB_HEADER_KEY not set' });
      }

      if (!config.CRONJOB_HEADER_VALUE)
        return res
          .status(500)
          .json({ error: 'env CRONJOB_HEADER_VALUE not set' });

      if (!req.headers[config.CRONJOB_HEADER_KEY])
        return res
          .status(400)
          .send('CronjobOrg should provide secretkey in the header');

      if (
        req.headers[config.CRONJOB_HEADER_KEY] !== config.CRONJOB_HEADER_VALUE
      ) {
        return res
          .status(401)
          .send(
            'Ops! Wrong header value, check the env variable or cronjob.org account',
          );
      }

      return await fn(req, res);
    } catch (err: any) {
      const statusCode = err.statusCode || 500;
      const message = err.message || 'Oops, something went wrong!';
      res.status(statusCode).json({ statusCode, message });
    }
  };

export default withValidation;
