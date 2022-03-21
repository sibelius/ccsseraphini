import { AccountProfile } from 'types/Score';
import { userTweets } from '../../modules/twitter/twitterFollowersGet';

export const userScore = async ({
  account: { providerAccountId, access_token },
  profile: {
    data: { username },
  },
}: AccountProfile) => {
  if (!access_token) {
    return 0;
  }

  const result = await userTweets(providerAccountId, access_token);

  if (!result.data) {
    return 0;
  }

  const { data } = result;

  const currentUser = username;
  interface PublicMetrics {
    public_metrics: {
      retweet_count: number;
      reply_count: number;
      like_count: number;
      quote_count: number;
    };
  }

  const scoreDetail = {
    retweet_count: 0,
    reply_count: 0,
    like_count: 0,
    quote_count: 0,
    total: 0,
  };

  const score = data
    .filter((tweet: { text: string; in_reply_to_user_id: string }) => {
      const { text, in_reply_to_user_id } = tweet;

      const isMentioned = text.match(/cc(:?\s*)@sseraphini/gi);
      const isReplied = text.match(
        new RegExp(`@${currentUser} @sseraphini`, 'gi'),
      );
      const isReplyingToUser = in_reply_to_user_id === '2313873457';

      return isMentioned || isReplied || isReplyingToUser;
    })
    .reduce((accumulator: number, current: PublicMetrics): number => {
      const { retweet_count, reply_count, like_count, quote_count } =
        current.public_metrics;

      scoreDetail.retweet_count += retweet_count;
      scoreDetail.reply_count += reply_count;
      scoreDetail.like_count += like_count;
      scoreDetail.quote_count += quote_count;

      return (
        accumulator + retweet_count + reply_count + like_count + quote_count
      );
    }, 0);

  scoreDetail.total = score;

  return scoreDetail;
};
