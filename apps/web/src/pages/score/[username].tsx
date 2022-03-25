import type { GetServerSideProps, NextPage } from 'next';
import { Flex, Heading, VStack } from '@chakra-ui/react';
import { Score } from 'components/score/Score';
import { Session, UserScore } from 'types/Score';
import { TwitterLogin } from 'components/home/TwitterLogin';
import { User } from 'types/User';

interface Props {
  session?: Session;
  userScore?: UserScore;
  hasError?: boolean;
  error?: Record<string, any>;
  user?: User;
}

const ScorePage: NextPage<Props> = (props: Props) => {
  const { userScore, hasError, error, user } = props;

  if (hasError) {
    return (
      <VStack h={'100vh'} justifyContent={'center'}>
        <Heading>{error?.message}</Heading>
        {error?.isUnauthorized && <TwitterLogin />}
      </VStack>
    );
  }

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
  const { username } = ctx.query;

  if (!username) {
    return {
      props: {
        hasError: true,
        error: {
          message: 'Bad Request',
        },
      },
    };
  }

  const httpProtocol = ctx.req.headers.host?.includes('localhost')
    ? 'http'
    : 'https';

  const url = `${httpProtocol}://${ctx.req.headers.host}/api/score/${username}`;

  const response = await fetch(url);

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

  const { userScore, user }: { userScore: UserScore; user: User } = data;

  return {
    props: {
      userScore: userScore || null,
      user: user || null,
    },
  };
};
