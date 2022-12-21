import { removeAltText, removeMemeCommands } from './image-scripts';

export const removeMetadata = (message: string) => {
  message = removeMemeCommands(message);
  message = removeAltText(message);
  return message;
};
