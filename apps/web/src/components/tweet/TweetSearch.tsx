import type { NextPage } from 'next';
import { useState } from 'react';
import { GetServerSideProps } from 'next';
import { Flex, Input, Text } from '@chakra-ui/react';
import { TweetData } from '../../types/Tweet';
import { Timeline } from './Timeline';
import { useDebouncedCallback } from 'use-debounce';
import { SearchLogo } from './SearchLogo';
import { getHttpProtocol } from '../../getHttpProtocol';

interface Props {
  data?: {
    tweets?: TweetData[];
    nextToken?: string;
    initialSearch: string;
  };
  error?: boolean;
}

const debounceDelay = 1000;

const rtQuery = '-RT cc @sseraphini -from:sseraphini_bot';

const getQuery = (value: string) => {
  if (value.includes('OR') || value.includes('AND')) {
    return `(${value}) ${rtQuery}`;
  }
  return `${value} ${rtQuery}`;
};

const TimelinePage: NextPage<Props> = ({ data, error }: Props) => {
  const [query, setQuery] = useState('-RT cc @sseraphini -from:sseraphini_bot');
  const [search, setSearch] = useState(data?.initialSearch || '');

  const updateQuery = useDebouncedCallback((value) => {
    setQuery(getQuery(value));
  }, debounceDelay);

  const updateSearch = (value: string) => {
    setSearch(value);
    updateQuery(value);
  };

  if (error) {
    return (
      <>
        <Flex
          alignItems="center"
          justifyContent="center"
          width="100%"
          mb="20px"
        >
          <SearchLogo width={20} height={20} />
          <Input
            placeholder="Search"
            width="85px"
            height="30px"
            margin="0 10px"
            transitionProperty="width"
            transitionDuration=".5s"
            transitionTimingFunction="ease"
            _focus={{
              width: '85%',
            }}
            onChange={(e) => updateSearch(e.target.value)}
          ></Input>
        </Flex>
        <Text>Something went wrong, sorry.</Text>
      </>
    );
  }

  return (
    <>
      <Flex
        alignItems="center"
        justifyContent="center"
        width="100%"
        mb="20px"
        opacity=".5"
        _focusWithin={{
          opacity: 1,
        }}
      >
        <SearchLogo width={20} height={20} />
        <Input
          placeholder="Search"
          width="85px"
          height="30px"
          margin="0 10px"
          transitionProperty="width"
          transitionDuration=".5s"
          transitionTimingFunction="ease"
          _focus={{
            width: '85%',
          }}
          onChange={(e) => updateSearch(e.target.value)}
        />
      </Flex>
      <Timeline
        initialTweets={data?.tweets}
        initialNextToken={data?.nextToken}
        query={query}
        isSearch={true}
      />
    </>
  );
};

export default TimelinePage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const host = ctx.req.headers.host as string;
  const httpProtocol = getHttpProtocol(host);

  // @ts-ignore
  const initialSearch = decodeURI(ctx.query.q || '');

  const query = getQuery(initialSearch);

  const url = `${httpProtocol}://${host}/api/tweets?query=${query}`;

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
