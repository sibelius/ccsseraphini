import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Textarea,
  Badge,
  Box,
  Flex,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaTwitter } from 'react-icons/fa';
import { TweetData } from 'types/Tweet';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  tweet: TweetData;
}

export const TweetReplyModal = ({ isOpen, closeModal, tweet }: Props) => {
  const [text, setText] = useState('');

  const counter = 279 - text.length;
  const tweetText = encodeURIComponent(text);

  return (
    <>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reply tweet</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack>
              <Textarea
                size="sm"
                resize="none"
                minHeight="10.8rem"
                placeholder={`Write your reply for @${tweet.userInfo.username} tweet`}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <Badge maxW="fit-content" colorScheme={counter < 0 ? 'red' : ''}>
                {counter}
              </Badge>
              <Box as="span">cc @sseraphini</Box>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Flex direction="row">
              <Button
                colorScheme="twitter"
                leftIcon={<FaTwitter />}
                as={'a'}
                href={`https://twitter.com/intent/tweet?text=${tweetText}&in_reply_to=${tweet.id}`}
                target="_blank"
                onClick={closeModal}
              >
                Tweet
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
