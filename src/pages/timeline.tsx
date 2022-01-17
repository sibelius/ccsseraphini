import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Flex, Text } from '@chakra-ui/react';
import { TweetData } from '../types/Tweet';
import TweetInfo from '../components/TweetInfo';
interface Props {
  data?: {
    tweets: TweetData[];
    nextToken: string;
  };
  error?: boolean;
}

const Timeline: NextPage<Props> = ({ data, error }: Props) => {
  const [tweets, setTweets] = useState(data?.tweets);
  const [nextToken, setNextToken] = useState(data?.nextToken);

  const fetchData = async () => {
    const response = await fetch(`/api/latest_tweets?nextToken=${nextToken}`);
    const json = await response.json();
    setNextToken(json.nextToken);
    setTweets([...(tweets || []), ...json.tweets]);
  };

  if (error) {
    return (
      <Flex
        h="100vh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Text>Something went wrong, sorry.</Text>
      </Flex>
    );
  }

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
    </div>
  );
};

export default Timeline;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  // @ts-ignore
  const httpProtocol = ctx.req.headers.host.includes('localhost')
    ? 'http'
    : 'https';

  const url = `${httpProtocol}://${ctx.req.headers.host}/api/latest_tweets`;

  const response = await fetch(url);
  if (response.status !== 200) {
    return {
      props: {
        error: true,
      },
    };
  }
  const data = await response.json();

  return {
    props: {
      data,
    },
  };
};
