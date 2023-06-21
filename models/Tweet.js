import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema({
  title: String,
  content: String,
  category: String,
  pagePhoto: String,
});

const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;
