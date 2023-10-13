import mongoose from "mongoose";
const Schema = mongoose.Schema;

//creating the location schema
const locationSchema = new Schema({
  name: {
    type: String,
  },
});

export const conferenceLocationModel = mongoose.model(
  "conferencelocations",
  locationSchema,
);
