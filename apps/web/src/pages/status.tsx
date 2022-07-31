import {
  Flex,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
} from '@chakra-ui/react';
import { bgPalette, txtPalette } from 'components/ColorPalette';
import { ParticleSibAvatar } from 'components/home/ParticleSibAvatar';
import { RandomProvider } from 'components/home/useRandom';
import { NextPage } from 'next';
import Link from 'next/link';
import { MdCheckCircle } from 'react-icons/md';

const Status: NextPage = (): JSX.Element => {
  return (
    <Flex
      flex="1"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      h="100vh"
      bgColor={bgPalette.base}
      textColor={txtPalette.base}
      p="1"
    >
      <Heading textAlign="center">
        cc
        <Link href="https://twitter.com/sseraphini">
          &nbsp;@sseraphini&nbsp;
        </Link>
        is always on
      </Heading>
      <Text textAlign="center">even when stackoverflow is down</Text>
      <Flex
        mt="10"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-around"
        flexWrap="wrap"
      >
        <RandomProvider>
          <ParticleSibAvatar />
        </RandomProvider>

        <List spacing="3" ml="10">
          {[
            'sseraphini.cc is always on',
            'cc @sseraphini bot is always on',
            '@sseramemes is always on',
            'chrome extension is always on',
            'cli tool is always on',
            'vscode extension is always on',
          ].map((text, index) => (
            <ListItem key={index}>
              <ListIcon color="green.500" as={MdCheckCircle} />
              {text}
            </ListItem>
          ))}
        </List>
      </Flex>
    </Flex>
  );
};

export default Status;
