import { Flex } from '@chakra-ui/react';
import { TweetComposer } from './TweetComposer';
import { ActionButtons } from './ActionButtons';
import { DonateEth } from './DonateEth';
import { DonateSol } from './DonateSol';
import { DonatePix } from '../pix/DonatePix';
import { SessionProvider } from 'next-auth/react';
import { TwitterLogin } from './TwitterLogin';
import ParticleImage, {
  forces,
  Array2D,
  RGBA,
  ParticleOptions,
  Vector,
} from 'react-particle-image';

const LOGOS = ['/sib1.png', '/sib2.png', '/sib3.png'];

const RANDOM_LOGO = LOGOS[Math.floor(Math.random() * LOGOS.length)];
const RANDOM_COLOR = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
// const BACKGROUND_COLOR = `#${Math.floor(Math.random() * 16777215).toString(
//   16,
// )}`;

interface ParticleOptionParams {
  x: number;
  y: number;
  image: Array2D<RGBA>;
}

type ParticleOptionsMap = {
  [key: string]: ParticleOptions;
};

const particleOptionsMap: ParticleOptionsMap = {
  [RANDOM_LOGO]: {
    mass: () => 40,
    filter: ({ x, y, image }: ParticleOptionParams) => {
      const pixel = image.get(x, y);
      return pixel.b > 50;
    },
    color: () => RANDOM_COLOR,
    friction: () => 0.1,
    initialPosition: ({ canvasDimensions }) => {
      return new Vector(
        canvasDimensions.width / 2,
        canvasDimensions.height / 2,
      );
    },
  },
};

export const Home2 = () => {
  return (
    <Flex
      flex={1}
      maxW={'100%'}
      alignItems="center"
      flexDirection="column"
      pb="10px"
      style={{
        backgroundColor: '#e5e5f7',
        opacity: '0.8',
        backgroundImage:
          'linear-gradient(#444cf7 1px, transparent 1px), linear-gradient(to right, #444cf7 1px, #e5e5f7 1px)',
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
        m={'3'}
      >
        <Flex m="3">
          <ParticleImage
            style={{ borderRadius: '50%', width: '200px', height: '200px' }}
            maxParticles={8000}
            backgroundColor="transparent" // or other color BACKGROUND_COLOR
            src={RANDOM_LOGO}
            particleOptions={particleOptionsMap[RANDOM_LOGO]}
            entropy={10}
            scale={1}
            mouseMoveForce={(x: number, y: number) =>
              forces.disturbance(x, y, 6)
            }
            touchMoveForce={(x: number, y: number) =>
              forces.disturbance(x, y, 6)
            }
            mouseDownForce={(x: number, y: number) =>
              forces.disturbance(x, y, 50)
            }
          />
        </Flex>

        <Flex
          borderWidth="1px"
          borderColor="gray.500"
          borderRadius="lg"
          overflow="hidden"
          p="7"
          flexDirection="column"
          bg="white"
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
