import { Flex } from '@chakra-ui/react';
import { TweetComposer } from './TweetComposer';
import { ActionButtons } from './ActionButtons';
import { DonateEth } from './DonateEth';
import { DonateSol } from './DonateSol';
import { DonatePix } from '../pix/DonatePix';
import { SessionProvider } from 'next-auth/react';
import { TwitterLogin } from './TwitterLogin';
import { bgPalette } from '../ColorPalette';
import { ParticleSibAvatar } from './ParticleSibAvatar';

export const Home = () => {
  return (
    <Flex
      flex={1}
      maxW={'100%'}
      alignItems="center"
      flexDirection="column"
      pb="10px"
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
        <Flex m="3">
          <ParticleSibAvatar />
        </Flex>

        <Flex
          boxShadow={'1px 1px 6px 4px rgba(156,255,92,0.91);'}
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
