import ParticleImage, {
  forces,
  Array2D,
  RGBA,
  ParticleOptions,
  Vector,
} from 'react-particle-image';
import { useRandom } from './useRandom';

const LOGOS = ['/sib1.png', '/sib2.png', '/sib3.png'];

// const BACKGROUND_COLOR = `#${Math.floor(Math.random() * 16777215).toString(
//   16,
// )}`;

interface ParticleOptionParams {
  x: number;
  y: number;
  image: Array2D<RGBA>;
}

export const ParticleSibAvatar = () => {
  const { randomNumber } = useRandom();

  const getRandomLogo = (rand: number) => {
    const randomLogo = LOGOS[Math.floor(rand * LOGOS.length)];
    const randomColor = `#${Math.floor(rand * 16777215).toString(16)}`;

    const particleOptions: ParticleOptions = {
      mass: () => 40,
      filter: ({ x, y, image }: ParticleOptionParams) => {
        const pixel = image.get(x, y);
        return pixel.b > 50;
      },
      color: () => randomColor,
      friction: () => 0.1,
      initialPosition: ({ canvasDimensions }) => {
        return new Vector(
          canvasDimensions.width / 2,
          canvasDimensions.height / 2,
        );
      },
    };

    return {
      randomLogo,
      particleOptions,
      randomColor,
    };
  };

  const { randomLogo, particleOptions } = getRandomLogo(randomNumber);

  return (
    <ParticleImage
      style={{
        borderRadius: '50%',
        width: '200px',
        height: '200px',
      }}
      maxParticles={8000}
      backgroundColor="transparent" // or other color BACKGROUND_COLOR
      src={randomLogo}
      particleOptions={particleOptions}
      entropy={10}
      scale={1}
      mouseMoveForce={(x: number, y: number) => forces.disturbance(x, y, 6)}
      touchMoveForce={(x: number, y: number) => forces.disturbance(x, y, 6)}
      mouseDownForce={(x: number, y: number) => forces.disturbance(x, y, 50)}
    />
  );
};
