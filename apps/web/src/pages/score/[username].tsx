import type { GetServerSideProps, NextPage } from 'next';
import { Button, Heading, Stack, VStack } from '@chakra-ui/react';
import { Session, UserScore } from 'types/Score';
import { TwitterLogin } from 'components/home/TwitterLogin';
import { User } from 'types/User';
import { FaTwitter } from 'react-icons/fa';
import ScoreVisual from 'components/score/ScoreVisual';
import { ScorePageStyled } from 'components/score/ScoreStyle';
import { MutableRefObject, useRef } from 'react';
import exportAsImage from '../../canvasUtil';
import { getHttpProtocol } from 'getHttpProtocol';
import html2canvas from 'html2canvas';
import { DiscordClaimButton } from 'components/score/DiscordClaimButton';

interface Props {
  session?: Session;
  userScore?: UserScore;
  hasError?: boolean;
  error?: Record<string, string | boolean | undefined>;
  user?: User;
}

const ScorePage: NextPage<Props> = (props: Props) => {
  const { userScore, hasError, error, user } = props;
  const ref = useRef<HTMLDivElement | null>(null);
  const username = user?.username as string;

  if (hasError) {
    return (
      <VStack h={'100vh'} justifyContent={'center'}>
        <Heading>{error?.message}</Heading>
        {error?.isUnauthorized && <TwitterLogin />}
      </VStack>
    );
  }

  const clickHandler = async (
    ref: MutableRefObject<HTMLDivElement | null>,
    username: string,
  ) => {
    const current = ref.current as HTMLDivElement;

    if (current) {
      const time = new Date().getTime();
      const imageName = `score_${username}_${time}`;

      const canvas = await html2canvas(current, {
        allowTaint: true,
        useCORS: true,
      });
      const dataUrl = canvas.toDataURL('image/png', 1.0);

      const blob = await (await fetch(dataUrl)).blob();
      const filesArray: File[] = [
        new File([blob], `${imageName}.png`, {
          type: blob.type,
          lastModified: new Date().getTime(),
        }),
      ];
      const shareData = {
        files: filesArray,
      };

      try {
        if (navigator.share) {
          await navigator.share(shareData as any);
        } else {
          await exportAsImage(current, imageName);
        }
      } catch (err) {
        // eslint-disable-next-line
        console.log('err: ', err);

        await exportAsImage(current, imageName);
      }
    }
  };

  return (
    <ScorePageStyled>
      <ScoreVisual
        scoreRef={ref}
        userScore={userScore as UserScore}
        user={user}
      />
      <Stack mt={'5%'} direction={'row'}>
        <Button
          onClick={async () => await clickHandler(ref, username)}
          leftIcon={<FaTwitter />}
          colorScheme={'twitter'}
        >
          Share
        </Button>
        <DiscordClaimButton totalScore={userScore?.total ?? 0} />
      </Stack>
    </ScorePageStyled>
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

  const host = ctx.req.headers.host as string;
  const httpProtocol = getHttpProtocol(host);
  const url = `${httpProtocol}://${ctx.req.headers.host}/api/score/${username}`;

  const response = await fetch(url);

  if (response.status !== 200) {
    const { message }: { message: string } = await response.json();
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
