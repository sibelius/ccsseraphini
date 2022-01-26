import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { PixModal } from './PixModal';
import { PixLogo } from './PixLogo';

export const DonatePix = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        backgroundColor="white"
        borderWidth="1px"
        borderColor="gray.500"
        borderRadius="lg"
        leftIcon={<PixLogo width={20} height={20} />}
        mt="10px"
        size="sm"
        onClick={openModal}
      >
        Donate PIX
      </Button>
      <PixModal isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};
