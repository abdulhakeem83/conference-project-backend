import Joi from "joi";
import { requestValidation } from "../middlewares/requestValidation.js";
import { contactUsModel } from "../models/contactUsModel.js";
import { Request, Response } from "express";

// function to post the contact us information in db
export const contactUsController = async (req: Request, res: Response) => {
  const validationSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    message: Joi.string().required(),
    countryCode: Joi.string().required(),
  });
  await requestValidation(validationSchema, req?.body)
    .then(async () => {
      const contactUsSchema = {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        phoneNumber: req?.body?.phoneNumber,
        message: req?.body?.message,
        countryCode: req?.body?.countryCode,
      };
      await contactUsModel
        .findOne(contactUsSchema)
        .then(async (info) => {
          if (info) {
            res.status(400).json({
              message: "Already submitted !!",
            });
          } else {
            await contactUsModel
              .insertMany(contactUsSchema)
              .then((entry) => {
                res.status(200).json({
                  message: "Request sent succesfully !!",
                  entry,
                });
              })
              .catch(() => {
                throw {
                  message: "Unable to send the request. Please try again !!",
                  status: 500,
                };
              });
          }
        })
        .catch(() => {
          throw {
            message: "Unable to fetch the records. Please try again !!",
            status: 500,
          };
        });
    })
    .catch((err) => res.status(400).json(err));
};
