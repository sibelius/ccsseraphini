import { Button } from '@chakra-ui/react';
import { FaMedal } from 'react-icons/fa';

export const ScoreButton = () => (
  <Button
    bgColor={'rgba(156,255,92,0.91)'}
    as={'a'}
    href="/score"
    target="_blank"
    size="sm"
    leftIcon={<FaMedal />}
    width="100%"
  >
    Score
  </Button>
);
