import { Message } from 'discord.js';

export function handleError(e: any, notification: Promise<Message<boolean>>) {
  console.error(e);
  notification.then((message) =>
    message.edit('Alguns links não puderam ser postados ☹️'),
  );
}

export async function notifySuccess(reply: Promise<Message<boolean>>) {
  const message = await reply;
  return await message.edit('Links postados com sucesso 👍');
}
