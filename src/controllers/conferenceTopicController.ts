import { Request, Response } from "express";
import { conferenceTopicCount } from "../middlewares/collectionCount.js";
import { conferenceTopicModel } from "../models/conferenceTopicsModel.js";

// function to get conference topics
export const getConferenceTopics = async (req: Request, res: Response) => {
  //finding the total number of documents in the collection
  const totalCount = await conferenceTopicCount();
  const pageNumber: number = Number(req?.query?.pageNumber);
  const responseLimit: number = Number(req?.query?.limit);
  await conferenceTopicModel
    .find()
    .skip(pageNumber * responseLimit)
    .limit(responseLimit)
    .then((list) => {
      res.send({ totalCount, list });
    })
    .catch(() => {
      throw {
        message: "Unable to fetch the records. Please try again !!",
        status: 500,
      };
    });
};

//function to add conference topics
export const addConferenceTopics = async (req: Request, res: Response) => {
  await conferenceTopicModel
    .insertMany(req.body)
    .then((topics) => res.send(topics))
    .catch(() => {
      throw {
        message: "Unable to add the records. Please try again !!",
        status: 500,
      };
    });
};
