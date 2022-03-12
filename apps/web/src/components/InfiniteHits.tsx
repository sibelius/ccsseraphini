import React, { useEffect, useRef } from 'react';

import {
  useInfiniteHits,
  UseInfiniteHitsProps,
} from 'react-instantsearch-hooks';

import { cx } from './cx';
import { useInViewport } from 'ahooks';
import { TweetData } from './Timeline';

export type InfiniteHitsProps = React.ComponentProps<'div'> &
  UseInfiniteHitsProps & {
    hitComponent: (props: { hit: TweetData }) => JSX.Element;
  };

export function InfiniteHits({
  hitComponent: Hit,
  ...props
}: InfiniteHitsProps) {
  const { hits, isLastPage, showMore } = useInfiniteHits(props);
  const ref = useRef<HTMLButtonElement | null>(null);
  const [inViewport] = useInViewport(ref, {});

  useEffect(() => {
    if (inViewport && !isLastPage) {
      if (typeof showMore === 'function') {
        showMore();
      }
    }
  }, [inViewport, showMore, isLastPage]);

  return (
    <div className={cx('ais-InfiniteHits', props.className)}>
      <ol className="ais-InfiniteHits-list">
        <ol>
          {hits.map((hit) => (
            //Type incompatibility between libs
            <Hit key={hit.objectID} hit={hit as unknown as TweetData} />
          ))}
        </ol>
      </ol>
      {!isLastPage && (
        <button
          ref={ref}
          className="ais-InfiniteHits-loadMore"
          onClick={showMore}
          type="button"
        >
          Load more
        </button>
      )}
    </div>
  );
}
