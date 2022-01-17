import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Flex, Text } from '@chakra-ui/react';
import { TweetData } from '../types/Tweet';
import { Timeline } from '../components/Timeline';

interface Props {
  data?: {
    tweets?: TweetData[];
    nextToken?: string;
  };
  error?: boolean;
}

const TimelinePage: NextPage<Props> = ({ data, error }: Props) => {
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

      <Timeline
        initialTweets={data?.tweets}
        initialNextToken={data?.nextToken}
      />
    </div>
  );
};

export default TimelinePage;

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
      data: {
        tweets: data?.tweets,
        nextToken: data?.nextToken,
      },
    },
  };
};
