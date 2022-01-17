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
import { Box, Flex, Button, Textarea, Badge, Image } from '@chakra-ui/react';
import { FaTwitter, FaPatreon } from 'react-icons/fa';
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
          src="https://avatars.githubusercontent.com/u/2005841?v=4"
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

          <Button
            colorScheme="orange"
            leftIcon={<FaPatreon />}
            mt="10px"
            as={'a'}
            border="none"
            href="https://www.patreon.com/sibelius"
            target="_blank"
          >
            Sponsor
          </Button>
        </Flex>
      </Container>
    </>
    
import { Home } from '../components/Home';
import { GetServerSideProps } from 'next';
import { TweetData } from '../types/Tweet';
import { Timeline } from '../components/Timeline';

interface Props {
  tweets?: TweetData[];
  nextToken?: string;
  error?: boolean;
}

const HomePage: NextPage<Props> = (props: Props) => {
  return (
    <div>
      <Head>
        <title>cc @sseraphini</title>
        <meta name="description" content="Make it easy to cc @sseraphini" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Home />
      <Timeline
        initialTweets={props.tweets}
        initialNextToken={props.nextToken}
      />
    </div>
  );
};

export default HomePage;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  // @ts-ignore
  const httpProtocol = ctx.req.headers.host.includes('localhost')
    ? 'http'
    : 'https';

  const url = `${httpProtocol}://${ctx.req.headers.host}/api/latest_tweets`;

  const response = await fetch(url);
  if (response.status !== 200) {
    return {
      props: {
        error: true,
      },
    };
  }
  const data = await response.json();

  return {
    props: {
      tweets: data?.tweets,
      nextToken: data?.nextToken,
    },
  };
};
