import type { GetServerSideProps, NextPage } from 'next';
import { Flex, VStack } from '@chakra-ui/react';
import { Session } from 'types/Score';
import { TwitterLogin } from 'components/home/TwitterLogin';
import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

interface Props {
  session?: Session;
}

const ScorePage: NextPage<Props> = (props: Props) => {
  const router = useRouter();
  const { session } = props;

  if (!session) {
    return (
      <VStack h={'100vh'} justifyContent={'center'}>
        <TwitterLogin />
      </VStack>
    );
  }

  router.push(`/${session.username}`);

  return (
    <div>
      <Flex
        flex={1}
        h={'100vh'}
        w={'100%'}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        pb="10px"
      >
        Redirecting...
      </Flex>
    </div>
  );
};

export default ScorePage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = (await getSession(ctx)) as Session;

  if (!session) {
    return {
      props: {
        session,
      },
    };
  }

  return {
    redirect: {
      destination: `/score/${session.username}`,
      permanent: false,
      // statusCode: 301
    },
  };
};
