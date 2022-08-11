import mongoose from 'mongoose';

const dataSchema = new mongoose.Schema({
  tweet_id: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
});

const tweetSchema = new mongoose.Schema({
  data: {
    type: dataSchema,
    required: true,
  },
});

const TweetModel = mongoose.model('tweet', tweetSchema);

export default TweetModel;
