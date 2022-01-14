import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { TwitterResponseTweetInfo, TwitterResponseUserInfo } from 'types/Tweet';

interface TwitterResponse {
  data: TwitterResponseTweetInfo[];
  includes: {
    users: TwitterResponseUserInfo[];
  };
}

const BASE_URL = 'https://api.twitter.com/2';
const RECENT_TWEETS_URL = 'tweets/search/recent';
const QUERY = '-RT cc%20%40sseraphini';
const TWEET_FIELDS = 'attachments,author_id,id,text,created_at';
const USER_FIELDS = 'profile_image_url,url,username';
const EXPANSIONS = 'author_id';
const MAX_RESULTS = 10;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const url =
    `${BASE_URL}/${RECENT_TWEETS_URL}?query=${QUERY}&tweet.fields=${TWEET_FIELDS}` +
    `&user.fields=${USER_FIELDS}&expansions=${EXPANSIONS}&max_results=${MAX_RESULTS}`;
  const { data } = await axios.get<TwitterResponse>(url, {
    headers: {
      Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
  });

  const tweets = data.data.map((tweet) => {
    const userInfo = data.includes.users.find(
      (user) => user.id === tweet.author_id,
    );
    return {
      ...tweet,
      userInfo,
    };
  });

  return res.status(200).json(tweets);
}
