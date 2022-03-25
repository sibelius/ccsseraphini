import { userProfile } from 'modules/twitter/twitterUserGet';
import { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../../config';

export default async function userHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { username } = req.query;

  const access_token = config.TWITTER_BEARER_TOKEN;
  if (!access_token) {
    return res.status(401).json({
      message: 'Authorization required',
    });
  }

  const result = await userProfile(username as string, access_token as string);

  if (!result.data) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  const { data: user } = result;

  console.table(result);
  return res.status(200).json({
    user,
  });
}
