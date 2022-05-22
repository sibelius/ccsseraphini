import type { NextApiRequest, NextApiResponse } from 'next';
import {
  TwitterResponseMediaInfo,
  TwitterResponseTweetInfo,
  TwitterResponseUserInfo,
} from '../../types/Tweet';
import { config } from '../../config';
import { withSentry } from '@sentry/nextjs';

interface TwitterResponse {
  data: TwitterResponseTweetInfo[];
  includes: {
    users: TwitterResponseUserInfo[];
    media: TwitterResponseMediaInfo[];
  };
  meta: {
    next_token: string;
    result_count: number;
  };
  errors: any;
}

const BASE_URL = 'https://api.twitter.com/2';
const RECENT_TWEETS_URL = 'tweets/search/recent';
// const QUERY = '-RT cc%20%40sseraphini';
const TWEET_FIELDS = 'attachments,author_id,id,text,created_at,public_metrics';
const USER_FIELDS = 'profile_image_url,url,username';
const EXPANSIONS = 'author_id,attachments.media_keys';
const MEDIA_FIELDS = 'height,media_key,public_metrics,type,url,width';
const MAX_RESULTS = 10;
const IMAGE_URL_REGEX = /https:\/\/t.co\/[a-zA-Z0-9\-\.]{10}$/g;

const tweetsHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!config.TWITTER_BEARER_TOKEN) {
    return res.status(401).json({
      error: 'No Bearer Token found found',
    });
  }

  const query = req.query.query || '-RT cc @sseraphini -from:sseraphini_bot';

  // @ts-ignore
  const QUERY = encodeURI(query);

  let url =
    `${BASE_URL}/${RECENT_TWEETS_URL}?query=${QUERY}&tweet.fields=${TWEET_FIELDS}` +
    `&user.fields=${USER_FIELDS}&expansions=${EXPANSIONS}&max_results=${MAX_RESULTS}&media.fields=${MEDIA_FIELDS}`;

  if (req.query.nextToken) {
    url += `&next_token=${req.query.nextToken}`;
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${config.TWITTER_BEARER_TOKEN}`,
    },
  });

  const tweetsData: TwitterResponse = await response.json();

  if (!response.ok) {
    return res.status(200).json({
      tweets: [],
      nextToken: null,
    });
  }

  if (tweetsData.errors) {
    return res.status(200).json({
      tweets: [],
      nextToken: null,
    });
  }

  if (tweetsData.meta.result_count === 0) {
    return res.status(200).json({
      tweets: [],
      nextToken: null,
    });
  }

  const tweets = tweetsData.data.map((tweet) => {
    const userInfo = tweetsData.includes.users.find(
      (user) => user.id === tweet.author_id,
    );

    if (tweet.attachments && tweetsData.includes.media) {
      const mediaInfo = tweetsData.includes.media.find((photo) => {
        if (tweet.attachments?.media_keys?.length > 0) {
          return photo.media_key === tweet.attachments?.media_keys[0];
        }
      });

      tweet.text = tweet.text.replace(IMAGE_URL_REGEX, mediaInfo?.url || '');
    }

    return {
      ...tweet,
      userInfo,
    };
  });

  return res.status(200).json({
    tweets,
    nextToken: tweetsData.meta?.next_token,
  });
};

export default withSentry(tweetsHandler);
