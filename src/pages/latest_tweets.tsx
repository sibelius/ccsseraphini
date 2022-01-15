import type { NextPage } from 'next';
import Head from 'next/head';
import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { TweetData } from 'types/Tweet';
import TweetInfo from 'components/TweetInfo';

const LatestTweets: NextPage = () => {
  const [data, setData] = useState<TweetData[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTweetsData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('api/latest_tweets');
        setData(response.data);
      } catch (error) {
        // TODO: add error handler
      }
      setLoading(false);
    };

    fetchTweetsData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No data</p>;

  return (
    <div>
      <Head>
        <title>cc @sseraphini - Latest tweets</title>
        <meta name="description" content="Make it easy to cc @sseraphini" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
        {data?.map((tweet) => (
          <TweetInfo key={tweet.id} tweet={tweet} />
        ))}
      </Flex>
    </div>
  );
};

export default LatestTweets;
