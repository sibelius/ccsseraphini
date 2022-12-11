export type Tweet = {
  data: Data;
  includes: Includes;
  matching_rules: MatchingRulesItem[];
};
export type Data = {
  attachments: Attachments;
  author_id: string;
  created_at: string;
  id: string;
  public_metrics: Public_metrics;
};
export type Attachments = {};
export type Public_metrics = {
  retweet_count: number;
  reply_count: number;
  like_count: number;
  quote_count: number;
};
export type Includes = {
  users: UsersItem[];
};
export type UsersItem = {
  id: string;
  name: string;
  profile_image_url: string;
  url: string;
  username: string;
};
export type MatchingRulesItem = {
  id: string;
  tag: string;
};
