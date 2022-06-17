import { Box, Heading, Flex, Spacer, Container, Show } from '@chakra-ui/react';
import { ChakraNextLinkButton } from '../../components/ChakraNextLinkButton';
import { SibLogo } from '../../components/home/SibLogo';
import Blob from './blobs/index';

export default function SibsDay() {
  return (
    <Flex
      bgGradient="linear(to-r, #1A04A6, #1A04A8)"
      position={'relative'}
      px={{ md: '14', base: '7' }}
      py={{ md: '4', base: '2' }}
      color="white"
      height="100vh"
      direction={'column'}
      justify={'space-around'}
      flexWrap="wrap"
    >
      <Container maxW={'50rem'}>
        <Box zIndex="2">
          <Heading as="h2" fontSize={{ md: '2.1rem', base: '1.1rem' }}>
            WELCOME TO THE BLEEDING-EDGE 🌍
          </Heading>
          <Box py={5}>
            <Heading
              as="h1"
              lineHeight="1"
              fontSize={{ base: '4.5rem', md: '9rem' }}
            >
              SIBS
              <br />
              DAY
              <br />
              27/07
            </Heading>
          </Box>
        </Box>
        <Show breakpoint="(min-width: 1380px)">
          <Blob
            inset={{ right: '0', top: '0' }}
            bg={'linear(to-br, #c27853, #e0d0d4)'}
            borderRadius={'38% 10% 56% 44% / 49% 0% 38% 51%  '}
            size={'500px'}
          />
          <Spacer />
          <Blob
            inset={{ bottom: '0', left: '0' }}
            bg={'linear(to-tl, #c27853, #e0d0d4)'}
            borderRadius={'75% 73% 45% 31% / 50% 79% 71% 0% '}
            size={'300px'}
          />
        </Show>
        <Flex
          zIndex={2}
          p={4}
          maxWidth={'90%'}
          alignSelf={'end'}
          direction={'column'}
          align={'flex-end'}
        >
          <Box
            bgGradient="linear(to-r, #c27853, #cb6e29)"
            height="1rem"
            width="5rem"
          />
          <Heading textAlign="end" as="h3" size="xl">
            Open discussions and talks about the current tech ecosystem.
            <ChakraNextLinkButton
              href="https://docs.google.com/forms/d/1frC8SXs2SMcAreb11C0eTIkAikJ0mWk7WixKNR7pwyk/viewform?edit_requested=true"
              //TODO: orange as the box above
              backgroundColor="#ad5e23"
              textColor="white"
              _hover={{ bg: '#c27853' }}
              leftIcon={<SibLogo width={20} height={20} />}
              width="100%"
              size="sm"
            >
              Fill the form
            </ChakraNextLinkButton>
          </Heading>
        </Flex>
      </Container>
    </Flex>
  );
}
