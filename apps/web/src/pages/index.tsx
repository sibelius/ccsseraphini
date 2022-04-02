import type { NextPage } from 'next';
import { Home } from '../components/home/Home';
import { GetServerSideProps } from 'next';
import { TweetData } from '../types/Tweet';
import { Timeline } from '../components/tweet/Timeline';
import { ForkMe } from 'fork-me-corner';
import { Flex } from '@chakra-ui/react';
import { bgPalette } from '../components/ColorPalette';

interface Props {
  tweets?: TweetData[];
  nextToken?: string;
  error?: boolean;
}

const query = '-RT cc @sseraphini -from:sseraphini_bot';

const HomePage: NextPage<Props> = (props: Props) => {
  return (
    <div>
      <ForkMe repo="https://github.com/sibelius/ccsseraphini" />
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        gap="12px"
        flexWrap="wrap"
        bgColor={bgPalette.base}
      >
        <Home />
        <Timeline
          initialTweets={props?.tweets}
          initialNextToken={props?.nextToken}
          query={query}
        />
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
