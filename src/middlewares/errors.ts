import { NextFunction, Request, Response } from "express";
import { CustomError } from "../exceptions/root";

export const errorMiddleWare = (
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode).json({
    errorCode: error.errorCode,
    message: error.message,
    error: error.error ?? null,
  });
};
