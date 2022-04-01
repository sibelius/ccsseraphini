import { Flex, Text, LinkOverlay, LinkBox, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { FaReply } from 'react-icons/fa';
import { TweetData } from 'types/Tweet';
import { twitterBaseUrl, twitterEndpointSufix } from './Tweet';
import { TweetReplyModal } from './TweetReplyModal';

interface TweetInfoProps {
  tweet: TweetData;
  key?: string;
}
const TweetPublicMetrics = ({ tweet }: TweetInfoProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <>
      <Flex
        paddingY={3}
        borderY="1px solid"
        mt={4}
        borderColor="gray.300"
        alignItems="center"
        justifyContent="space-between"
      >
        <Flex>
          <Button
            size={'sm'}
            leftIcon={<FaReply />}
            onClick={openModal}
            color="gray.600"
          >
            Reply Here
          </Button>
        </Flex>
        <Flex>
          <LinkBox cursor="pointer">
            <LinkOverlay
              href={`${twitterBaseUrl}${tweet.userInfo.username}/status/${tweet.id}`}
              target="blank"
              display="flex"
              _hover={{ textDecor: 'underline' }}
            >
              <Text color="gray.500" fontWeight="bold" marginRight={1}>
                {tweet.public_metrics.reply_count}
              </Text>
              <Text color="gray.500" marginRight={2}>
                {tweet.public_metrics.reply_count === 1 ? 'Reply' : 'Replies'}
              </Text>
            </LinkOverlay>
          </LinkBox>
          <LinkBox cursor="pointer">
            <LinkOverlay
              href={`${twitterBaseUrl}${tweet.userInfo.username}/status/${tweet.id}${twitterEndpointSufix.retweet}`}
              target="blank"
              display="flex"
              _hover={{ textDecor: 'underline' }}
            >
              <Text color="gray.500" fontWeight="bold" marginRight={1}>
                {tweet.public_metrics.retweet_count}
              </Text>
              <Text color="gray.500" marginRight={2}>
                {tweet.public_metrics.retweet_count === 1
                  ? 'Retweet'
                  : 'Retweets'}
              </Text>
            </LinkOverlay>
          </LinkBox>
          <LinkBox cursor="pointer">
            <LinkOverlay
              href={`${twitterBaseUrl}${tweet.userInfo.username}/status/${tweet.id}${twitterEndpointSufix.quote}`}
              target="blank"
              display="flex"
              _hover={{ textDecor: 'underline' }}
            >
              <Text color="gray.500" fontWeight="bold" marginRight={1}>
                {tweet.public_metrics.quote_count}
              </Text>
              <Text color="gray.500" marginRight={2}>
                {tweet.public_metrics.quote_count === 1
                  ? 'Quote Tweet'
                  : 'Quote Tweets'}
              </Text>
            </LinkOverlay>
          </LinkBox>
          <LinkBox cursor="pointer">
            <LinkOverlay
              href={`${twitterBaseUrl}${tweet.userInfo.username}/status/${tweet.id}${twitterEndpointSufix.like}`}
              target="blank"
              display="flex"
              _hover={{ textDecor: 'underline' }}
            >
              <Text color="gray.500" fontWeight="bold" marginRight={1}>
                {tweet.public_metrics.like_count}
              </Text>
              <Text color="gray.500" marginRight={2}>
                {tweet.public_metrics.like_count === 1 ? 'Like' : 'Likes'}
              </Text>
            </LinkOverlay>
          </LinkBox>
        </Flex>
      </Flex>
      <TweetReplyModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        tweet={tweet}
      />
    </>
  );
};

export default TweetPublicMetrics;
