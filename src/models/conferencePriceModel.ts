import mongoose from "mongoose";
const Schema = mongoose.Schema;

// creating the price schema
const conferencePriceSchema = new Schema({
  displayName: {
    type: String,
  },
  minimumPrice: {
    type: Number,
  },
  maximumPrice: {
    type: Number,
  },
});

export const conferencePriceModel = mongoose.model(
  "conferenceprices",
  conferencePriceSchema,
);
