// Library imports
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import requestIp from "request-ip";
import dotenv from "dotenv";
const app = express();
// Local imports
import conferenceListRoutes from "./routes/conferenceListRoute.js";
import conferenceTopicsRoute from "./routes/conferenceTopicsRoute.js";
import conferenceDatesRoute from "./routes/conferenceDatesRoute.js";
import conferenceDetailsRoute from "./routes/conferenceDetailsRoute.js";
import conferenceLocationRoutes from "./routes/conferenceLocationsRoute.js";
import conferencePriceRoute from "./routes/conferencePriceRoute.js";
import clientIpRoutes from "./routes/clientIPAddressRoute.js";
import contactUsRoute from "./routes/contactUsRoute.js";
dotenv.config();

// Database and server port configuration
const port = process?.env?.PORT || 3036;
const db: string = process?.env?.DATABASE || "";

// middlewares which the express apllication uses
app.use(express.json());
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(express.static("public"));
app.use(requestIp.mw());

//routes which the application uses for api requests
app.use("/conferenceList", conferenceListRoutes);
app.use("/conferenceTopics", conferenceTopicsRoute);
app.use("/conferenceDates", conferenceDatesRoute);
app.use("/conferenceDetails", conferenceDetailsRoute);
app.use("/conferenceLocation", conferenceLocationRoutes);
app.use("/conferencePrices", conferencePriceRoute);
app.use("/contactUs", contactUsRoute);
app.use("/ip", clientIpRoutes);

//mongo db connection
const dbConnection = async () => {
  await mongoose
    .connect(db)
    .then(() => {
      //eslint-disable-next-line
      console.log("Connected to database");
    })
    .catch((err) => {
      //eslint-disable-next-line
      console.log(err);
    });
};

dbConnection();

//express apllication listening to the request coming to its port address
app.listen(port, () => {
  //eslint-disable-next-line
  console.log(`Server started on port ${port}`);
});
