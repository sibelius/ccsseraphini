import { DateTime } from 'luxon';
import mongoose, { Types } from 'mongoose';

export type RankedType = mongoose.Model<RankedTweet>;
export type TemporaryType = mongoose.Model<TemporaryTweet>;

export type TemporaryTweet = {
  _id?: Types.ObjectId;
  tweet_id: string;
  created_at: Date;
};

export type TweetWithId = Pick<TemporaryTweet, 'tweet_id'>;

export type TweetFilter = Pick<TemporaryTweet, 'created_at'>;

export type RankedTweet = TemporaryTweet & {
  author_id: string;
  public_metrics: {
    retweet_count: number;
    reply_count: number;
    like_count: number;
    quote_count: number;
  };
  score: number;
  last_updated?: Date;
  changes_since_last_update?: boolean;
};

export type TweetData = {
  attachments?: {
    media_keys?: string[];
    poll_ids?: string[];
  };
  author_id?: string;
  created_at?: string;
  public_metrics?: {
    retweet_count?: number;
    reply_count?: number;
    like_count?: number;
    quote_count?: number;
  };
  id?: string;
  text?: string;
  withheld?: any;
};

export type TweetBatch = {
  data?: TweetData[];
  errors?: any[];
  includes?: any;
};

export type Stats = {
  since: Date;
  until: Date;
  mentions: number;
  newAuthors: number;
  uniqueAuthors: number;
  likes: number;
  replies: number;
  retweets: number;
  quotes: number;
};

export type GetStartDateFunction = (endDate: Date) => Date;
export type StartDateFunctionMap = Record<number, GetStartDateFunction>;
export type StartDateFunction = (endDate: DateTime) => DateTime | undefined;
type RelativeDates = {
  firstBiweeklyDay: number;
  endOfMonth: number;
  lastBiweeklyDay: number;
};

export type GetRelativeDates = (date: DateTime) => RelativeDates;
export type RankingPeriod = {
  label: string;
  since: DateTime;
  until: DateTime;
};

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
