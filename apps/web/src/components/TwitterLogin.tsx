import { Button } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';

export const TwitterLogin = ({}) => {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Button mt="2" colorScheme={'red'} onClick={() => signOut()}>
          Sign out Twitter
        </Button>
      </>
    );
  }
  return (
    <Button mt="2" colorScheme={'twitter'} onClick={() => signIn()}>
      Login with Twitter
    </Button>
  );
};
