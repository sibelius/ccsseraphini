import { Button, Stack } from '@chakra-ui/react';
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
      <Stack
        spacing={2}
        direction={{ base: 'row', md: 'column' }}
        mt={{ base: '10px', md: '0' }}
        justify="center"
      >
        <Button
          backgroundColor="white"
          borderWidth="1px"
          borderColor="gray.500"
          borderRadius="lg"
          leftIcon={<PixLogo width={20} height={20} />}
          mt={{ base: '0', md: '10px' }}
          size="sm"
          onClick={openModal}
        >
          Donate PIX
        </Button>
      </Stack>
      <PixModal isOpen={isModalOpen} closeModal={closeModal} />
    </>
  );
};
