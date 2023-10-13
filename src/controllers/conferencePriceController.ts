import { Request, Response } from "express";
import { conferencePriceModel } from "../models/conferencePriceModel.js";

// function to get conference prices
export const getConferencePrices = async (req: Request, res: Response) => {
  await conferencePriceModel
    .find()
    .then((prices) => {
      res.send(prices);
    })
    .catch(() => {
      throw {
        message: "Unable to fetch the records. Please try again !!",
        status: 500,
      };
    });
};
