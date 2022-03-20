import { AccountProfile } from 'types/Score';

export const userScore = async ({
  account: { providerAccountId, access_token },
  profile: {
    data: { username },
  },
}: AccountProfile) => {
  const BASE_URL = 'https://api.twitter.com/2';
  const USER_TIMELINE_URL =
    `${BASE_URL}/users/${providerAccountId}/tweets?` +
    'tweet.fields=public_metrics,in_reply_to_user_id&max_results=100';

  const { data }: Response = await fetch(USER_TIMELINE_URL, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then(async (data) => data.json());

  if (!!data) {
    const currentUser = username;
    interface PublicMetrics {
      public_metrics: {
        retweet_count: number;
        reply_count: number;
        like_count: number;
        quote_count: number;
      };
    }

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

        return (
          accumulator + retweet_count + reply_count + like_count + quote_count
        );
      }, 0);

    return score;
  }
};
