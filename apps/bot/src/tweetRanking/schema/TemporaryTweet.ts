import { model, Schema } from 'mongoose';

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

const TemporaryTweetModel = model('tweet', temporaryTweetSchema);

export default TemporaryTweetModel;
