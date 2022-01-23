export interface TwitterResponseTweetInfo {
  author_id: string;
  id: string;
  text: string;
  created_at: Date;
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
}

export interface TwitterResponseUserInfo {
  id: string;
  name: string;
  profile_image_url: string;
  username: string;
}

export interface TweetData extends TwitterResponseTweetInfo {
  userInfo: TwitterResponseUserInfo;
}
