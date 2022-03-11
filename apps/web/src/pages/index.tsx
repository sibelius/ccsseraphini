import type { NextPage } from 'next';
import Head from 'next/head';
import { Home } from '../components/Home';
import { GetServerSideProps } from 'next';
import { Timeline, TweetData } from '../components/Timeline';
import { ForkMe } from 'fork-me-corner';
import { Flex } from '@chakra-ui/react';
import { InstantSearch } from 'react-instantsearch-hooks';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

interface Props {
  tweets?: TweetData[];
  nextToken?: string;
  error?: boolean;
}

const query = '-RT cc @sseraphini';

const searchClient = instantMeiliSearch(
  'https://droplet.juliomerisio.com',
  process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY,
);

const HomePage: NextPage<Props> = (props: Props) => {
  return (
    <div>
      <Head>
        <title>cc @sseraphini</title>
        <meta name="description" content="Make it easy to cc @sseraphini" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ForkMe repo="https://github.com/sibelius/ccsseraphini" />
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        gap="12px"
        flexWrap="wrap"
      >
        <InstantSearch
          indexName="tweets"
          searchClient={searchClient}
          suppressExperimentalWarning
        >
          <Home />

          <Timeline
            initialTweets={props?.tweets}
            initialNextToken={props?.nextToken}
            query={query}
          />
        </InstantSearch>
      </Flex>
    </div>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const httpProtocol = ctx.req.headers.host?.includes('localhost')
    ? 'http'
    : 'https';

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
      tweets: data?.tweets,
      nextToken: data?.nextToken || null,
    },
  };
};
