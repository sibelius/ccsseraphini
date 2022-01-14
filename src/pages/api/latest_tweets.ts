import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

interface TweetInfo {
  author_id: string;
  id: string;
  text: string;
  created_at: string;
}

interface UserInfo {
  id: string;
  name: string;
  profile_image_url: string;
  username: string;
}

interface TwitterResponse {
  data: TweetInfo[];
  includes: {
    users: UserInfo[];
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const {data} = await axios.get<TwitterResponse>(
    'https://api.twitter.com/2/tweets/search/recent?query=-RT cc%20%40sseraphini&tweet.fields=attachments,author_id,id,text,created_at&user.fields=profile_image_url,url,username&expansions=author_id&max_results=10',
    {
      headers: {
        Authorization:
          '',
      },
    },
  );

  const tweets = data.data.map((tweet) => {
    const userInfo = data.includes.users.find(user => user.id === tweet.author_id);
    return {
      ...tweet,
      userInfo
    }
  })

  res.status(200).json(tweets);
}
