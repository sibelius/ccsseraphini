import InfiniteScroll from 'react-infinite-scroll-component';
import { Flex, Text } from '@chakra-ui/react';
import TweetInfo from './TweetInfo';
import { TweetData } from '../types/Tweet';
import { useState } from 'react';

interface Props {
  initialTweets?: TweetData[];
  initialNextToken?: string;
}
export const Timeline = ({ initialTweets, initialNextToken }: Props) => {
  const [tweets, setTweets] = useState(initialTweets);
  const [nextToken, setNextToken] = useState(initialNextToken);

  const fetchData = async () => {
    const response = await fetch(`/api/latest_tweets?nextToken=${nextToken}`);
    const json = await response.json();
    setNextToken(json.nextToken);
    setTweets([...(tweets || []), ...json.tweets]);
  };

  if (!tweets) {
    return null;
  }

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      flex={1}
      px={4}
      py={8}
    >
      <Text fontWeight="medium" fontSize={24} mb={4}>
        Latest tweets
      </Text>
      <InfiniteScroll
        dataLength={tweets?.length || 0}
        next={fetchData}
        hasMore={true}
        loader={<Text>Loading...</Text>}
      >
        {tweets?.map((tweet) => (
          <TweetInfo key={tweet.id} tweet={tweet} />
        ))}
      </InfiniteScroll>
    </Flex>
  );
};
