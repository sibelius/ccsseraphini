import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Flex, Button, Textarea, Badge, Image } from '@chakra-ui/react'
import { FaTwitter } from 'react-icons/fa'
import { useState } from 'react'

const Home: NextPage = () => {
  const [text, setText] = useState('')
  const suffix = '\ncc @sseraphini'
  const counter = 279 - suffix.length - text.length
  const tweet = encodeURIComponent(`${text}${suffix}`)

  return (
    <div>
      <Head>
        <title>cc @sseraphini</title>
        <meta name="description" content="Make it easy to cc @sseraphini" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex
        height="100vh"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
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
            colorScheme="gray"
            mt="10px"
            as={'a'}
            href="https://twitter.com/sseraphini?ref_src=twsrc%5Etfw" 
            target="_blank"
          >
            Follow @sseraphini
          </Button>
        </Flex>
      </Flex>
    </div>
  )
}

export default Home
