import type { NextPage } from 'next';
import Head from 'next/head';
import { Flex, Text } from '@chakra-ui/react';
import { TweetData } from 'types/Tweet';
import TweetInfo from 'components/TweetInfo';

interface Props {
  data: TweetData[];
}

const LatestTweets: NextPage<Props> = ({ data }: Props) => {
  if (!data) return <p>No tweets found!</p>;

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
        {data?.map((tweet) => (
          <TweetInfo key={tweet.id} tweet={tweet} />
        ))}
      </Flex>
    </div>
  );
};

export default LatestTweets;

export async function getServerSideProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/latest_tweets`,
  );
  const data = await response.json();
  return {
    props: {
      data,
    },
  };
}
