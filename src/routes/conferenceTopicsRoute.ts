import express from "express";
import {
  getConferenceTopics,
  addConferenceTopics,
} from "../controllers/conferenceTopicController.js";
const router = express.Router();

//route to get the conference topics
router.get("/", getConferenceTopics);
//route to add new conference topics
router.post("/", addConferenceTopics);

export default router;
