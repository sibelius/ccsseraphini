import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';
import { emv } from './emv';
import { PixQrCode } from './PixQrCode';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

export const PixModal = ({ isOpen, closeModal }: Props) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Scan the QR Code below</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Flex justifyContent="center">
                <PixQrCode />
              </Flex>

              <CopyToClipboard text={emv}>
                <Button colorScheme="green" leftIcon={<FaCopy />}>
                  Copy QR code
                </Button>
              </CopyToClipboard>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
