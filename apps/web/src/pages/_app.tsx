import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';

import { InstantSearch } from 'react-instantsearch-hooks';
import { instantMeiliSearch } from '@meilisearch/instant-meilisearch';

const searchClient = instantMeiliSearch(
  'https://droplet.juliomerisio.com',
  process.env.NEXT_PUBLIC_MEILISEARCH_API_KEY,
);
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <InstantSearch
        indexName="tweets:created_at:desc"
        searchClient={searchClient}
        suppressExperimentalWarning
      >
        <Component {...pageProps} />
      </InstantSearch>
    </ChakraProvider>
  );
}

export default MyApp;
