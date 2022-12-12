import { Ranking } from 'components/Ranking';
import { getHttpProtocol } from 'getHttpProtocol';
import type { GetServerSideProps, NextPage } from 'next';
import { useEffect, useState } from 'react';
import { UserRanking } from 'types/Ranking';

interface Props {
  users?: UserRanking[];
}

const RankingPage: NextPage = (props: Props) => {
  const [users, setUsers] = useState<UserRanking[]>([]);

  useEffect(() => {
    if (!props.users) {
      return;
    }

    setUsers(props.users);
  }, [users, props.users]);

  return <Ranking users={users as UserRanking[]} />;
};
export default RankingPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const host = ctx.req.headers.host as string;
  const httpProtocol = getHttpProtocol(host);
  const url = `${httpProtocol}://${host}/api/ranking`;
  const response = await fetch(url);

  if (response.status !== 200) {
    return {
      props: {
        users: [],
      },
    };
  }

  return {
    props: {
      users: await response.json(),
    },
  };
};
