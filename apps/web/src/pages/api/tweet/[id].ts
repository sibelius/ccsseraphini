import { withSentry } from '@sentry/nextjs';
import { userProfile } from 'modules/twitter/twitterUserGet';
import { NextApiRequest, NextApiResponse } from 'next';
import { config } from '../../../config';
import { getSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import { getTwitterAuthorization } from '../../../modules/twitter/getTwitterAuthorization';

const retweetHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  const session = await getSession({ req });
  console.log('session: ', session);
  if (!session) {
    console.log('error: ', session);
    // res.redirect('/?error=twitter-session-required&status=401');
    // return;
    return res.status(200).json({
      message: 'error',
    });
  }

  const payload = {
    tweet_id: id,
  };
  const options = {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getTwitterAuthorization(session.access_token),
    },
  };
  const url = `https://api.twitter.com/2/users/${session.id}/retweets`;

  const response = await fetch(url, options);
  const json = await response.json();

  console.log({
    options,
    payload,
    json,
  });

  return res.status(200).json({
    message: 'ok',
  });
};

export default withSentry(retweetHandler);
