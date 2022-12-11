import mongoose, { model, Schema } from 'mongoose';

const temporaryTweetSchema = new Schema({
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
  mongoose.models.tweet || model('tweet', temporaryTweetSchema);
