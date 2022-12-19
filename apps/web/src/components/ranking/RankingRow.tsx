import {
  Flex,
  Box,
  Text,
  Avatar,
  Button,
  AvatarBadge,
  Link,
} from '@chakra-ui/react';
import { UserRanking } from 'types/Ranking';
import { bgPalette, txtPalette } from '../ColorPalette';
import { RankingTrophy } from './RankingTrophy';

interface ModalState {
  setIsOpen: (isOpen: boolean) => void;
  setSelectedUser: (user: UserRanking | null) => void;
}

interface Props {
  index: number;
  user: UserRanking;
  modalState: ModalState;
}

export const RankingRow = ({
  index,
  user,
  modalState: { setIsOpen, setSelectedUser },
}: Props) => {
  const { base, secondary, secondaryVar } = bgPalette;
  const {
    base: baseTxt,
    primary: primaryTxt,
    secondary: secondaryTxt,
  } = txtPalette;

  return (
    <Link
      key={user._id}
      href={`https://twitter.com/${user.username}`}
      isExternal
      _hover={{
        textDecoration: 'none',
      }}
    >
      <Flex
        align="center"
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
          <Text textOverflow={'ellipsis'} fontWeight="bold" overflow={'hidden'}>
            {user.name}
          </Text>
          <Text textOverflow={'ellipsis'} overflow={'hidden'} ml={2}>
            @{user.username}
          </Text>
        </Flex>
        <Flex>
          <RankingTrophy index={index} />
        </Flex>
        <Box>
          <Button
            px={1}
            bgColor={secondary}
            color={baseTxt}
            _hover={{
              bg: secondaryVar,
            }}
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(true);
              setSelectedUser(user);
            }}
          >
            {user.score}
          </Button>
        </Box>
      </Flex>
    </Link>
  );
};
