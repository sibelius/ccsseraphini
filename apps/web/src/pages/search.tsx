import type { NextPage } from 'next';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { Flex, Image, Text, Textarea } from '@chakra-ui/react';
import { TweetData } from '../types/Tweet';
import { Timeline } from '../components/Timeline';
import { useDebouncedCallback } from 'use-debounce';
import Router from 'next/router';

interface Props {
  data?: {
    tweets?: TweetData[];
    nextToken?: string;
    initialSearch: string;
  };
  error?: boolean;
}

const debounceDelay = 1000;

const rtQuery = '-RT cc @sseraphini';

const getQuery = (value: string) => {
  if (value.includes('OR') || value.includes('AND')) {
    return `(${value}) ${rtQuery}`;
  }

  return `${value} ${rtQuery}`;
};

const TimelinePage: NextPage<Props> = ({ data, error }: Props) => {
  const [query, setQuery] = useState('-RT cc @sseraphini');
  const [search, setSearch] = useState(data?.initialSearch || '');

  const updateQuery = useDebouncedCallback((value) => {
    setQuery(getQuery(value));

    Router.push({
      pathname: '/search',
      query: { q: encodeURI(value) },
    });
  }, debounceDelay);

  const updateSearch = (value: string) => {
    setSearch(value);
    updateQuery(value);
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
        flex={1}
        maxW={'100%'}
        // height="100vh"
        alignItems="center"
        // justifyContent="center"
        flexDirection="column"
        // bg="gray.400"
        pb="10px"
        style={{
          backgroundColor: '#e5e5f7',
          opacity: '0.8',
          backgroundImage:
            'linear-gradient(#444cf7 1px, transparent 1px), linear-gradient(to right, #444cf7 1px, #e5e5f7 1px)',
          backgroundSize: '20px 20px',
        }}
      >
        <Flex
          alignItems="center"
          flexDirection="column"
          px={'12px'}
          style={{
            width: '100%',
            position: 'sticky',
            top: '0',
          }}
        >
          <Image
            borderRadius="full"
            boxSize="100px"
            objectFit="cover"
            src="https://unavatar.io/twitter/sseraphini"
            alt="Sibelius Seraphini"
            m="4"
          />
          <Flex
            m="4"
            borderWidth="1px"
            borderColor="gray.500"
            borderRadius="lg"
            overflow="hidden"
            p="8"
            flexDirection="column"
            bg="white"
            width={'100%'}
            maxW={'fit-content'}
            minW={{ md: 'unset', base: 'calc(100vw - 24px)' }}
          >
            <Textarea
              size="md"
              resize="none"
              minHeight="5.8rem"
              placeholder="Search"
              value={search}
              onChange={(e) => updateSearch(e.target.value)}
            />
          </Flex>
        </Flex>
      </Flex>
      <Timeline
        initialTweets={data?.tweets}
        initialNextToken={data?.nextToken}
        query={query}
        isSearch={true}
      />
    </div>
  );
};

export default TimelinePage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const httpProtocol = ctx.req.headers.host?.includes('localhost')
    ? 'http'
    : 'https';

  // @ts-ignore
  const initialSearch = decodeURI(ctx.query.q || '');

  const query = getQuery(initialSearch);

  const url = `${httpProtocol}://${ctx.req.headers.host}/api/tweets?query=${query}`;

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
        initialSearch,
        tweets: data?.tweets,
        nextToken: data?.nextToken || null,
      },
    },
  };
};
