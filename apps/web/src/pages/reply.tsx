import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';
import { Flex, Text } from '@chakra-ui/react';
import { TweetData } from '../types/Tweet';
import { Timeline } from '../components/tweet/Timeline';
import { getHttpProtocol } from '../getHttpProtocol';

interface Props {
  data?: {
    tweets?: TweetData[];
    nextToken?: string;
  };
  error?: boolean;
}

const query = 'from:sseraphini -is:retweet is:reply -from:sseraphini_bot';

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
      <Timeline
        initialTweets={data?.tweets}
        initialNextToken={data?.nextToken}
        query={query}
      />
    </div>
  );
};

export default TimelinePage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
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
      data: {
        tweets: data?.tweets,
        nextToken: data?.nextToken,
      },
    },
  };
};
