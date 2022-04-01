import { Flex, Text, LinkOverlay, LinkBox } from '@chakra-ui/react';
import { useState } from 'react';
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
    <Flex paddingY={3} borderY="1px solid" mt={4} borderColor="gray.300">
      <LinkBox>
        <Flex _hover={{ textDecor: 'underline' }} onClick={openModal}>
          <Text color="gray.500" fontWeight="bold" marginRight={1}>
            {tweet.public_metrics.reply_count}
          </Text>
          <Text color="gray.500" marginRight={2}>
            {tweet.public_metrics.reply_count === 1 ? 'Reply' : 'Replies'}
          </Text>
        </Flex>
      </LinkBox>
      <LinkBox>
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
            {tweet.public_metrics.retweet_count === 1 ? 'Retweet' : 'Retweets'}
          </Text>
        </LinkOverlay>
      </LinkBox>
      <LinkBox>
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
      <LinkBox>
        <LinkOverlay
          href={`${twitterBaseUrl}${tweet.userInfo.username}/status/${tweet.id}${twitterEndpointSufix.like}`}
          target="blank"
          display="flex"
          _hover={{ textDecor: 'underline' }}
        >
          <Text color="gray.500" fontWeight="bold" marginRight={1}>
            {tweet.public_metrics.like_count}
          </Text>
          <Text color="gray.500">
            {tweet.public_metrics.like_count === 1 ? 'Like' : 'Likes'}
          </Text>
        </LinkOverlay>
      </LinkBox>
      <TweetReplyModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        tweet={tweet}
      />
    </Flex>
  );
};

export default TweetPublicMetrics;
