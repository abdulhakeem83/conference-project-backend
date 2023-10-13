import requestIP from "request-ip";
import { geoLocation } from "./geoLocationFinder.js";
import { Request, Response } from "express";

//function to fetch the ip address of the user and return the location
export const ipTracker = async (req: Request, res: Response) => {
  const ipAddress: string = String(requestIP.getClientIp(req));
  const geo = await geoLocation(ipAddress);
  if (geo) {
    res.status(200).send(geo);
  }
};
