import type { AppProps } from 'next/app';
import { ChakraProvider, useColorMode } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <ChakraProvider resetCSS>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
