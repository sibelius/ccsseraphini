import {
  Heading,
  Flex,
  Box,
  Text,
  Avatar,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  ModalFooter,
  ModalContent,
  Button,
  AvatarBadge,
  Icon,
  Link,
  Stack,
} from '@chakra-ui/react';
import { useState } from 'react';
import {
  FaHeart,
  FaQuoteLeft,
  FaReply,
  FaRetweet,
  FaTrophy,
  FaTwitter,
} from 'react-icons/fa';
import { UserRanking } from 'types/Ranking';
import { bgPalette, txtPalette } from './ColorPalette';

interface PublicMetricsRankingProps {
  users: UserRanking[];
}

export const Ranking = ({ users }: PublicMetricsRankingProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserRanking | null>(null);

  const { base, secondary, secondaryVar } = bgPalette;
  const {
    base: baseTxt,
    primary: primaryTxt,
    secondary: secondaryTxt,
  } = txtPalette;

  const metrics = [
    { name: 'Likes', key: 'likes', icon: FaHeart },
    { name: 'Retweets', key: 'retweets', icon: FaRetweet },
    { name: 'Tweets', key: 'tweets', icon: FaTwitter },
    { name: 'Quotes', key: 'quotes', icon: FaQuoteLeft },
    { name: 'Replies', key: 'replies', icon: FaReply },
    { name: 'Score', key: 'score', icon: FaTrophy },
  ];

  const trophyColor: Record<number, string> = {
    0: 'yellow.400',
    1: 'gray.400',
    2: 'orange.400',
  };

  return (
    <Flex
      direction="column"
      align="center"
      h="100vh"
      w={'100vw'}
      bg={base}
      color={baseTxt}
    >
      <Box py={2} display="flex" alignItems="center" flexDir={'column'}>
        <Icon as={FaTrophy} w={10} h={10} color="baseTxt" />
        <Heading as="h1" size="lg" color={baseTxt} fontFamily="fantasy">
          <Link href="https://twitter.com/search?q=%23sserarank">
            #sserarank
          </Link>
        </Heading>
      </Box>
      <Box
        p={1}
        w={['95%', '80%', '80%', '50%']}
        borderRadius="md"
        boxShadow="base"
        bg={secondary}
        overflowY="auto"
      >
        <Grid column={1} gap={2}>
          {users.map((user, index) => (
            <Link
              href={`https://twitter.com/${user.username}`}
              isExternal
              _hover={{
                textDecoration: 'none',
              }}
            >
              <Flex
                align="center"
                key={user._id}
                data-testid="user-card"
                borderRadius="md"
                p={'2'}
                bg={secondaryVar}
                gap={1}
                flexWrap="nowrap"
                border={'1px solid transparent'}
                flex={'1 1 50%'}
                _hover={{
                  bg: base,
                  color: primaryTxt,
                  border: `1px solid ${secondaryTxt}`,
                }}
              >
                <Avatar name={user.name} src={user.profileImageUrl} size="md">
                  <AvatarBadge
                    borderColor={secondaryVar}
                    bg={secondary}
                    boxSize="1.25em"
                  >
                    <Text
                      fontSize={'xs'}
                      fontFamily="monospace"
                      fontWeight="bold"
                      color={baseTxt}
                    >
                      {index + 1}
                    </Text>
                  </AvatarBadge>
                </Avatar>
                <Flex
                  direction="column"
                  whiteSpace={'nowrap'}
                  flex={'1 1 100%'}
                  w={'25px'}
                >
                  <Text
                    textOverflow={'ellipsis'}
                    fontWeight="bold"
                    overflow={'hidden'}
                  >
                    {user.name}
                  </Text>
                  <Text textOverflow={'ellipsis'} overflow={'hidden'} ml={2}>
                    @{user.username}
                  </Text>
                </Flex>
                <Flex justifyContent={'space-between'}>
                  {index <= 2 && (
                    <Icon
                      as={FaTrophy}
                      w={5}
                      h={5}
                      mx={1}
                      color={trophyColor[index]}
                    />
                  )}
                </Flex>
                <Box>
                  <Button
                    px={1}
                    bgColor={secondary}
                    color={baseTxt}
                    _hover={{
                      bg: secondaryVar,
                    }}
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedUser(user);
                    }}
                  >
                    {user.score}
                  </Button>
                </Box>
              </Flex>
            </Link>
          ))}
        </Grid>
        <Modal isOpen={isOpen} size={'xl'} onClose={() => setIsOpen(false)}>
          {selectedUser && (
            <ModalContent
              w={['90%', '100%']}
              bg={secondary}
              color={baseTxt}
              borderRadius="md"
              border={`1px solid ${secondaryTxt}`}
            >
              <ModalHeader borderRadius="md" textAlign={'center'}>
                @{selectedUser.username}&apos;s metrics
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack
                  direction="row"
                  justify="space-between"
                  align="center"
                  borderRadius="md"
                  flexWrap="wrap"
                  p={1}
                  mb={1}
                >
                  {metrics.map(
                    ({
                      name,
                      key,
                      icon,
                    }: {
                      name: string;
                      key: string;
                      icon: any;
                    }) => (
                      <Box flex="1 1 25%" py={2} textAlign={'center'} key={key}>
                        <Icon as={icon} w={5} h={5} color={baseTxt} />
                        <Text>{name}: </Text>
                        <Text>{(selectedUser as any)[key]}</Text>
                      </Box>
                    ),
                  )}
                </Stack>
              </ModalBody>
              <ModalFooter>
                <Box flex="1 1 25%" textAlign={'center'}>
                  <Text>
                    Last Tweet Ranked:{' '}
                    {new Date(selectedUser.lastTweetRanked).toLocaleString(
                      'pt-BR',
                    )}
                  </Text>
                </Box>
                <Button
                  variant="outline"
                  colorScheme="whiteAlpha"
                  onClick={() => setIsOpen(false)}
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          )}
        </Modal>
      </Box>
    </Flex>
  );
};
