import { Request, Response } from "express";

// function to handle the api request response cycle
export const requestHandler =
  (controller: (req: Request, res: Response) => unknown) =>
  async (req: Request, res: Response) => {
    try {
      await controller(req, res);
    } catch (
      //eslint-disable-next-line
      error: any
    ) {
      res.status(error?.status || 500).json({
        message: error?.message,
      });
    }
  };
