import { memo, useMemo } from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  Link,
  LinkOverlay,
  LinkBox,
} from '@chakra-ui/react';
import { decodeHTML } from 'entities';
import { LinkPreview } from '@dhaiwat10/react-link-preview';
import { TweetData } from 'types/Tweet';
import { parseContent } from './tweetContent';
import TweetPublicMetrics from './TweetPublicMetrics';

interface TweetInfoProps {
  tweet: TweetData;
  key?: string;
}

export const monthNames = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export const imageUrlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;

export const twitterBaseUrl = 'https://twitter.com/';
export const twitterEndpointSufix = {
  retweet: '/retweets',
  quote: '/retweets/with_comments',
  like: '/likes',
};

const Tweet = ({ tweet }: TweetInfoProps) => {
  const tweetTimeInfo = () => {
    const parsedDate = new Date(tweet.created_at);

    const AMPMTime = parsedDate.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    });

    return `${AMPMTime} · ${monthNames[parsedDate.getMonth()]} ${new Date(
      tweet.created_at,
    ).getDate()}, ${parsedDate.getFullYear()}`;
  };

  const tweetChunks = useMemo(
    () => parseContent(decodeHTML(tweet.text)),
    [tweet.text],
  );

  const nonImageUrlChunk = useMemo(
    () =>
      tweetChunks.find(
        (chunk) => chunk.type === 'url' && !imageUrlRegex.test(chunk.value),
      ),
    [tweetChunks],
  );

  return (
    <Box mb={6}>
      <Flex
        flexDirection="column"
        w={['100%', '100%', 700]}
        position="relative"
      >
        <Flex w={['100%', '100%', 700]} zIndex={1} pointerEvents="none">
          <Link
            href={`${twitterBaseUrl}${tweet.userInfo.username}`}
            target="blank"
            pointerEvents="all"
            _focus={{ boxShadow: 'none' }}
          >
            <Image
              borderRadius="full"
              objectFit="cover"
              boxSize="50px"
              src={tweet.userInfo.profile_image_url}
              alt={tweet.userInfo.name}
              marginRight={4}
            />
          </Link>
          <Link
            href={`${twitterBaseUrl}${tweet.userInfo.username}`}
            target="blank"
            pointerEvents="all"
            _focus={{ boxShadow: 'none' }}
            _hover={{
              textDecoration: 'none',
              '& p:first-child': { textDecoration: 'underline' },
            }}
          >
            <Box mt={[0, 1]}>
              <Text fontSize={14} fontWeight="bold">
                {tweet.userInfo.name}
              </Text>
              <Text fontSize={14} color="gray.500" fontWeight="light">
                {`@${tweet.userInfo.username}`}
              </Text>
            </Box>
          </Link>
        </Flex>
        <Box zIndex={1} pointerEvents="none">
          <Text mt={2}>
            {tweetChunks.map((chunk) => {
              if (chunk.type === 'text') return chunk.value;

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
                      alt={tweet.userInfo.name}
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
          </Text>
        </Box>
        {nonImageUrlChunk ? (
          <Box marginTop={2} data-testid="link-preview-wrapper">
            <LinkPreview url={nonImageUrlChunk.value} />
          </Box>
        ) : null}
        <Text color="gray.500" marginTop={2}>
          {tweetTimeInfo()}
        </Text>
        <Link
          href={`${twitterBaseUrl}${tweet.userInfo.username}/status/${tweet.id}`}
          target="blank"
          w="100%"
          display="flex"
          _focus={{ boxShadow: 'none' }}
          position="absolute"
          width="100%"
          height="100%"
          zIndex={0}
        />
      </Flex>
      <TweetPublicMetrics tweet={tweet} />
    </Box>
  );
};

export default memo(Tweet);
