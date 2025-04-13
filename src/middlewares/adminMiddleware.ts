import { NextFunction, Request, Response } from "express";
import { unAuthorizedException } from "../exceptions/unAuthorizedException";
import { ErrorCode } from "../exceptions/root";

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;

  if (user.role === "ADMIN") {
    next();
  } else {
    next(
      new unAuthorizedException("Admin access only", ErrorCode.UNAUTHORIZED)
    );
  }
};
