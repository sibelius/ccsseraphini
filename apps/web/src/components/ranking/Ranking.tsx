import { Heading, Flex, Box, Grid, Icon, Link } from '@chakra-ui/react';
import { useState } from 'react';
import { FaTrophy } from 'react-icons/fa';
import { UserRanking } from 'types/Ranking';
import { bgPalette, txtPalette } from '../ColorPalette';
import { RankingRow } from './RankingRow';
import { RankingModal } from './RankingModal';

interface Props {
  users: UserRanking[];
}

export const Ranking = ({ users }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRanking | null>(null);
  const { base, secondary } = bgPalette;
  const { base: baseTxt } = txtPalette;

  return (
    <Flex
      direction="column"
      align="center"
      h="100vh"
      w={'100vw'}
      bg={base}
      color={baseTxt}
    >
      <Box py={2} display="flex" alignItems="center" flexDir={'column'}>
        <Icon as={FaTrophy} w={10} h={10} color="baseTxt" />
        <Heading as="h1" size="lg" color={baseTxt} fontFamily="fantasy">
          <Link href="https://twitter.com/search?q=%23sserarank">
            #sserarank
          </Link>
        </Heading>
      </Box>
      <Box
        p={1}
        w={['95%', '80%', '80%', '50%']}
        borderRadius="md"
        boxShadow="base"
        bg={secondary}
        overflowY="auto"
      >
        <Grid column={1} gap={2}>
          {users.map((user, index) => (
            <RankingRow
              key={user._id}
              index={index}
              user={user}
              modalState={{ setIsOpen, setSelectedUser }}
            />
          ))}
        </Grid>
        <RankingModal
          user={selectedUser as UserRanking}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </Box>
    </Flex>
  );
};
