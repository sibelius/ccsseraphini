import { Flex, Image } from '@chakra-ui/react';
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
import { useRandom } from './useRandom';
import { SponsorButton } from './SponsorButton';

type Props = {
  particles?: boolean;
};

export const Home = ({ particles = false }: Props) => {
  const { randomNumber } = useRandom();
  const randomColor = `#${Math.floor(randomNumber * 16777215).toString(16)}`;
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
          boxShadow={`1px 1px 6px 4px ${randomColor};`}
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
          <SponsorButton />
          <Flex mt="10px" gap={2}>
            <ScoreButton />
            <SessionProvider>
              <TwitterLogin />
            </SessionProvider>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
