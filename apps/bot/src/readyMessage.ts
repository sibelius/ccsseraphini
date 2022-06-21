import { EMOJIS_POINTS, MIN_POINTS_TO_TWEET } from './score';

const pointsText = Object.entries(EMOJIS_POINTS)
  .map(([emoji, point]) => `${emoji} vale ${point} pontos`, '')
  .join(' ');

export const readyMessage = [
  `O bot ta on 🚀 Como funciona?`,
  `Votem no tweets. Se a mensagem tiver ${MIN_POINTS_TO_TWEET} pontos, o RT é feito. ${pointsText}.`,
].join('\n');
