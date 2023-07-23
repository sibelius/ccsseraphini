import { TwitterApi } from 'twitter-api-v2';

const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_KEY_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const tweet = async (resume: string) => {
  try {
    await client.v1.tweet(resume, {});

    return {
      ok: true,
    };
  } catch (error) {
    return error;
  }
};

export const tweetResume = async (resume: string) => {
  const response = await tweet(resume);

  if (response.ok) {
    console.log('Tweeted successfully');
  } else {
    console.log('Error tweeting', response);
  }

  return;
};
