import { Message, PartialMessage } from 'discord.js';
import Jimp from 'jimp';

const POSITIONS = {
  'top-left': {
    x: 0.05,
    y: 0.05,
  },
  'top-center': {
    x: 0.3,
    y: 0.05,
  },
  'top-right': {
    x: 0.7,
    y: 0.05,
  },
  'middle-left': {
    x: 0.05,
    y: 0.3,
  },
  'middle-center': {
    x: 0.4,
    y: 0.4,
  },
  'middle-right': {
    x: 0.7,
    y: 0.3,
  },
  'bottom-left': {
    x: 0.05,
    y: 0.7,
  },
  'bottom-center': {
    x: 0.3,
    y: 0.7,
  },
  'bottom-right': {
    x: 0.7,
    y: 0.7,
  },
} as const;
const TEXT_COLORS = {
  'small-white': Jimp.FONT_SANS_16_WHITE,
  'medium-white': Jimp.FONT_SANS_32_WHITE,
  'large-white': Jimp.FONT_SANS_64_WHITE,
  'xlarge-white': Jimp.FONT_SANS_128_WHITE,

  'small-black': Jimp.FONT_SANS_16_BLACK,
  'medium-black': Jimp.FONT_SANS_32_BLACK,
  'large-black': Jimp.FONT_SANS_64_BLACK,
  'xlarge-black': Jimp.FONT_SANS_128_BLACK,
} as const;
type Positions = typeof POSITIONS;
type TextColors = typeof TEXT_COLORS;

const parseMessageContent = (message: Message | PartialMessage) => {
  const content = message.content;
  const text = content.match(/text="([^"]+)"/)?.[1];
  const position = content.match(/position="([^ ]+)"/)?.[1] as keyof Positions;
  const color = content.match(/color="([^ ]+)"/)?.[1] as keyof TextColors;
  return {
    text,
    position:
      position in POSITIONS ? position : ('top-left' as keyof Positions),
    color: color in TEXT_COLORS ? color : ('medium-white' as keyof TextColors),
  };
};
export const removeMemeCommands = (message: string) => {
  if (!message.includes(';meme text="')) return message;

  const text = message.match(/text="([^"]+)"/)?.[1];
  const position = message.match(/position="([^ ]+)"/)?.[1];
  const color = message.match(/color="([^ ]+)"/)?.[1];

  return message
    .replace(`;meme text="${text}"`, '')
    .replace(`position="${position}"`, '')
    .replace(`color="${color}"`, '')
    .trim();
};
export const addTextToImage = async (
  message: Message | PartialMessage,
  buffer: Buffer,
): Promise<Buffer> => {
  if (!message.content) return buffer;
  if (message.content.length > 280) {
    console.log('Text is too long');
    return buffer;
  }
  if (message.content.length === 0) {
    console.log('Text is empty');
    return buffer;
  }

  if (!message.content.includes(';meme text="')) return buffer;
  const { text, position, color } = parseMessageContent(message);
  if (!text) return buffer;
  const meme: Jimp = await Jimp.read(buffer);
  const font = await Jimp.loadFont(TEXT_COLORS[color]);
  await meme.print(
    font,
    meme.getWidth() * POSITIONS[position].x,
    meme.getHeight() * POSITIONS[position].y,
    text,
    meme.getWidth() - 10,
    meme.getHeight() - 10,
  );
  return await meme.getBufferAsync(meme.getMIME());
};
