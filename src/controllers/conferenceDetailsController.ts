import Joi from "joi";
import { conferenceList } from "../models/conferenceListModel.js";
import { requestValidation } from "../middlewares/requestValidation.js";
import { Request, Response } from "express";

// function to fetch details of a particular conference
export const getConferenceDetailsController = async (
  req: Request,
  res: Response,
) => {
  const querySchema = Joi.object({
    conferenceId: Joi.string().required().length(24),
  });
  await requestValidation(querySchema, req?.query);
  await conferenceList
    .findOne({ _id: req?.query?.conferenceId })
    .then((list) => {
      if (list) {
        res.send(list);
      } else {
        res.status(400).json({
          message: "No conference found for the given Id",
        });
      }
    })
    .catch(() => {
      throw {
        message: "Unable to fetch the records. Please try again !!",
        status: 500,
      };
    });
};
