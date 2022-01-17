import { Box, Flex, Button, Textarea, Badge, Image } from '@chakra-ui/react';
import { FaTwitter, FaPatreon } from 'react-icons/fa';
import { SiSubstack } from 'react-icons/si';

export const ActionButtons = () => {
  return (
    <>
      <Button
        backgroundColor="gray.300"
        leftIcon={<FaTwitter />}
        mt="10px"
        as={'a'}
        href="https://twitter.com/intent/user?screen_name=sseraphini"
        target="_blank"
      >
        Follow
      </Button>

      <Button
        colorScheme="orange"
        leftIcon={<FaPatreon />}
        mt="10px"
        as={'a'}
        border="none"
        href="https://www.patreon.com/sibelius"
        target="_blank"
      >
        Sponsor
      </Button>

      <Button
        colorScheme="purple"
        leftIcon={<SiSubstack />}
        mt="10px"
        as={'a'}
        border="none"
        href="https://sibelius.substack.com/"
        target="_blank"
      >
        Articles
      </Button>
    </>
  );
};
