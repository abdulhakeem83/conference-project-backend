import Joi from "joi";
import { conferenceDates } from "../middlewares/dynamicDates.js";
import { conferenceList } from "../models/conferenceListModel.js";
import { requestValidation } from "../middlewares/requestValidation.js";
import { Request, Response } from "express";

// function to fetch conference lists
export const getConferenceListController = async (
  req: Request,
  res: Response,
) => {
  // defining and validating request body
  const bodySchema = Joi.object({
    conferenceType: Joi.array().required(),
    conferenceSearchParam: Joi.string().allow("").required(),
    conferenceDate: Joi.array().required(),
    conferenceEntryFee: Joi.array().required(),
    conferenceCities: Joi.array().required(),
    conferenceRandomDate: Joi.string().allow("").required(),
    conferenceState: Joi.string().allow(""),
  });
  // validating the request body
  await requestValidation(bodySchema, req?.body);
  const pageNumber: number = Number(req?.query?.pageNumber);
  const responseLimit: number = Number(req?.query?.limit);
  const datesQuery: { $or: object[] } = {
    $or: [],
  };
  const priceQuery: { $or: object[] } = {
    $or: [],
  };
  const locationQuery: { $or: object[] } = {
    $or: [],
  };
  const typeQuery: { $or: object[] } = {
    $or: [],
  };
  const stateQuery: { $or: object[] } = {
    $or: [],
  };
  let nameQuery: object = {};
  const query: { $and: object[] } = { $and: [{}] };
  // coniditon to show only conferences that are of present and future dates
  query.$and.push({
    startDate: {
      $gte: `${new Date().getFullYear()}-${String(
        new Date().getMonth() + 1,
      ).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`,
    },
  });
  //funtion to adjust the casing of the request string
  const capitalizeFirstLetter = (inputString: string) => {
    if (typeof inputString !== "string" || inputString.length === 0) {
      return inputString; // Return unchanged if it's not a string or an empty string
    }

    return (
      inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase()
    );
  };
  // Function to get the month name from a date object
  const getMonthString = (date: {
    value?: string | { startDate: string; endDate: string };
    name: string;
    toLocaleString: (arg1: undefined, options: { month: string }) => unknown;
  }) => {
    const options = { month: "long" };
    return date.toLocaleString(undefined, options);
  };
  //query for conference type filter
  if (req?.body?.conferenceType?.length > 0) {
    const requestTypes = req?.body?.conferenceType;
    requestTypes?.forEach((conferenceType: string) => {
      typeQuery.$or.push({ type: { $in: conferenceType } });
    }),
      query.$and.push(typeQuery);
  }
  //query for conference states filter
  if (req?.body?.conferenceState && req?.body?.conferenceState !== "") {
    const state = req?.body?.conferenceState;
    stateQuery.$or.push({ state: { $regex: state, $options: "i" } });
    query.$and.push(stateQuery);
  }
  //query for conference cities filter
  if (req?.body?.conferenceCities?.length > 0) {
    const cities = req?.body?.conferenceCities;
    cities?.forEach((city: { name: string }) => {
      locationQuery.$or.push({ city: { $in: city?.name } });
    });
    query.$and.push(locationQuery);
  }
  //query for conference name, city and organization filter
  if (req?.body?.conferenceSearchParam) {
    const searchParam = req?.body?.conferenceSearchParam;
    typeQuery.$or.push({ type: { $in: capitalizeFirstLetter(searchParam) } });
    (nameQuery = { name: { $regex: searchParam, $options: "i" } }),
      query.$and.push({
        $or: [
          { city: { $in: capitalizeFirstLetter(searchParam) } },
          nameQuery,
          typeQuery,
        ],
      });
  }
  //query for conference dates filter
  if (req?.body?.conferenceDate?.length > 0) {
    const date = req?.body?.conferenceDate;
    conferenceDates
      ?.filter(
        (dates) =>
          date?.some(
            (conferenceDate: { name: string }) =>
              dates.name === conferenceDate?.name,
          ),
      )
      .forEach(
        (queryDates: {
          value: { startDate: string; endDate: string } | string;
          name: string;
        }) => {
          if (queryDates?.name === "Today") {
            datesQuery.$or.push({ startDate: { $eq: queryDates?.value } });
            query.$and.push(datesQuery);
          } else if (queryDates?.name === "Tomorrow") {
            datesQuery.$or.push({ startDate: { $eq: queryDates?.value } });
            query.$and.push(datesQuery);
          } else if (queryDates?.name === "This Week") {
            datesQuery.$or.push({
              $and: [
                {
                  startDate: {
                    $gte:
                      typeof queryDates?.value === "object" &&
                      queryDates?.value?.startDate,
                  },
                },
                {
                  startDate: {
                    $lte:
                      typeof queryDates?.value === "object" &&
                      queryDates?.value?.endDate,
                  },
                },
              ],
            });
            query.$and.push(datesQuery);
          } else if (queryDates?.name === "Next Three Months") {
            datesQuery.$or.push({
              $and: [
                {
                  startDate: {
                    $gte:
                      typeof queryDates?.value === "object" &&
                      queryDates?.value?.startDate,
                  },
                },
                {
                  startDate: {
                    $lte:
                      typeof queryDates?.value === "object" &&
                      queryDates?.value?.endDate,
                  },
                },
              ],
            });
            query.$and.push(datesQuery);
          } else if (queryDates?.name === "Year") {
            datesQuery.$or.push({
              $and: [
                {
                  startDate: {
                    $gte:
                      typeof queryDates?.value === "object" &&
                      queryDates?.value?.startDate,
                  },
                },
                {
                  startDate: {
                    $lte:
                      typeof queryDates?.value === "object" &&
                      queryDates?.value?.endDate,
                  },
                },
              ],
            });
            query.$and.push(datesQuery);
          } else if (
            queryDates?.name ===
            `${getMonthString(date)}, ${new Date().getFullYear()}`
          ) {
            datesQuery.$or.push({
              $and: [
                {
                  startDate: {
                    $gte:
                      typeof queryDates?.value === "object" &&
                      queryDates?.value?.startDate,
                  },
                },
                {
                  startDate: {
                    $lte:
                      typeof queryDates?.value === "object" &&
                      queryDates?.value?.endDate,
                  },
                },
              ],
            });
            query.$and.push(datesQuery);
          }
        },
      );
  }
  //query for searching with random date
  if (req?.body?.conferenceRandomDate) {
    const randomDate = req?.body?.conferenceRandomDate;
    const dateArray = randomDate.split("-");
    if (
      dateArray[0] >= new Date().getFullYear() &&
      dateArray[1] >= String(new Date().getMonth() + 1).padStart(2, "0") &&
      dateArray[2] >= String(new Date().getDate()).padStart(2, "0")
    ) {
      datesQuery.$or.push({ startDate: { $eq: randomDate } });
      query.$and.push(datesQuery);
    } else {
      throw {
        message: "Only present and future dates are accepted !!",
        status: 400,
      };
    }
  }
  //query for searching with ticket prices
  if (req?.body?.conferenceEntryFee?.length > 0) {
    const entryFee = req?.body?.conferenceEntryFee;
    entryFee?.forEach((fee: { minimumPrice: string; maximumPrice: string }) => {
      priceQuery.$or.push({
        $and: [
          { ticketPrice: { $gte: fee?.minimumPrice } },
          { ticketPrice: { $lte: fee?.maximumPrice } },
        ],
      });
      query.$and.push(priceQuery);
    });
  }
  const totalCount = await conferenceList.countDocuments(query);
  //finding the data in db with given filters
  await conferenceList
    .find(query)
    .sort({ startDate: 1 })
    .skip(pageNumber * responseLimit)
    .limit(responseLimit)
    .then((list) => res.send({ totalCount, list }))
    .catch(() => {
      throw {
        message: "Unable to fetch the records. Please try again !!",
        status: 500,
      };
    });
};
