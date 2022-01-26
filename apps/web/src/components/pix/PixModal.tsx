import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
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
            <PixQrCode />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
