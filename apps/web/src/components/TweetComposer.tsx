import { Box, Button, Textarea, Badge, Switch } from '@chakra-ui/react';
import { FaTwitter } from 'react-icons/fa';
import { proxy, useSnapshot } from 'valtio';
import { useSearchBox } from 'react-instantsearch-hooks';

export const searchState = proxy({ showSearch: false, text: '' });

const SearchBox = () => {
  const { refine } = useSearchBox();
  return (
    <Textarea
      size="sm"
      resize="none"
      minHeight="10.8rem"
      placeholder="Write your tweet concept/question here"
      onChange={(event) => {
        const currentTarget = event.currentTarget.value;
        searchState.text = currentTarget;

        let time: NodeJS.Timeout | number = 0;
        clearTimeout(time);
        time = setTimeout(() => {
          refine(currentTarget);
        }, 300);
      }}
    />
  );
};

export const TweetComposer = () => {
  const { text } = useSnapshot(searchState);
  const suffix = '\ncc @sseraphini';
  const counter = 279 - suffix.length - text.length ?? 0;
  const tweet = encodeURIComponent(`${text}${suffix}`);

  return (
    <>
      <SearchBox />
      <Badge maxW="fit-content" colorScheme={counter < 0 ? 'red' : ''}>
        {counter}
      </Badge>
      <Box as="span">
        cc @sseraphini{' '}
        <Switch
          onChange={(e) => {
            searchState.showSearch = e.target.checked;
          }}
        />
      </Box>

      <Button
        colorScheme="twitter"
        leftIcon={<FaTwitter />}
        mt="10px"
        as={'a'}
        href={`https://twitter.com/intent/tweet?text=${tweet}`}
        target="_blank"
      >
        Tweet
      </Button>
    </>
  );
};
