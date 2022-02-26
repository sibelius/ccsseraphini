import InfiniteScroll from 'react-infinite-scroll-component';
import { Flex, Text } from '@chakra-ui/react';
import TweetInfo from './TweetInfo';
import { TweetData } from '../types/Tweet';
import { useState, useEffect } from 'react';
import { usePrevious } from '../usePrevious';
import { Spinner } from '@chakra-ui/spinner';
import { FaSyncAlt } from 'react-icons/fa';

interface Props {
  initialTweets?: TweetData[];
  initialNextToken?: string;
  query?: string;
  isSearch?: boolean;
}
export const Timeline = ({
  initialTweets,
  initialNextToken,
  query,
  isSearch = false,
}: Props) => {
  const [tweets, setTweets] = useState(initialTweets);
  const [nextToken, setNextToken] = useState(initialNextToken);
  const [refresh, setRefresh] = useState(false);

  const fetchData = async () => {
    if (nextToken) {
      const response = await fetch(
        `/api/tweets?nextToken=${nextToken}&query=${query}`,
      );
      const json = await response.json();
      setTweets([...(tweets || []), ...json.tweets]);
      setNextToken(json?.nextToken);
    }
  };

  const prevQuery = usePrevious(query);

  useEffect(() => {
    if ((prevQuery && prevQuery !== query) || refresh) {
      const refetch = async () => {
        const response = await fetch(`/api/tweets?query=${query}`);
        const json = await response.json();

        if (response.ok) {
          setTweets([...json.tweets]);
          setNextToken(json?.nextToken);
          setRefresh(false);
        }
      };

      refetch();
    }
  }, [query, refresh]);

  if (!tweets) {
    return null;
  }

  const title = isSearch ? 'Search Results' : 'Latest tweets';

  const renderTweets = () => {
    if (tweets.length === 0) {
      return <Text>No tweets found</Text>;
    }

    return (
      <InfiniteScroll
        dataLength={tweets?.length || 0}
        next={fetchData}
        hasMore={!!nextToken}
        loader={<Text>Loading...</Text>}
      >
        {tweets?.map((tweet) => (
          <TweetInfo key={tweet.id} tweet={tweet} />
        ))}
      </InfiniteScroll>
    );
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      opacity={refresh ? 0.4 : 1}
      position={refresh ? 'relative' : 'unset'}
      flex={1}
      px={4}
      py={8}
    >
      <Text fontWeight="medium" fontSize={24} mb={4}>
        {title}

        <button
          style={{ fontSize: '.8rem', marginLeft: '.3rem' }}
          onClick={() => setRefresh(true)}
        >
          <FaSyncAlt />
        </button>
      </Text>

      {refresh ? <Spinner position="absolute" top="15%" right="50%" /> : null}

      {renderTweets()}
    </Flex>
  );
};
