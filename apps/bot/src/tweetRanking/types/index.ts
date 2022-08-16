import { Types } from 'mongoose';

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
