import { useState } from 'react';
import { Box, Button, Textarea, Badge, Switch } from '@chakra-ui/react';
import { FaTwitter } from 'react-icons/fa';

export const TweetComposer = () => {
  const [text, setText] = useState('');
  const suffix = '\ncc @sseraphini';
  const counter = 279 - suffix.length - text.length;
  const tweet = encodeURIComponent(`${text}${suffix}`);

  return (
    <>
      <Textarea
        size="sm"
        resize="none"
        minHeight="10.8rem"
        placeholder="Write your tweet concept/question here"
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <Badge maxW="fit-content" colorScheme={counter < 0 ? 'red' : ''}>
        {counter}
      </Badge>
      <Box as="span">
        cc @sseraphini <Switch />
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
