import type { NextPage } from 'next';
import Head from 'next/head';
import { Home } from '../components/Home';
import { GetServerSideProps } from 'next';
import { TweetData } from '../types/Tweet';
import { Timeline } from '../components/Timeline';

interface Props {
  tweets?: TweetData[];
  error?: boolean;
}

const HomePage: NextPage<Props> = (props: Props) => {
  return (
    <div>
      <Head>
        <title>cc @sseraphini</title>
        <meta name="description" content="Make it easy to cc @sseraphini" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
      <Timeline tweets={props.tweets} />
    </div>
  );
};

export default HomePage;

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
      tweets: data,
    },
  };
};
