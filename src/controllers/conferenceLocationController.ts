import { Request, Response } from "express";
import { conferenceLocationModel } from "../models/conferenceLocationModel.js";

// function to add conference locations
export const addConferencesLocation = async (req: Request, res: Response) => {
  await conferenceLocationModel
    .find({ name: req?.body?.name })
    .then(async (location) => {
      if (location.length > 0) {
        res.status(400).json({
          message: "Location already exists !!",
        });
      } else {
        await conferenceLocationModel
          .insertMany(req.body)
          .then((conferenceLocation) => res.send(conferenceLocation))
          .catch(() => {
            throw {
              message: "Unable to add the records. Please try again !!",
              status: 500,
            };
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

//function to get conference locations
export const getConferenceLocation = async (req: Request, res: Response) => {
  await conferenceLocationModel
    .find()
    .then((location) => res.send(location))
    .catch(() => {
      throw {
        message: "Unable to fetch the records. Please try again !!",
        status: 500,
      };
    });
};
