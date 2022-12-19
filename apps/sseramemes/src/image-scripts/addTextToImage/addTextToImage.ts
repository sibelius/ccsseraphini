import { Message, PartialMessage } from 'discord.js';
import path from 'path';
import sharp from 'sharp';
import {
  POSITIONS,
  TEXT_COLORS,
  LOCATIONS,
  Positions,
  TextColors,
  Locations,
} from './constants';

const parseMessageContent = (message: Message | PartialMessage) => {
  const content = message.content;
  const text = content.match(/text="([^"]+)"/)?.[1];
  const position = content.match(/position="([^ ]+)"/)?.[1] as keyof Positions;
  const color = content.match(/color="([^ ]+)"/)?.[1] as keyof TextColors;
  const location = content.match(/location="([^ ]+)"/)?.[1] as keyof Locations;
  return {
    text,
    position:
      position in POSITIONS ? position : ('top-left' as keyof Positions),
    color: color in TEXT_COLORS ? color : ('medium-white' as keyof TextColors),
    location: location in LOCATIONS ? location : ('nil' as keyof Locations),
  };
};
export const removeMemeCommands = (message: string) => {
  if (!message.includes(';meme text="')) return message;

  const text = message.match(/text="([^"]+)"/)?.[1];
  const position = message.match(/position="([^ ]+)"/)?.[1];
  const color = message.match(/color="([^ ]+)"/)?.[1];
  const location = message.match(/location="([^ ]+)"/)?.[1];

  return message
    .replace(`;meme text="${text}"`, '')
    .replace(`position="${position}"`, '')
    .replace(`color="${color}"`, '')
    .replace(`location="${location}"`, '')
    .trim();
};

export const removeAltText = (message: string) => {
  if (!message.includes('(alt:')) return message;

  return message.replace(/\(alt:.*\)/g, '').trim();
};

const getPositionConfig = (
  position: keyof Positions,
  location: keyof Locations,
  width: number,
  height: number,
) => {
  if (location === 'nil') {
    return {
      top: Math.round(height * POSITIONS[position].y),
      left: Math.round(width * POSITIONS[position].x),
    };
  }
  return {
    gravity: LOCATIONS[location],
  };
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
  const { text, position, color, location } = parseMessageContent(message);
  if (!text) return buffer;
  const fontURl = path.join(process.cwd(), './static/Montserrat/fonts.conf');
  const { width, height } = await sharp(buffer).metadata();
  const positionConfig = getPositionConfig(position, location, width, height);
  return await sharp(buffer)
    .composite([
      {
        input: {
          text: {
            text,
            fontfile: fontURl,
            font: 'Montserrat',
            rgba: true,
            dpi: Math.round(200 * TEXT_COLORS[color].size),
          },
        },
        ...positionConfig,
      },
    ])
    .toBuffer();
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
  
  caso queira adicionar o texto alinhado em uma parte da imagem, basta adicionar o argumento \`\`location\`\` com o seguinte formato:
  \`\`;meme text="eai jeff" color="xlarge-black" location="north"\`\`
  sendo que as localizações são:
  \`\`north, northeast, east, southeast, south, southwest, west, northwest, center\`\`
  sendo que a localização padrão é \`\`nil\`\` que não adiciona a localização e deixa o posicionamento padrão
 
  `;
