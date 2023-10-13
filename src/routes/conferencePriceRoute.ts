import express from "express";
import { getConferencePrices } from "../controllers/conferencePriceController.js";
const router = express.Router();

//route to get the conference prices
router.get("/", getConferencePrices);

export default router;
