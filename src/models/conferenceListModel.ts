import mongoose from "mongoose";
const Schema = mongoose.Schema;

//creating a conference list schema
const conferenceListSchema = new Schema({
  name: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  month: {
    type: String,
  },
  location: {
    type: String,
  },
  type: {
    type: [String],
  },
  state: {
    type: String,
  },
  country: {
    type: String,
  },
  Language: {
    type: String,
  },
  ticketPrice: {
    type: Number,
  },
  enquireyEmail: {
    type: String,
  },
  enquiryNumber: {
    type: String,
  },
  bookingWebsite: {
    type: String,
  },
  contactPerson: {
    type: String,
  },
  organizedBy: {
    type: [String],
  },
  city: {
    type: [String],
  },
  displaySymbol: {
    type: String,
  },
  fromTime: {
    type: String,
  },
  toTime: {
    type: String,
  },
  description: {
    type: String,
  },
  speakers: {
    type: [String],
  },
});

export const conferenceList = mongoose.model(
  "conferenceList",
  conferenceListSchema,
);
