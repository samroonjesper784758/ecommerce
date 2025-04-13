import { NextFunction, Request, Response } from "express";
import { CustomError, ErrorCode } from "./exceptions/root";
import { InternalException } from "./exceptions/internalException";
import { ZodError } from "zod";

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error: any) {
      let exceptions: CustomError;
      if (error instanceof CustomError) {
        exceptions = error;
      } else if (error instanceof ZodError) {
        exceptions = new CustomError(
          400,
          "Validation Error",
          ErrorCode.VALIDATION_ERROR,
          error.errors.map((err) => ({
            message: err.message,
          }))
        );
      } else {
        exceptions = new InternalException(
          "Something went wrong",
          ErrorCode.INTERNAL_SERVER_ERROR,
          error
        );
      }
      next(exceptions);
    }
  };
};
