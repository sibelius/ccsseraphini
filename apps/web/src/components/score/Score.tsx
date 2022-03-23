import { Heading, Flex, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { UserScore } from 'types/Score';

export const Score = () => {
  const { data: session } = useSession();
  const [errors, setErrors] = useState<Record<string, unknown> | boolean>(
    false,
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [score, setScore] = useState<UserScore>({
    retweet_count: 0,
    reply_count: 0,
    like_count: 0,
    quote_count: 0,
    total: 0,
  });

  useEffect(() => {
    if (session) {
      const updateScore = async (session: any) => {
        const body = new URLSearchParams({
          providerAccountId: session?.id,
          access_token: session?.access_token as string,
          username: session.username,
        }).toString();
        setLoading(true);

        const { userScore } = await fetch(`/api/userScore`, {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          method: 'POST',
          body,
        })
          .then(async (response) => {
            setErrors(false);
            return await response.json();
          })
          .catch((error: any) => {
            setErrors(error);
          });

        setScore(userScore);
        setLoading(false);
      };

      updateScore(session);
    }
  }, [session]);

  if (errors) {
    return <Heading>Oops! Something is wrong!</Heading>;
  }

  if (!!session && !loading) {
    return (
      <Flex>
        <VStack>
          <Heading>{session?.user?.name || 'Guest'}, your score is</Heading>
          <Heading>
            Replies: {score.reply_count} Likes: {score.like_count} Retweets:{' '}
            {score.retweet_count} Quotes: {score.quote_count}
          </Heading>
          <Heading>Total: {score.total}</Heading>
        </VStack>
      </Flex>
    );
  }

  return <Heading> Loading...</Heading>;
};
