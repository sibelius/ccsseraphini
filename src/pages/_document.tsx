import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import theme from '../theme/theme';

export default class Document extends NextDocument {
  render() {
    return (
      <Html lang="en">
        <Head>
          <div>
            <title>cc @sseraphini</title>
            <meta name="description" content="Make it easy to cc @sseraphini" />
            <link rel="icon" href="/favicon.ico" />
          </div>
        </Head>

        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
