import { TwitterApi } from 'twitter-api-v2';

const configValidator = (
  config: Record<string, string | number>,
  keys: string[],
): boolean =>
  keys.reduce((valid, key, index) => {
    if (!config[key]) {
      console.error(`${keys[index]} is missing`);
      return false;
    }

    return valid;
  }, true);

const getTwitterClient = async (
  config: Record<string, string>,
): Promise<TwitterApi | undefined> => {
  const neededKeys = [
    'TWITTER_RANKING_API_KEY',
    'TWITTER_RANKING_API_KEY_SECRET',
    'TWITTER_RANKING_ACCESS_TOKEN',
    'TWITTER_RANKING_ACCESS_TOKEN_SECRET',
  ];

  if (!configValidator(config, neededKeys)) return;

  const client = new TwitterApi({
    appKey: config.TWITTER_API_KEY,
    appSecret: config.TWITTER_API_KEY_SECRET,
    accessToken: config.TWITTER_ACCESS_TOKEN,
    accessSecret: config.TWITTER_ACCESS_TOKEN_SECRET,
  });

  return client;
};

export default getTwitterClient;
