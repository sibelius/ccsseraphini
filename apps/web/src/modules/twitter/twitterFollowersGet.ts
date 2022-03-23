import { getTwitterAuthorization } from './getTwitterAuthorization';

type Result = {
  data: Tweet[];
  meta: {
    result_count: number;
    next_token?: string;
  };
};

type Tweet = {
  text: string;
  in_reply_to_user_id: string;
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
};

export const userTweets = async (
  userId: string,
  accessToken: string,
): Promise<Result> => {
  const url = `https://api.twitter.com/2/users/${userId}/tweets?tweet.fields=public_metrics,in_reply_to_user_id,author_id&max_results=100`;
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: getTwitterAuthorization(accessToken),
    },
    method: 'GET',
  };
  const response = await fetch(url, options);
  const data = await response.json();

  return data;
};
