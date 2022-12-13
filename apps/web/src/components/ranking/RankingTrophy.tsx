import { Icon } from '@chakra-ui/react';
import { FaTrophy } from 'react-icons/fa';

interface Props {
  index: number;
}

export const RankingTrophy = ({ index }: Props) => {
  if (index > 2) return <></>;

  const trophyColor = {
    1: 'yellow.400',
    2: 'gray.400',
    3: 'orange.400',
  };
  const position = (index + 1) as 1 | 2 | 3;
  const color = trophyColor[position];

  return <Icon as={FaTrophy} w={5} h={5} mx={1} color={color} />;
};
