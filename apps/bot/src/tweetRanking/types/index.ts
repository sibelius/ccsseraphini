import { Types, Document } from 'mongoose';

type TweetSaved = {
  _id: Types.ObjectId;
  data: {
    tweet_id: string;
    created_at: Date;
  };
};

export type TweetDocument = Document<TweetSaved['_id'], any, TweetSaved> &
  TweetSaved;

export type TweetFilter = Pick<TweetSaved['data'], 'created_at'>;

export type TweetScore = { score: number };
