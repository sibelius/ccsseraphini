import { Flex, Text, LinkOverlay, LinkBox, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { FaReply } from 'react-icons/fa';
import { TweetData } from 'types/Tweet';
import { twitterBaseUrl, twitterEndpointSufix } from './Tweet';
import { TweetReplyModal } from './TweetReplyModal';
import { bgPalette, txtPalette } from '../ColorPalette';

interface TweetInfoProps {
  tweet: TweetData;
  key?: string;
}

interface TweetMetricProps {
  href: string;
  count: number;
  labels: string[];
}

const TweetMetric = ({ href, count, labels }: TweetMetricProps) => {
  return (
    <LinkBox cursor="pointer">
      <LinkOverlay
        href={href}
        target="blank"
        display="flex"
        _hover={{ textDecor: 'underline' }}
      >
        <Text color={txtPalette.secondary} fontWeight="bold" marginRight={1}>
          {count}
        </Text>
        <Text color={txtPalette.secondary} marginRight={2}>
          {count < 2 ? labels[0] : labels[1]}
        </Text>
      </LinkOverlay>
    </LinkBox>
  );
};

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
        borderColor={bgPalette.base}
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Flex>
          <Button
            size={'sm'}
            leftIcon={<FaReply />}
            onClick={openModal}
            color={txtPalette.baseVar}
            bgColor={bgPalette.primary}
          >
            Reply Here
          </Button>
        </Flex>
        <Flex>
          <TweetMetric
            href={`${twitterBaseUrl}${tweet.userInfo.username}/status/${tweet.id}`}
            count={tweet.public_metrics.reply_count}
            labels={['Reply', 'Replies']}
          />
          <TweetMetric
            href={`${twitterBaseUrl}${tweet.userInfo.username}/status/${tweet.id}${twitterEndpointSufix.retweet}`}
            count={tweet.public_metrics.retweet_count}
            labels={['Retweet', 'Retweets']}
          />
          <TweetMetric
            href={`${twitterBaseUrl}${tweet.userInfo.username}/status/${tweet.id}${twitterEndpointSufix.quote}`}
            count={tweet.public_metrics.quote_count}
            labels={['Quote Tweet', 'Quote Tweets']}
          />
          <TweetMetric
            href={`${twitterBaseUrl}${tweet.userInfo.username}/status/${tweet.id}${twitterEndpointSufix.like}`}
            count={tweet.public_metrics.like_count}
            labels={['Like', 'Likes']}
          />
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
