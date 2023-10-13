import express from "express";
import { getConferenceDates } from "../controllers/conferenceDateController.js";
import { requestHandler } from "../middlewares/requestHandler.js";
const router = express.Router();

//route to get the conference dates
router.get("/", requestHandler(getConferenceDates));

export default router;
