import express from "express";
import { getConferenceListController } from "../controllers/conferenceListController.js";
import { requestHandler } from "../middlewares/requestHandler.js";
const router = express.Router();

// route to get the conference lists
router.post("/", requestHandler(getConferenceListController));

export default router;
