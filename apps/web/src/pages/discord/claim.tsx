import type { GetServerSideProps, NextPage } from 'next';
import { Session, UserScore } from 'types/Score';
import { TwitterLogin } from 'components/home/TwitterLogin';
import { User } from 'types/User';
import { getHttpProtocol } from 'getHttpProtocol';
import { getSession } from 'next-auth/react';
import { Error } from 'components/Error';

interface Props {
  session?: Session;
  userScore?: UserScore;
  hasError?: boolean;
  error?: Record<string, string | boolean | undefined | number>;
  user?: User;
}

const ClaimPage: NextPage<Props> = (props: Props) => {
  const { error } = props;

  if (!error) {
    return <Error errorCode="404" message="Not found" />;
  }

  const statusCode = error.statusCode as number;

  interface ChildrenStatus {
    [index: number]: JSX.Element;
  }

  const children: ChildrenStatus = {
    401: <TwitterLogin />,
  };

  return (
    <Error errorCode={statusCode} message={error.message as string}>
      {children[statusCode]}
    </Error>
  );
};

export default ClaimPage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = (await getSession(ctx)) as Session;

  if (!session) {
    return {
      props: {
        error: {
          message: 'Unauthorized',
          statusCode: 401,
        },
      },
    };
  }

  const host = ctx.req.headers.host as string;
  const httpProtocol = getHttpProtocol(host);
  const url = `${httpProtocol}://${ctx.req.headers.host}/api/discord/oauth`;

  const { url: guildInviteUrl } = await fetch(url);

  if (!guildInviteUrl) {
    return {
      props: {
        error: {
          message: 'Something went wrong',
          statusCode: 500,
        },
      },
    };
  }

  return {
    redirect: {
      permanent: false,
      destination: guildInviteUrl,
    },
  };
};
