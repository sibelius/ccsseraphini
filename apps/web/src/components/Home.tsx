import { Flex, Image } from '@chakra-ui/react';
import { TweetComposer } from './TweetComposer';
import { ActionButtons } from './ActionButtons';
import { DonateCrypto } from './DonateCrypto';
import { ForkMe } from 'fork-me-corner';

export const Home = () => {
  return (
    <>
      <ForkMe repo="https://github.com/sibelius/ccsseraphini" />
      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        bg="gray.400"
      >
        <Image
          borderRadius="full"
          boxSize="100px"
          objectFit="cover"
          src="https://unavatar.io/twitter/sseraphini"
          alt="Sibelius Seraphini"
          m="4"
        />

        <Flex
          minW={{ base: '98%', md: 'sm' }}
          maxW="98%"
          borderWidth="1px"
          borderColor="gray.500"
          borderRadius="lg"
          overflow="hidden"
          p="8"
          flexDirection="column"
          bg="white"
        >
          <TweetComposer />
          <ActionButtons />
          <DonateCrypto />
        </Flex>
      </Flex>
    </>
  );
};
