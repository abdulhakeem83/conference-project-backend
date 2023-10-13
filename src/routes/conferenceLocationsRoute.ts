import express from "express";
import {
  addConferencesLocation,
  getConferenceLocation,
} from "../controllers/conferenceLocationController.js";
import { requestHandler } from "../middlewares/requestHandler.js";
const router = express.Router();

//route to add new conference locations
router.post("/", addConferencesLocation);
//route to get the conference locations
router.get("/", requestHandler(getConferenceLocation));

export default router;
