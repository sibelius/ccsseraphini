import type { GetServerSideProps, NextPage } from 'next';
import { Box, Button, Flex, Heading, VStack } from '@chakra-ui/react';
import { Session, UserScore } from 'types/Score';
import { TwitterLogin } from 'components/home/TwitterLogin';
import { User } from 'types/User';
import { useRef } from 'react';
import { FaTwitter } from 'react-icons/fa';
import ScoreVisual from 'components/score/ScoreVisual';

interface Props {
  session?: Session;
  userScore?: UserScore;
  hasError?: boolean;
  error?: Record<string, any>;
  user?: User;
}

const ScorePage: NextPage<Props> = (props: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
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
        h={'100vh'}
        w={'100%'}
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        bgColor="#cbc9d5"
      >
        <Flex w={'100%'} color={'white'} justifyContent="center" h="70%">
          <Box ref={ref} w="80%" h="100%">
            <ScoreVisual userScore={userScore as UserScore} user={user} />
          </Box>
        </Flex>

        <Button mt={16} leftIcon={<FaTwitter />} colorScheme={'twitter'}>
          Share
        </Button>
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
