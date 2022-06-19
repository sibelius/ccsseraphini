import { Message, PartialMessage } from 'discord.js';

export const getMessageContent = async (message: Message | PartialMessage) => {
  const discordContent = message.content;

  /**
   * Return all strings with <@123345456789> pattern.
   */
  const discordUsersPattern = discordContent.match(/<\@\d{1,}>/gm) || [];

  let finalContent = discordContent;

  for (const discordUserPattern of discordUsersPattern) {
    const discordUserId = discordUserPattern.replace(/[<@>]/g, '');

    let replacer: string;

    try {
      const discordUser = await message.client.users.fetch(discordUserId);

      replacer = discordUser?.username ? `@${discordUser.username}` : '';
    } catch {
      replacer = '';
    }

    finalContent = finalContent.replace(discordUserPattern, replacer);
  }

  return finalContent.substring(0, 280);
};
