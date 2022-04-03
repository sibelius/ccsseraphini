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

export const ParticleSibAvatar = () => {
  return (
    <ParticleImage
      style={{
        borderRadius: '50%',
        width: '200px',
        height: '200px',
      }}
      maxParticles={8000}
      backgroundColor="transparent" // or other color BACKGROUND_COLOR
      src={RANDOM_LOGO}
      particleOptions={particleOptionsMap[RANDOM_LOGO]}
      entropy={10}
      scale={1}
      mouseMoveForce={(x: number, y: number) => forces.disturbance(x, y, 6)}
      touchMoveForce={(x: number, y: number) => forces.disturbance(x, y, 6)}
      mouseDownForce={(x: number, y: number) => forces.disturbance(x, y, 50)}
    />
  );
};
