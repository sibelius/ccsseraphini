import mongoose, { model, Schema } from 'mongoose';
import { TemporaryTweet, TemporaryType } from '../types';

const temporaryTweetSchema = new Schema<TemporaryTweet>({
  tweet_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

export const TemporaryTweetModel =
  (mongoose.models.tweet as TemporaryType) ||
  model('tweet', temporaryTweetSchema);
