import { useState } from 'react';
import { Flex, Box, Button, Textarea, Badge } from '@chakra-ui/react';
import { FaTwitter } from 'react-icons/fa';
import { BsSearch } from 'react-icons/bs';
import { bgPalette, txtPalette } from '../ColorPalette';

export const TweetComposer = () => {
  const [text, setText] = useState('');
  const suffix = '\ncc @sseraphini';
  const counter = 279 - suffix.length - text.length;
  const tweet = encodeURIComponent(`${text}${suffix}`);

  return (
    <>
      {/*{'4.0rem'}{ base: '4rem', md: '10.8rem' }*/}
      <Textarea
        size="sm"
        resize="none"
        minHeight="2.5rem"
        color={txtPalette.base}
        _focus={{ minHeight: '9rem' }}
        placeholder="Write your tweet concept/question here"
        value={text}
        transitionProperty="min-height"
        transitionDuration=".3s"
        transitionTimingFunction="ease"
        bgColor={bgPalette.secondaryVar}
        onChange={(e) => setText(e.target.value)}
      />
      <Flex
        direction={'row'}
        justifyContent={'space-between'}
        color={txtPalette.primary}
      >
        <Badge maxW="fit-content" colorScheme={counter < 0 ? 'red' : ''}>
          {counter}
        </Badge>
        <Box as="span">cc @sseraphini</Box>
      </Flex>

      <Flex
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'flex-end'}
      >
        <Button
          colorScheme="twitter"
          leftIcon={<FaTwitter />}
          mt="10px"
          as={'a'}
          href={`https://twitter.com/intent/tweet?text=${tweet}`}
          target="_blank"
          width={'49%'}
        >
          Tweet
        </Button>

        <Button
          leftIcon={<BsSearch />}
          backgroundColor="green.200"
          as={'a'}
          href={`/search`}
          width={'49%'}
        >
          Search
        </Button>
      </Flex>
    </>
  );
};
