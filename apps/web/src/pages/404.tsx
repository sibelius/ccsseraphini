import { Flex, Image, Button, Heading, Text } from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';

export default function Custom404() {
  return (
    <Flex
      flex={1}
      maxW={'100%'}
      height="100vh"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      pb="10px"
      style={{
        backgroundColor: '#e5e5f7',
        opacity: '0.8',
        backgroundImage:
          'linear-gradient(#444cf7 1px, transparent 1px), linear-gradient(to right, #444cf7 1px, #e5e5f7 1px)',
        backgroundSize: '20px 20px',
      }}
    >
      <Flex
        alignItems="center"
        flexDirection="column"
        px={'12px'}
        style={{
          width: '100%',
          position: 'sticky',
          top: '0',
        }}
      >
        <Flex
          borderWidth="1px"
          borderColor="gray.500"
          borderRadius="lg"
          overflow="hidden"
          p="7"
          flexDirection="column"
          bg="white"
          width={'100%'}
          maxW={'fit-content'}
          minW={{ md: 'unset', base: 'calc(100vw - 24px)' }}
          alignItems="center"
          paddingTop="55px"
        >
          <Image
            borderRadius="full"
            boxSize="100px"
            objectFit="cover"
            src="https://unavatar.io/twitter/sseraphini"
            alt="Sibelius Seraphini"
            m="3"
            position="absolute"
            top="-33%"
          />
          <Heading
            as="h1"
            size="2xl"
            marginBottom="7px"
            background="linear-gradient(130deg, #ED964A, #D78742)"
            backgroundClip="text"
            textColor="transparent"
          >
            404
          </Heading>
          <Text fontSize="xl" marginBottom="5px">
            Page not found!
          </Text>
          <Button
            backgroundColor="#3940CC"
            textColor="white"
            _hover={{ bg: '#2B3099' }}
            leftIcon={<FaHome />}
            width="100%"
            as={'a'}
            href="/"
            target="_blank"
            size="sm"
          >
            Back to Home
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
