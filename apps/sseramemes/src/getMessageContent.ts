import { Message, PartialMessage } from 'discord.js';

export const getMessageContent = async (message: Message | PartialMessage) => {
  const discordContent = message.content;

  /**
   * Return all strings with <@123345456789> pattern.
   */
  const discordUsersPattern = discordContent.match(/<\@\d{1,}>/gm) || [];

  const finalContent = await discordUsersPattern.reduce(
    async (accPromise, discordUserPattern) => {
      const acc = await accPromise;

      const discordUserId = discordUserPattern.replace(/[<@>]/g, '');

      const discordUser = await message.client.users.fetch(discordUserId);

      const replacer = discordUser?.username ? `@${discordUser.username}` : '';

      return acc.replace(discordUserPattern, replacer);
    },
    Promise.resolve(discordContent),
  );

  return finalContent.substring(0, 280);
};
