import { Tweet } from 'types/Score';

interface Props {
  tweets: Tweet[];
  twitter_profile_id: string;
  twitter_profile_user: string;
}

interface filterProps {
  [index: string]: string;
}

const filterElegibleTweets = ({
  text,
  in_reply_to_user_id,
  twitter_profile_id,
  twitter_profile_user,
}: filterProps): boolean => {
  const isRT = !!text.match(/^RT\s@/g);

  if (isRT) {
    return false;
  }

  const isReplyingProfileId = in_reply_to_user_id === twitter_profile_id;

  if (isReplyingProfileId) {
    return true;
  }

  const isProfileUserMentioned = !!text.match(
    new RegExp(`(cc(:?\\s*))?@${twitter_profile_user}`, 'gi'),
  );

  if (isProfileUserMentioned) {
    return true;
  }

  return false;
};

export const getElegibleTweets = ({
  tweets,
  twitter_profile_id,
  twitter_profile_user,
}: Props): Tweet[] =>
  tweets.filter(({ text, in_reply_to_user_id }) =>
    filterElegibleTweets({
      text,
      in_reply_to_user_id,
      twitter_profile_id,
      twitter_profile_user,
    }),
  );
