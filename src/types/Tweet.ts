export interface TwitterResponseTweetInfo {
  author_id: string;
  id: string;
  text: string;
  created_at: string;
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
