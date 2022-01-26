import { memo } from 'react';
import { Box, Flex, Image, Text, Link } from '@chakra-ui/react';
import { TweetData } from 'types/Tweet';

interface TweetInfoProps {
  tweet: TweetData;
  key?: string;
}

const monthNames = [
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

const TweetInfo = ({ tweet }: TweetInfoProps) => {
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

  return (
    <Box mb={6}>
      <Link
        href={`https://twitter.com/${tweet.userInfo.username}/status/${tweet.id}`}
        target="blank"
        _hover={{ textDecoration: 'none' }}
        w="100%"
        display="flex"
        _focus={{ boxShadow: 'none' }}
      >
        <Flex flexDirection="column" w={['100%', '100%', 700]}>
          <Flex w={['100%', '100%', 700]}>
            <Image
              borderRadius="full"
              objectFit="cover"
              boxSize="50px"
              src={tweet.userInfo.profile_image_url}
              alt={tweet.userInfo.name}
              marginRight={4}
            />
            <Box mt={[0, 1]}>
              <Text fontSize={14} fontWeight="bold">
                {tweet.userInfo.name}
              </Text>
              <Text fontSize={14} color="gray.500" fontWeight="light">
                {`@${tweet.userInfo.username}`}
              </Text>
            </Box>
          </Flex>
          <Text mt={2}>{tweet.text}</Text>
          <Text color="gray.500" marginTop={2}>
            {tweetTimeInfo()}
          </Text>
        </Flex>
      </Link>
      <Flex paddingY={3} borderY="1px solid" mt={4} borderColor="gray.300">
        <Text color="gray.500" fontWeight="bold" marginRight={1}>
          {tweet.public_metrics.retweet_count}
        </Text>
        <Text color="gray.500" marginRight={2}>
          {tweet.public_metrics.retweet_count === 1 ? 'Retweet' : 'Retweets'}
        </Text>
        <Text color="gray.500" fontWeight="bold" marginRight={1}>
          {tweet.public_metrics.like_count}
        </Text>
        <Text color="gray.500">
          {tweet.public_metrics.like_count === 1 ? 'Like' : 'Likes'}
        </Text>
      </Flex>
    </Box>
  );
};

export default memo(TweetInfo);
