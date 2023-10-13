import express from "express";
import { contactUsController } from "../controllers/contactUsController.js";
const router = express.Router();

//route to contact us
router.post("/", contactUsController);

export default router;
