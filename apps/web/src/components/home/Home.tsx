import { Flex, HStack, Image } from '@chakra-ui/react';
import { TweetComposer } from './TweetComposer';
import { ActionButtons } from './ActionButtons';
import { DonateEth } from './DonateEth';
import { DonateSol } from './DonateSol';
import { DonatePix } from '../pix/DonatePix';
import { SessionProvider } from 'next-auth/react';
import { TwitterLogin } from './TwitterLogin';
import { bgPalette } from '../ColorPalette';
import { ParticleSibAvatar } from './ParticleSibAvatar';
import { ScoreButton } from './ScoreButton';

type Props = {
  particles?: boolean;
};

export const Home = ({ particles = false }: Props) => {
  const getStyleProps = () => {
    if (particles) {
      return {};
    }

    return {
      style: {
        backgroundColor: `${bgPalette.secondaryVar}`,
        backgroundImage: `linear-gradient(${bgPalette.details} 1px, transparent 1px), linear-gradient(to right, ${bgPalette.details} 1px, ${bgPalette.secondaryVar} 1px)`,
        backgroundSize: '20px 20px',
      },
    };
  };

  const getLogo = () => {
    if (particles) {
      return (
        <Flex m="3">
          <ParticleSibAvatar />
        </Flex>
      );
    }

    return (
      <Image
        borderRadius="full"
        boxSize="100px"
        objectFit="cover"
        src="https://unavatar.io/twitter/sseraphini"
        alt="Sibelius Seraphini"
        m="3"
      />
    );
  };

  return (
    <Flex
      flex={1}
      maxW={'100%'}
      alignItems="center"
      flexDirection="column"
      pb="10px"
      {...getStyleProps()}
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
        {getLogo()}
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
          <HStack
            spacing={2}
            direction={{ base: 'column', md: 'row' }}
            mt="10px"
          >
            <ScoreButton />
            <SessionProvider>
              <TwitterLogin />
            </SessionProvider>
          </HStack>
        </Flex>
      </Flex>
    </Flex>
  );
};
