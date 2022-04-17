import { Button } from '@chakra-ui/react';
import { FaDiscord } from 'react-icons/fa';

export const DiscordClaimButton = () => {
  return (
    <Button
      bg={'#7289DA'}
      _hover={{ color: '#000000', bg: '#8299EA' }}
      as={'a'}
      mt="10px"
      href="/discord/claim"
      size="sm"
      leftIcon={<FaDiscord />}
      color="#ffffff"
    >
      Discord Guild Claim
    </Button>
  );
};
