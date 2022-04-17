import { withSentry } from '@sentry/nextjs';
import { getUserScore } from 'modules/score/getUserScore';
import { NextApiRequest, NextApiResponse } from 'next';

const userScoreHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { username } = req.query;

  getUserScore(username as string)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(error.statusCode || 500).json(error);
    });
};

export default withSentry(userScoreHandler);
