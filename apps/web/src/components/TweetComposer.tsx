import { Box, Button, Textarea, Badge, Switch } from '@chakra-ui/react';
import { FaTwitter } from 'react-icons/fa';
import { proxy } from 'valtio';
import { useSearchBox } from 'react-instantsearch-hooks';
import { useState } from 'react';

export const searchState = proxy({ showSearch: false, text: '' });

export const TweetComposer = () => {
  const { refine } = useSearchBox();
  const [state, setState] = useState('');
  const suffix = '\ncc @sseraphini';
  const counter = 279 - suffix.length - state.length;
  const tweet = encodeURIComponent(`${state}${suffix}`);

  return (
    <>
      <Textarea
        size="sm"
        resize="none"
        minHeight="10.8rem"
        value={state}
        placeholder="Write your tweet concept/question here"
        onChange={(event) => {
          const currentTarget = event.target.value;
          searchState.text = currentTarget;
          setState(currentTarget);

          let time: NodeJS.Timeout | number = 0;
          clearTimeout(time);
          time = setTimeout(() => {
            refine(currentTarget);
          }, 300);
        }}
      />
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
