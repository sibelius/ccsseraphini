import { Button } from '@chakra-ui/react';
import { config } from 'config';
import { FaDiscord } from 'react-icons/fa';

export const DiscordClaimButton = ({ totalScore }: { totalScore: number }) => {
  const minScore = config.DISCORD_SCORE_THRESHOLD as number;
  const disabled = totalScore < minScore;
  const href = !disabled ? '/discord/claim' : undefined;

  return (
    <Button
      bg={'#7289DA'}
      disabled={disabled}
      _hover={{ color: '#000000', bg: '#8299EA' }}
      as={'a'}
      href={href}
      leftIcon={<FaDiscord />}
      color="#ffffff"
    >
      Discord Guild Claim
    </Button>
  );
};
