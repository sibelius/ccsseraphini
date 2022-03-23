import type { GetServerSideProps, NextPage } from 'next';
import { Flex, Heading, VStack } from '@chakra-ui/react';
import { getSession, useSession } from 'next-auth/react';
import { Score } from 'components/score/Score';
import { Session, UserScore } from 'types/Score';
import { TwitterLogin } from 'components/TwitterLogin';

interface Props {
  session?: Session;
  userScore?: UserScore;
  hasError?: boolean;
  error?: Record<string, any>;
}

const ScorePage: NextPage<Props> = (props: Props) => {
  const { userScore, hasError, error } = props;
  const { data: session } = useSession();

  if (hasError) {
    return (
      <VStack h={'100vh'} justifyContent={'center'}>
        <Heading>{error?.message}</Heading>
        {error?.isUnauthorized && <TwitterLogin />}
      </VStack>
    );
  }

  const { user } = session as Session;

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
        <Score
          userScore={userScore as UserScore}
          username={user?.name as string}
        />
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
        hasError: true,
        error: {
          message: 'Authorization required',
          isUnauthorized: true,
        },
      },
    };
  }

  const httpProtocol = ctx.req.headers.host?.includes('localhost')
    ? 'http'
    : 'https';

  const url = `${httpProtocol}://${ctx.req.headers.host}/api/userScore`;

  const { id, access_token, username } = session;
  const body = new URLSearchParams({
    providerAccountId: id as string,
    access_token: access_token as string,
    username: username as string,
  }).toString();
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    method: 'POST',
    body,
  });

  if (response.status !== 200) {
    const { message } = await response.json();
    return {
      props: {
        hasError: true,
        error: {
          message,
          isUnauthorized: response.status === 401,
        },
      },
    };
  }
  const data = await response.json();
  const { userScore }: { userScore: UserScore } = data;

  return {
    props: {
      session: session,
      userScore: userScore || null,
    },
  };
};
