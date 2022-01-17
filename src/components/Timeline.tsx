import { Flex, Text } from '@chakra-ui/react';
import TweetInfo from './TweetInfo';
import { TweetData } from '../types/Tweet';

interface Props {
  tweets?: TweetData[];
}
export const Timeline = ({ tweets }: Props) => {
  if (!tweets) {
    return null;
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      px={4}
      py={8}
    >
      <Text fontWeight="medium" fontSize={24}>
        Latest tweets
      </Text>
      {tweets?.map((tweet) => (
        <TweetInfo key={tweet.id} tweet={tweet} />
      ))}
    </Flex>
  );
};
