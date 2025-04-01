import { Request, Response, NextFunction } from "express";
import { CustomError } from "../exceptions/root";
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    res.json({
      statusCode: error.statusCode,
      message: error.message,
      errorCode:error.errorCode,
      error: error.error,
    });
    return;
  }

  //   Default Error
  res.json({
    message: "Something went wrong",
    statusCode: 500,
    errorCode: "UNKNOWN_ERROR",
    error: error.message || null,
  });
};
