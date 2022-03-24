import { Button } from '@chakra-ui/react';
import { signIn, signOut, useSession } from 'next-auth/react';

export const TwitterLogin = () => {
  const { data: session } = useSession();

  type ButtonProps = {
    [index: string]: {
      onClick: () => Promise<undefined>;
      colorScheme: string;
      text: string;
    };
  };

  const buttonProps: ButtonProps = {
    login: {
      onClick: () => signIn('twitter'),
      colorScheme: 'twitter',
      text: 'Login with Twitter',
    },
    logout: {
      onClick: () => signOut(),
      colorScheme: 'red',
      text: 'Logout with Twitter',
    },
  };

  const sessionMode = !!session ? 'logout' : 'login';
  const props = buttonProps[sessionMode];

  return (
    <Button mt="2" {...props}>
      {props.text}
    </Button>
  );
};
