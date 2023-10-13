import { conferenceTopicModel } from "../models/conferenceTopicsModel.js";

// function to find the total count of the conference lists
export const conferenceTopicCount = async () =>
  await conferenceTopicModel.db
    .collection("conferencetopics")
    .countDocuments()
    .then((res) => res)
    .catch(() => {
      throw {
        message: "Unable to fetch the total count. Please try again !!",
        status: 500,
      };
    });
