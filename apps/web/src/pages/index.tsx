import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { TweetData } from '../types/Tweet';
import { Timeline } from '../components/tweet/Timeline';
import { ForkMe } from 'fork-me-corner';
import { Box, Flex } from '@chakra-ui/react';
import { bgPalette } from '../components/ColorPalette';
import { Home } from '../components/home/Home';
import { getHttpProtocol } from '../getHttpProtocol';
import { RandomProvider } from '../components/home/useRandom';
import { Error } from '../components/Error';
import { SessionProvider } from 'next-auth/react';
interface Props {
  tweets?: TweetData[];
  nextToken?: string;
  error?: boolean;
  errorMessage?: string;
  status?: string;
}

const query = '-RT cc @sseraphini -from:sseraphini_bot';

const HomePage: NextPage<Props> = (props: Props) => {
  const { errorMessage, status } = props;
  if (errorMessage) {
    return <Error errorCode={status as string} message={errorMessage} />;
  }
  return (
    <div>
      <Box position="absolute" zIndex="2" top="0" right="0">
        <ForkMe repo="https://github.com/sibelius/ccsseraphini" />
      </Box>
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        gap="12px"
        flexWrap="wrap"
        bgColor={bgPalette.base}
      >
        <SessionProvider>
          <RandomProvider>
            <Home particles={true} />
          </RandomProvider>
        </SessionProvider>

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
  const {
    query: { error, status },
  } = ctx;
  if (error) {
    const errorMessage = (error as string)?.replaceAll('-', ' ');
    return {
      props: {
        error: true,
        errorMessage,
        status: (status as string) || '500',
      },
    };
  }

  const host = ctx.req.headers.host as string;
  const httpProtocol = getHttpProtocol(host);
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
      tweets: data?.tweets,
      nextToken: data?.nextToken || null,
    },
  };
};
