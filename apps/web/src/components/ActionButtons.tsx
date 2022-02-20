import { Button, Stack } from '@chakra-ui/react';
import { FaTwitter, FaPatreon } from 'react-icons/fa';
import { SiGooglechrome, SiSubstack } from 'react-icons/si';
import { SibLogo } from './SibLogo';
import { BsMailbox } from 'react-icons/bs';

export const ActionButtons = () => {
  return (
    <>
      <Stack spacing={2} direction={{ base: 'column', md: 'row' }} mt="10px">
        <Button
          backgroundColor="gray.300"
          leftIcon={<FaTwitter />}
          width="100%"
          as={'a'}
          href="https://twitter.com/intent/user?screen_name=sseraphini"
          target="_blank"
          size="sm"
        >
          Follow
        </Button>

        <Button
          colorScheme="orange"
          leftIcon={<FaPatreon />}
          width="100%"
          as={'a'}
          border="none"
          href="https://www.patreon.com/sibelius"
          target="_blank"
          size="sm"
        >
          Sponsor
        </Button>

        <Button
          colorScheme="purple"
          leftIcon={<SiSubstack />}
          width="100%"
          as={'a'}
          border="none"
          href="https://sibelius.substack.com/"
          target="_blank"
          size="sm"
        >
          Articles
        </Button>
      </Stack>
      <Stack spacing={2} direction={{ base: 'column', md: 'row' }} mt="10px">
        <Button
          colorScheme="red"
          leftIcon={<SiGooglechrome />}
          width="100%"
          as={'a'}
          border="none"
          href="https://chrome.google.com/webstore/detail/ccsseraphini/jbdolkjfpfgpbdeeebkhnmfnbkplgalm"
          target="_blank"
          size="sm"
        >
          Install cc @sseraphini
        </Button>

        <Button
          backgroundColor="#171923"
          textColor="white"
          _hover={{ bg: '#2D3748' }}
          leftIcon={<SibLogo width={20} height={20} />}
          width="100%"
          as={'a'}
          border="none"
          href="https://gist.github.com/sibelius/a2b333fa006bdd932e5a3c0c0de914b4"
          target="_blank"
          size="sm"
        >
          Get mentorship
        </Button>
        <Button
          backgroundColor="#FFFF00"
          textColor="black"
          _hover={{ bg: '#FAFAD2' }}
          leftIcon={<BsMailbox />}
          width="100%"
          as={'a'}
          border="none"
          href="https://correioanonimo.com.br/sseraphini"
          target="_blank"
          size="sm"
        >
          Correio anônimo
        </Button>
      </Stack>
    </>
  );
};
