const calculateTweetScore = (tweet: any) => {
  const { public_metrics } = tweet;
  const { retweet_count, reply_count, like_count, quote_count } =
    public_metrics;

  const tweet_value = 1;
  const total =
    tweet_value + retweet_count + reply_count + like_count + quote_count;

  return {
    ...tweet,
    score: total,
  };
};

export default calculateTweetScore;
