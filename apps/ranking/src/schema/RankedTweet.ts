import mongoose, { Schema, model } from 'mongoose';

const rankedTweetSchema = new Schema({
  tweet_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  author_id: {
    type: String,
    required: true,
  },
  public_metrics: {
    type: {
      retweet_count: Number,
      reply_count: Number,
      like_count: Number,
      quote_count: Number,
    },
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  last_updated: Date,
  changes_since_last_update: Boolean,
});

export const RankedTweetModel =
  mongoose.models.rankedTweet || model('rankedTweet', rankedTweetSchema);
