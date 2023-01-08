import { DiscordMessage } from './types';

export function handleError(e: any, notification: DiscordMessage) {
  console.error(e);
  notification.react('😭');
}
