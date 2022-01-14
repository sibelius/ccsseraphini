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
  Text,
  useColorMode,
  IconButton,
  Switch,
} from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import { FaTwitter } from 'react-icons/fa';
import { useState } from 'react';

const Home: NextPage = () => {
  const [text, setText] = useState('');
  const suffix = '\ncc @sseraphini';
  const counter = 279 - suffix.length - text.length;
  const tweet = encodeURIComponent(`${text}${suffix}`);
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Container
        my="40px"
        gap={'5'}
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        {/* IconButton */}
        {colorMode === 'light' ? (
          <IconButton
            aria-label="Switcher"
            my="20px"
            isRound
            color="gray.800"
            icon={<MoonIcon />}
            variant="outline"
            onClick={toggleColorMode}
          />
        ) : (
          <IconButton
            aria-label="Switcher"
            my="20px"
            isRound
            color="yellow.500"
            icon={<SunIcon />}
            variant="outline"
            onClick={toggleColorMode}
          />

          //seraphini parts
        )}
        {/* <Flex
          height="100vh"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          bg="gray.400"
        > */}
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
        </Flex>
        {/* </Flex> */}
      </Container>
      <div>
        <Head>
          <title>cc @sseraphini</title>
          <meta name="description" content="Make it easy to cc @sseraphini" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
      </div>
    </>
  );
};

export default Home;
