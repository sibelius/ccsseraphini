import { Heading, Flex, VStack, Text, Image } from '@chakra-ui/react';
import { UserScore } from 'types/Score';
import { ChakraNextLinkButton } from '../ChakraNextLinkButton';

export const Score = ({
  userScore,
  username,
}: {
  userScore: UserScore;
  username: string;
}) => {
  if (!userScore) {
    return (
      <>
        <Heading> Error loading score, try again...</Heading>
        <ChakraNextLinkButton
          backgroundColor="green.200"
          as={'a'}
          href={'/'}
          width={'49%'}
        >
          Home
        </ChakraNextLinkButton>
      </>
    );
  }

  return (
    <Flex
      borderWidth="1px"
      borderColor="gray.500"
      borderRadius="lg"
      overflow="hidden"
      p="7"
      flexDirection="column"
      bg="white"
      width={'100%'}
      maxW={'fit-content'}
      minW={{ md: 'unset', base: 'calc(100vw - 24px)' }}
    >
      <VStack>
        <Image
          borderRadius="full"
          boxSize="100px"
          objectFit="cover"
          src="https://unavatar.io/twitter/sseraphini"
          alt="Sibelius Seraphini"
          m="3"
        />
        <Heading>{username}</Heading>
        <Text fontSize="2xl">Tweets: {userScore.tweet_count}</Text>
        <Text fontSize="2xl">Replies: {userScore.reply_count}</Text>
        <Text fontSize="2xl">Likes: {userScore.like_count}</Text>
        <Text fontSize="2xl">Retweets: {userScore.retweet_count}</Text>
        <Text fontSize="2xl">Quotes: {userScore.quote_count}</Text>
        <Heading>Total: {userScore.total}</Heading>
      </VStack>
    </Flex>
  );
};
