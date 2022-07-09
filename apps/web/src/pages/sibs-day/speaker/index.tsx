import { Box, Flex, Heading, SystemProps } from '@chakra-ui/react';
import Image from 'next/image';

export default function Speaker({
  direction,
  name,
  handler,
  talk,
  image,
}: SpeakerProps) {
  return (
    <Flex
      zIndex={2}
      p={4}
      mt="1rem"
      direction={direction}
      align={'center'}
      style={{
        borderRadius: '20px',
        backdropFilter: 'blur(12px)',
        border: 'solid',
      }}
    >
      <Image
        src={image}
        height={300}
        width={300}
        style={{ borderRadius: '50%', padding: '1rem' }}
        objectFit={'cover'}
        objectPosition={'center'}
        alt={`Foto de ${name}`}
      />
      <Box w="100%" p="1rem" m={'auto'}>
        <Heading textAlign="start" as="h3" size="xl" pb="0.5rem">
          {name}
        </Heading>
        <Heading textAlign="start" as="h4" size="md">
          {talk}
        </Heading>
        <Heading textAlign="start" as="h5" size="sm">
          {
            // TODO: Add link missing handler
            // const url = `https://twitter.com/${handler}`;
          }
          @{handler}
        </Heading>
      </Box>
    </Flex>
  );
}

export type SpeakerProps = {
  direction: SystemProps['flexDirection'];
  image: string;
  name: string;
  talk: string;
  handler: string;
};
