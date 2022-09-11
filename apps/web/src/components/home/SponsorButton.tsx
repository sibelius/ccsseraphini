import { Button, Stack } from '@chakra-ui/react';
import { FaTwitter, FaPatreon } from 'react-icons/fa';
import { SiGooglechrome, SiSubstack, SiVisualstudiocode } from 'react-icons/si';

import { BsMailbox } from 'react-icons/bs';
import { SponsorLogo } from './SponsorLogo';

export const SponsorButton = () => {
  return (
    <>
      <Stack spacing={2} direction={{ base: 'column', md: 'row' }} mt="10px">
        <Button
          backgroundColor="#6058E1"
          textColor="white"
          leftIcon={<SponsorLogo width={22} height={22} />}
          _hover={{ bg: '#8d87fa' }}
          width="100%"
          as={'a'}
          border="none"
          href="https://www.3rdcrypto.com/pay/631a6d9b3b5f3bf6bfcdefbd"
          target="_blank"
          size="sm"
        >
          Crypto Sponsor
        </Button>
      </Stack>
    </>
  );
};
