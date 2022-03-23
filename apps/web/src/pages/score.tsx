import type { NextPage } from 'next';
import Head from 'next/head';
import { Flex } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { Score } from 'components/score/Score';
import { Session } from 'next-auth/core/types';

interface Props {
  error?: boolean;
  session?: Session;
}

const ScorePage: NextPage<Props> = ({ session }: Props) => {
  return (
    <div>
      <Head>
        <title>cc @sseraphini - Latest tweets</title>
        <meta name="description" content="Make it easy to cc @sseraphini" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        flex={1}
        h={'100vh'}
        w={'100%'}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        pb="10px"
      >
        <SessionProvider session={session}>
          <Score />
        </SessionProvider>
      </Flex>
    </div>
  );
};

export default ScorePage;
