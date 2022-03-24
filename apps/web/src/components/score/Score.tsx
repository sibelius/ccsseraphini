import { Heading, Flex, VStack } from '@chakra-ui/react';
import { UserScore } from 'types/Score';

export const Score = ({
  userScore,
  username,
}: {
  userScore: UserScore;
  username: string;
}) => {
  if (!!userScore) {
    return (
      <Flex>
        <VStack>
          <Heading>{username}, your score is</Heading>
          <Heading>
            Replies: {userScore.reply_count} Likes: {userScore.like_count}{' '}
            Retweets: {userScore.retweet_count} Quotes: {userScore.quote_count}
          </Heading>
          <Heading>Total: {userScore.total}</Heading>
        </VStack>
      </Flex>
    );
  }

  return <Heading> Loading...</Heading>;
};
