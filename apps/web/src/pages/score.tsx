import type { GetServerSideProps, NextPage } from 'next';
import { Session } from 'types/Score';
import { getSession } from 'next-auth/react';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { NextRouter, useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import { bgPalette, txtPalette } from 'components/ColorPalette';

interface Props {
  username: string;
}

const handleClick = (
  username: string,
  router: NextRouter,
  setDisableButton: Dispatch<SetStateAction<boolean>>,
) => {
  setDisableButton(true);
  router.push('/score/[username]', `/score/${username}`);
};

const ScorePage: NextPage<Props> = (props: Props) => {
  const router = useRouter();
  const [username, setUsername] = useState(props.username);
  const [disableButton, setDisableButton] = useState(false);

  return (
    <Flex
      h={'100vh'}
      alignItems={'center'}
      justifyContent={'center'}
      p={'12px'}
      style={{
        backgroundColor: `${bgPalette.secondaryVar}`,
        backgroundImage: `linear-gradient(${bgPalette.details} 1px, transparent 1px), linear-gradient(to right, ${bgPalette.details} 1px, ${bgPalette.secondaryVar} 1px)`,
        backgroundSize: '20px 20px',
      }}
    >
      <InputGroup verticalAlign={'middle'} w={'50%'} size="md">
        <InputLeftElement color={txtPalette.primary} fontSize="1.2em">
          @
        </InputLeftElement>
        <Input
          color={txtPalette.base}
          bg={bgPalette.secondary}
          pr="4.5rem"
          placeholder="sseraphini"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button
            disabled={disableButton}
            bg={bgPalette.primary}
            color={txtPalette.baseVar}
            size="sm"
            onClick={() => {
              handleClick(username, router, setDisableButton);
            }}
          >
            Go
          </Button>
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
};

export default ScorePage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const session = (await getSession(ctx)) as Session;

  const username = session?.username ?? 'sseraphini';
  return {
    props: {
      username,
    },
  };
};
