import { Button, Stack } from '@chakra-ui/react';
import { FaTwitter, FaPatreon } from 'react-icons/fa';
import { SiGooglechrome, SiSubstack } from 'react-icons/si';

export const ActionButtons = () => {
  return (
    <>
      <Stack
        spacing={2}
        direction={{ base: 'row', md: 'column' }}
        mt={{ base: '10px', md: '0' }}
      >
        <Button
          backgroundColor="gray.300"
          leftIcon={<FaTwitter />}
          mt={{ base: '0', md: '10px' }}
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
          mt={{ base: '0', md: '10px' }}
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
          mt={{ base: '0', md: '10px' }}
          width="100%"
          as={'a'}
          border="none"
          href="https://sibelius.substack.com/"
          target="_blank"
          size="sm"
        >
          Articles
        </Button>

        <Button
          colorScheme="red"
          leftIcon={<SiGooglechrome />}
          mt={{ base: '0', md: '10px' }}
          width="100%"
          as={'a'}
          border="none"
          href="https://chrome.google.com/webstore/detail/ccsseraphini/jbdolkjfpfgpbdeeebkhnmfnbkplgalm"
          target="_blank"
          size="sm"
        >
          Install cc @sseraphini
        </Button>
      </Stack>
    </>
  );
};
