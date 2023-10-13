import express from "express";
import { getConferenceDetailsController } from "../controllers/conferenceDetailsController.js";
import { requestHandler } from "../middlewares/requestHandler.js";
const router = express.Router();

//route to get the conference details of a particular conference
router.get("/", requestHandler(getConferenceDetailsController));

export default router;
