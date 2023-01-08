import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const tweet = async (url: string) => {
  try {
    const tweet = await client.v1.tweet(url, {});

    const tweetUrl = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;

    return {
      ok: true,
      url: tweetUrl,
    };
  } catch (error) {
    return error;
  }
};

export const tweetArticles = async (urls: string[]) => {
  const promisses = urls.map((url) => tweet(url));

  await Promise.all(promisses).then((responses) => {
    responses.forEach(verifyIfHasError);
  });

  return;
};

function verifyIfHasError(res: Response) {
  if (!res.ok) throw new Error(`response from API was: ${res.status}`);
}
