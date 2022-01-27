const mentionRegex = /@([a-zA-Z0-9_]{4,15})/g;
const urlRegex = /https?:\/\/[^\s$.?#].[^\s]*/g;

export type InterfaceChunk = {
  type: 'text' | 'mention' | 'url';
  index: number;
  value: string;
};

const matchAll = <T extends string>(text: string, type: T, regex: RegExp) => {
  return [...text.matchAll(regex)].map((match) => ({ type, match }));
};

export const parseContent = (text: string) => {
  const matches = [
    ...matchAll(text, 'mention', mentionRegex),
    ...matchAll(text, 'url', urlRegex),
  ].sort((m1, m2) => (m1.match.index || 0) - (m2.match.index || 0));

  const result: InterfaceChunk[] = [];
  let index = 0;

  matches.forEach(({ type, match }) => {
    if (match.index !== 0) {
      result.push({
        type: 'text',
        index,
        value: text.substring(index, match.index),
      });
    }

    result.push({ type, index: match.index || 0, value: match[1] || match[0] });

    index = (match.index || 0) + match[0].length;
  });

  if (index < text.length) {
    result.push({ type: 'text', index, value: text.substring(index) });
  }

  return result;
};
