import express, { Request, Response } from "express";
import { ipTracker } from "../middlewares/ipAddressTracker.js";
const router = express.Router();

//route to get the location of the user from ip address
router.get("/", (req: Request, res: Response) => {
  ipTracker(req, res);
});

export default router;
