import { Request, Response } from "express";
import { conferenceDates } from "../middlewares/dynamicDates.js";

// function to fetch conference dates
export const getConferenceDates = async (req: Request, res: Response) => {
  res.send(conferenceDates);
};
