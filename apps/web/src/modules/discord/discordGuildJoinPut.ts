import { config } from '../../config';

export const discordGuildJoinPut = async (
  guildID: string,
  userID: string,
  userAccessToken: string,
): Promise<Response> => {
  const payload = {
    access_token: userAccessToken,
  };

  const url = `http://discord.com/api/guilds/${guildID}/members/${userID}`;
  const options = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bot ${config.DISCORD_BOT_TOKEN}`,
    },
    method: 'PUT',
    body: JSON.stringify(payload),
  };

  const response = await fetch(url, options);

  return response;
};
