import { Box, Text, Icon, Stack } from '@chakra-ui/react';
import { txtPalette } from 'components/ColorPalette';
import {
  FaHeart,
  FaRetweet,
  FaTwitter,
  FaQuoteLeft,
  FaReply,
  FaTrophy,
} from 'react-icons/fa';
import { UserRanking } from 'types/Ranking';

type MetricsRow = {
  name: string;
  key: string;
  icon: any;
};

interface Props {
  user: UserRanking;
}

export const RankingMetrics = ({ user }: Props) => {
  const { base } = txtPalette;

  const metrics: Array<MetricsRow> = [
    { name: 'Likes', key: 'likes', icon: FaHeart },
    { name: 'Retweets', key: 'retweets', icon: FaRetweet },
    { name: 'Tweets', key: 'tweets', icon: FaTwitter },
    { name: 'Quotes', key: 'quotes', icon: FaQuoteLeft },
    { name: 'Replies', key: 'replies', icon: FaReply },
    { name: 'Score', key: 'score', icon: FaTrophy },
  ];
  return (
    <Stack
      direction="row"
      justify="space-between"
      align="center"
      borderRadius="md"
      flexWrap="wrap"
      p={1}
      mb={1}
    >
      {metrics.map(({ name, key, icon }: MetricsRow) => (
        <Box flex="1 1 25%" py={2} textAlign={'center'} key={key}>
          <Icon as={icon} w={5} h={5} color={base} />
          <Text>{name}: </Text>
          <Text>{(user as any)[key]}</Text>
        </Box>
      ))}
    </Stack>
  );
};
