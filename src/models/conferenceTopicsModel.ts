import mongoose from "mongoose";
const Schema = mongoose.Schema;

// creating the topics schema
const conferenceTopicSchema = new Schema({
  type: {
    type: [String],
  },
});

export const conferenceTopicModel = mongoose.model(
  "conferenceTopics",
  conferenceTopicSchema,
);
