import { useInfiniteHits } from 'react-instantsearch-hooks';

export const Stats = () => {
  const { results } = useInfiniteHits({});
  return (
    <p>
      {results?.nbHits} results in {results?.processingTimeMS} ms
    </p>
  );
};