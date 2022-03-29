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
      borderWidth="5px"
      borderColor="red"
      borderRadius="lg"
      overflow="hidden"
      p="7"
      flexDirection="column"
      bg="black"
      width={'100%'}
      maxW={'fit-content'}
      minW={{ md: 'unset', base: 'calc(100vw - 24px)' }}
    >
      <VStack>
        <Flex justifyContent="center" alignItems="center">
          <Image
            boxSize="100px"
            objectFit="cover"
            src="https://unavatar.io/twitter/sseraphini"
            alt="Sibelius Seraphini"
            borderWidth="3px"
            borderRadius="full"
            borderColor="white"
            borderStyle="solid"
            m="3"
          />
          <Heading color="white">{username}</Heading>
        </Flex>
        <Text fontSize="2xl" color="white">
          Tweets: {userScore.tweet_count}
        </Text>
        <Text fontSize="2xl" color="white">
          Replies: {userScore.reply_count}
        </Text>
        <Text fontSize="2xl" color="white">
          Likes: {userScore.like_count}
        </Text>
        <Text fontSize="2xl" color="white">
          Retweets: {userScore.retweet_count}
        </Text>
        <Text fontSize="2xl" color="white">
          Quotes: {userScore.quote_count}
        </Text>
        <Heading color="white">Total: {userScore.total}</Heading>
      </VStack>
    </Flex>
  );
};
