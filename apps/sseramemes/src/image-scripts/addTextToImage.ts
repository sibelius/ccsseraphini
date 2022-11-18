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
/**
 * Add text to image.
 * @param message
 * @param buffer
 * @example you will send a message in discord like this: ;meme text="eai jeff" position="top-left" color="xlarge-black"
 * what this function will do is add the text "eai jeff" to the top-left of the image with the color xlarge-black
 */
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

export const addMemeTextManual = `

Como usar a funcionalidade de adicionar texto a imagem? 
Basta enviar uma mensagem no discord junto a imagem com o seguinte formato:

  \`\`;meme text="eai jeff" position="top-left" color="xlarge-black"\`\`
  sendo que:
  \`\`;meme text="eai jeff"\`\` é o texto(eai jeff) que será adicionado a imagem é obrigatório como primeiro argumento

  \`\`position="top-left"\`\` é a posição que o texto será adicionado a imagem, sendo que as posições são:
  \`\`top-left, top-center, top-right, middle-left, middle-center, middle-right, bottom-left, bottom-center, bottom-right\`\`
  sendo que a posição padrão é \`\`top-left\`\`
  \`\`color="xlarge-black"\`\` é a cor do texto, sendo que as cores são:
  \`\`small-white, medium-white, large-white, xlarge-white, small-black, medium-black, large-black, xlarge-black\`\`
  sendo que a cor padrão é \`\`medium-white\`\` 
  `;
