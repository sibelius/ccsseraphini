import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, Flex, Button, Textarea, Badge, Image } from '@chakra-ui/react';
import { FaTwitter, FaPatreon } from 'react-icons/fa';
import { SiSubstack } from 'react-icons/si';
import { useState } from 'react';
import ForkMeCorner from '@components/ForkMeCorner';

const Home: NextPage = () => {
  const [text, setText] = useState('');
  const suffix = '\ncc @sseraphini';
  const counter = 279 - suffix.length - text.length;
  const tweet = encodeURIComponent(`${text}${suffix}`);

  return (
    <div>
      <Head>
        <title>cc @sseraphini</title>
        <meta name="description" content="Make it easy to cc @sseraphini" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ForkMeCorner repo="https://github.com/sibelius/ccsseraphini" />

      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        bg="gray.400"
      >
        <Image
          borderRadius="full"
          boxSize="100px"
          objectFit="cover"
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
          bg="white"
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

          <Button
            colorScheme="purple"
            leftIcon={<SiSubstack />}
            mt="10px"
            as={'a'}
            border="none"
            href="https://sibelius.substack.com/"
            target="_blank"
          >
            Articles
          </Button>
        </Flex>
      </Flex>
    </div>
  );
};

export default Home;
