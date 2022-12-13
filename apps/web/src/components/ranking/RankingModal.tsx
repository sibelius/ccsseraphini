import {
  Box,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalContent,
  Button,
} from '@chakra-ui/react';
import { UserRanking } from 'types/Ranking';
import { bgPalette, txtPalette } from '../ColorPalette';
import { RankingMetrics } from './RankingMetrics';

interface Props {
  user?: UserRanking;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

type PickLastTweetRanked = Pick<UserRanking, 'lastTweetRanked'>;

const formatLastTweetRanked = ({ lastTweetRanked }: PickLastTweetRanked) =>
  !lastTweetRanked
    ? 'Never'
    : new Date(lastTweetRanked).toLocaleString('pt-BR');

const getLastTweetRanked = ({ lastTweetRanked }: UserRanking) =>
  'Last tweet ranked: ' + formatLastTweetRanked({ lastTweetRanked });

export const RankingModal = ({ user, isOpen, setIsOpen }: Props) => {
  const { secondary } = bgPalette;
  const { base, secondary: secondaryTxt } = txtPalette;

  return (
    <Modal isOpen={isOpen} size={'xl'} onClose={() => setIsOpen(false)}>
      {user && (
        <ModalContent
          w={['90%', '100%']}
          bg={secondary}
          color={base}
          borderRadius="md"
          border={`1px solid ${secondaryTxt}`}
        >
          <ModalHeader borderRadius="md" textAlign={'center'}>
            @{user.username}&apos;s metrics
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RankingMetrics user={user} />
          </ModalBody>
          <ModalFooter>
            <Box flex="1 1 25%" textAlign={'center'}>
              <Text>{getLastTweetRanked(user)}</Text>
            </Box>
            <Button
              variant="outline"
              colorScheme="whiteAlpha"
              onClick={() => setIsOpen(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      )}
    </Modal>
  );
};
