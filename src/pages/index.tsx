import type { NextPage } from 'next';
import Head from 'next/head';
import {
  Box,
  Flex,
  Button,
  Textarea,
  Badge,
  Image,
  Container,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { FaTwitter } from 'react-icons/fa';
import { useState } from 'react';
import { Header } from '../components/Header';

const Home: NextPage = () => {
  const [text, setText] = useState('');
  const suffix = '\ncc @sseraphini';
  const counter = 279 - suffix.length - text.length;
  const tweet = encodeURIComponent(`${text}${suffix}`);

  return (
    <>
      <Header />
      <Container
        my="40px"
        gap={'5'}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Image
          borderRadius={'full'}
          boxSize="100px"
          objectFit={'cover'}
          src="https://unavatar.io/twitter/sseraphini"
          alt="Sibelius Seraphini"
          m="4"
        />

        <Flex
          minW="sm"
          maxW="sm"
          borderWidth="1px"
          borderColor="gray.500"
          borderRadius="lg"
          overflow="hidden"
          p="8"
          flexDirection="column"
        >
          <Textarea
            size="sm"
            resize="none"
            minHeight="10.8rem"
            placeholder="Write your tweet concept/question here"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <Badge maxW="fit-content" colorScheme={counter < 0 ? 'red' : ''}>
            {counter}
          </Badge>
          <Box as="span">cc @sseraphini</Box>

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

          <Button
            backgroundColor="gray.300"
            leftIcon={<FaTwitter />}
            mt="10px"
            as={'a'}
            href="https://twitter.com/intent/user?screen_name=sseraphini"
            target="_blank"
          >
            Follow
          </Button>
        </Flex>
      </Container>
    </>
  );
};

export default Home;
