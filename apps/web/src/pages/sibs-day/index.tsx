import { Box, Heading, Flex, Spacer, Container, Show } from '@chakra-ui/react';
import { ChakraNextLinkButton } from '../../components/ChakraNextLinkButton';
import { SibLogo } from '../../components/home/SibLogo';
import Blob from './blobs/index';
import Speaker, { SpeakerProps } from './speaker';


export default function SibsDay() {
  return (
    <Flex
      bgGradient="linear(to-r, #1A04A6, #1A04A8)"
      position={'relative'}
      px={{ md: '14', base: '7' }}
      py={{ md: '4', base: '2' }}
      color="white"
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
        <Heading textAlign="center" my={5} as="h2" fontSize="2.1rem">
          Speakers
        </Heading>
        {speakers.map((props, index) => (
          <Speaker key={index} {...props} />
        ))}
      </Container>
    </Flex>
  );
}

const speakers: Array<SpeakerProps> = [
  {
    direction: 'row-reverse',
    image:
      'https://pbs.twimg.com/profile_images/1494329046678659072/RprvW5s4_400x400.jpg',
    name: 'Sibelius',
    handler: 'sseraphini',
    backgroundColor: '#1a04a8',
    talk: 'Who/What is sseraphini?',
  },
  {
    direction: 'row',
    image:
      'https://pbs.twimg.com/profile_images/1523447097114169346/Uh7xVsh6_400x400.jpg',
    name: 'Nicoly Cypriano',
    handler: 'nicolycypriano',
    backgroundColor: '#c20000',
    talk: 'Por que processos não funcionam?',
  },
  {
    direction: 'row-reverse',
    image:
      'https://pbs.twimg.com/profile_images/1548858425555156992/Dicm8lt2_400x400.jpg',
    name: 'Victória Rose',
    handler: 'victoriaquasar',
    backgroundColor: '#2b1123',
    talk: 'Criando um Runtime JavaScript usando csharp',
  },
  {
    direction: 'row',
    image:
      'https://pbs.twimg.com/profile_images/1521224256323047426/d9KGR6N4_400x400.jpg',
    name: 'Alecell',
    handler: 'alecell_',
    backgroundColor: '#323b8f',
    talk: 'Writing better React code with bad code',
  },
  {
    direction: 'row-reverse',
    image:
      'https://pbs.twimg.com/profile_images/1513813856795115520/Qfrr7QiH_400x400.jpg',
    name: 'Emanuel Ferreira',
    handler: 'manelferreira_',
    backgroundColor: '#2c2c2c',
    talk: 'A demonstration of how decentralized governance works in practice, showing contracts, proposals, votes, execution of proposals, and token weight.',
  },
];
