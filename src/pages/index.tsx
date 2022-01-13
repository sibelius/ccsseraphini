import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Flex, Button } from "@chakra-ui/react";
import { FaTwitter } from 'react-icons/fa'

const Home: NextPage = () => {
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
        flexDirection="row"
      >
        <Flex
          maxW="sm"
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          p="8"
          flexDirection="column"
        >
          <Box as='span'>cc @sseraphini</Box>
          <Button colorScheme='twitter' leftIcon={<FaTwitter />} mt='10px' as={'a'} href='https://twitter.com/intent/tweet?text=cc%20@sseraphini' target='_blank'>
            Tweet
          </Button>
        </Flex>
      </Flex>
    </div>
  )
}

export default Home
