import { Request, Response, NextFunction } from "express";
import { CustomError } from "../exceptions/root";
import { ZodError } from "zod";
export const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      message: "Validation error",
      statusCode: 400,
      errorCode: "UPROCESSABL_ENTITY",
      errors: error.errors.map((err) => ({
        path: err.path.join("."),
        message: err.message,
      })),
    });

    return;
  }

  if (error instanceof CustomError) {
    res.json({
      statusCode: error.statusCode,
      message: error.message,
      errorCode: error.errorCode,
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
