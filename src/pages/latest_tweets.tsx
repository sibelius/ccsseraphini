import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Flex, Image, Text, Link } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface TweetInfo {
  author_id: string;
  id: string;
  text: string;
  userInfo: UserInfo;
}

interface UserInfo {
  id: string;
  name: string;
  profile_image_url: string;
  username: string;
}

const LatestTweets: NextPage = () => {
  const [data, setData] = useState<TweetInfo[]>([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTweetsData = async () => {
      setLoading(true);
      try {
        const response = await axios.get('api/latest_tweets');
        setData(response.data);
      } catch (error) {
        console.error('error: ', error);
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
        p={8}
      >
        <Text fontWeight="medium" fontSize={24}>
          Latest tweets
        </Text>
        {data.map((tweet, idx) => (
          <Link
            key={idx}
            href={`https://twitter.com/${tweet.userInfo.username}/status/${tweet.id}`}
            target="blank"
            _hover={{ textDecoration: 'none' }}
          >
            <Flex borderBottomWidth={2} p={8} w={700} alignItems="flex-start">
              <Image
                borderRadius="full"
                objectFit="cover"
                boxSize="50px"
                src={tweet.userInfo.profile_image_url}
                alt={tweet.userInfo.name}
                marginX={4}
              />
              <Box>
                <Link
                  href={`https://twitter.com/${tweet.userInfo.username}`}
                  target="blank"
                >
                  <Flex>
                    <Text fontWeight="bold">{tweet.userInfo.name}</Text>
                    <Text fontWeight="light" ml={2}>
                      {`@${tweet.userInfo.username}`}
                    </Text>
                  </Flex>
                </Link>
                <p>{tweet.text}</p>
              </Box>
            </Flex>
          </Link>
        ))}
      </Flex>
    </div>
  );
};

export default LatestTweets;
