export interface UserRanking {
  _id: string;
  name: string;
  username: string;
  profileImageUrl: string;
  likes: number;
  retweets: number;
  tweets: number;
  quotes: number;
  replies: number;
  score: number;
  lastTweetRanked: Date;
}

export type TwitterUser = {
  id: string;
  profile_image_url: string;
  username: string;
  name: string;
};

export type TwitterResponse = {
  data: TwitterUser[];
} | null;
