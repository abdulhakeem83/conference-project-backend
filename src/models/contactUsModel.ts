import mongoose from "mongoose";
const Schema = mongoose.Schema;

//creating the contact us schema
const contactUsSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  message: {
    type: String,
  },
  countryCode: {
    type: String,
  },
});

export const contactUsModel = mongoose.model("contactus", contactUsSchema);
