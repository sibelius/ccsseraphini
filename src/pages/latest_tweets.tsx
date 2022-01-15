import type { NextPage } from 'next';
import Head from 'next/head';
import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { TweetData } from 'types/Tweet';
import TweetInfo from 'components/TweetInfo';

const LatestTweets: NextPage = () => {
  const [tweets, setTweets] = useState<TweetData[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTweetsData = async () => {
      setLoading(true);
      try {
        const response = await fetch('api/latest_tweets');
        const data = await response.json();
        setTweets(data);
      } catch (error) {
        // TODO: add error handler
      }
      setLoading(false);
    };

    fetchTweetsData();
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!tweets) return <p>No tweets found!</p>;

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
        {tweets?.map((tweet) => (
          <TweetInfo key={tweet.id} tweet={tweet} />
        ))}
      </Flex>
    </div>
  );
};

export default LatestTweets;
