import { Flex, Image } from '@chakra-ui/react';
import { TweetComposer } from './TweetComposer';
import { ActionButtons } from './ActionButtons';
import { DonateEth } from './DonateEth';
import { DonateSol } from './DonateSol';
import { DonatePix } from '../pix/DonatePix';
import { SessionProvider } from 'next-auth/react';
import { TwitterLogin } from './TwitterLogin';
import { bgPalette } from '../ColorPalette';

export const Home = () => {
  return (
    <Flex
      flex={1}
      maxW={'100%'}
      // height="100vh"
      alignItems="center"
      // justifyContent="center"
      flexDirection="column"
      // bg="gray.400"
      pb="10px"
      style={{
        backgroundColor: `${bgPalette.secondaryVar}`,
        backgroundImage: `linear-gradient(${bgPalette.details} 1px, transparent 1px), linear-gradient(to right, ${bgPalette.details} 1px, ${bgPalette.secondaryVar} 1px)`,
        backgroundSize: '20px 20px',
      }}
    >
      <Flex
        alignItems="center"
        flexDirection="column"
        px={'12px'}
        style={{
          width: '100%',
          position: 'sticky',
          top: '0',
        }}
      >
        <Image
          borderRadius="full"
          boxSize="100px"
          objectFit="cover"
          src="https://unavatar.io/twitter/sseraphini"
          alt="Sibelius Seraphini"
          m="3"
        />

        <Flex
          borderWidth="2px"
          borderColor="#000"
          borderRadius="lg"
          overflow="hidden"
          p="7"
          flexDirection="column"
          bg={bgPalette.secondary}
          width={'100%'}
          minW={'300px'}
          maxW={'430px'}
        >
          <TweetComposer />
          <ActionButtons />
          <DonateEth />
          <DonateSol />
          <DonatePix />
          <SessionProvider>
            <TwitterLogin />
          </SessionProvider>
        </Flex>
      </Flex>
    </Flex>
  );
};
