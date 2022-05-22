import { EMOJIS_POINTS, MIN_POINTS_TO_TWEET } from './config';

const pointsText = Object.entries(EMOJIS_POINTS)
  .map(([emoji, point]) => `${emoji} vale ${point} pontos`, '')
  .join(' ');

export const readyMessage = [
  `O bot ta on 🚀 Como funciona?`,
  `Mandem os memes e votem! Se a mensagem tiver ${MIN_POINTS_TO_TWEET} pontos, o tuíte é feito. ${pointsText}.`,
  'Memes enviados antes desta mensagem não são consideradas por causa do cache do client do Discord.js.',
].join('\n');
