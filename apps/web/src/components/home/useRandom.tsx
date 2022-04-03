import { useRef } from 'react';

export const useRandom = (): number => {
  const random = useRef(Math.random());

  return random.current;
};
