import { parseContent } from './tweetContent';
import { decodeHTML } from 'entities';
import { Image, Link } from '@chakra-ui/react';
import React from 'react';
import { imageUrlRegex, twitterBaseUrl } from './TweetInfo';
import { TweetData } from '../types/Tweet';

export const HighlightCustom = ({ hit }: { hit: TweetData }) => {
  // This is a hack to get around the fact that the `_highlightResult`
  // object is not a real object, but a string.
  // @ts-expect-error missing type, but exists
  const nestedHit = hit['_highlightResult']?.text?.value
    .replace(/ais-highlight-0000000000/gi, 'mark')
    .replace(/\/ais-highlight-0000000000/gi, '/mark');

  const tweetChunks = parseContent(decodeHTML(nestedHit ?? ''));

  return (
    <span>
      {tweetChunks.map((chunk) => {
        if (chunk.type === 'text')
          return <div dangerouslySetInnerHTML={{ __html: chunk.value }}></div>;

        if (chunk.type === 'hashtag') {
          return (
            <Link
              pointerEvents="all"
              target="blank"
              color="#444cf7"
              href={`${twitterBaseUrl}hashtag/${chunk.value}?src=hashtag_click`}
              key={chunk.index}
            >
              #{chunk.value}
            </Link>
          );
        }

        if (chunk.type === 'url') {
          if (imageUrlRegex.test(chunk.value)) {
            return (
              <Image
                key={chunk.index}
                src={chunk.value}
                alt={hit.userInfo.name}
              />
            );
          }
          return (
            <Link
              pointerEvents="all"
              target="blank"
              color="#444cf7"
              href={chunk.value}
              key={chunk.index}
            >
              {chunk.value}
            </Link>
          );
        }

        if (chunk.type === 'mention') {
          return (
            <Link
              pointerEvents="all"
              target="blank"
              color="#444cf7"
              href={`${twitterBaseUrl}${chunk.value}`}
              key={chunk.index}
            >
              @{chunk.value}
            </Link>
          );
        }
      })}
    </span>
  );
};
