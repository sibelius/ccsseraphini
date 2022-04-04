import React, { useContext, useEffect } from 'react';

export type TRandomContext = {
  randomNumber: number;
};

const RandomContext = React.createContext({} as TRandomContext);

export function useRandom() {
  return useContext(RandomContext);
}

export function RandomProvider({ children }: { children: React.ReactNode }) {
  const [randomNumber, setRandomNumber] = React.useState(Math.random());

  useEffect(() => {
    setRandomNumber(Math.random());
  }, []);

  const value: TRandomContext = {
    randomNumber,
  };

  return (
    <RandomContext.Provider value={value}>{children}</RandomContext.Provider>
  );
}
