import { AnyThreadChannel, TextChannel, Client, ChannelType } from 'discord.js';
import { config } from './config';

const isForumPost = (thread: AnyThreadChannel<boolean>) => {
  return thread.parent.type === ChannelType.GuildForum;
};

type ThreadCreationArgs = {
  thread: AnyThreadChannel<boolean>;
  client: Client<boolean>;
};

export const handleThreadCreation = async ({
  thread,
  client,
}: ThreadCreationArgs) => {
  if (!isForumPost(thread)) return;

  try {
    const generalChannel = client.channels.cache.get(
      config.DISCORD_GENERAL_CHANNEL_ID,
    ) as TextChannel;

    generalChannel.send({
      allowedMentions: { users: [thread.ownerId] },
      content: `✨ <@${thread.ownerId}> created a new post, called <#${thread.id}>!`,
    });
  } catch (error) {
    console.warn(`Could not fetch user of id: ${thread.ownerId}`);
    console.error(`[Error] - ${error}`);
  }
};
