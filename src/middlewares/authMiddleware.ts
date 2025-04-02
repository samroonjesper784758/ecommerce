import { NextFunction, Request, Response } from "express";
import { unAuthorizedException } from "../exceptions/unAuthorizedException";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secretes";
import { prisma } from "../prisma";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.replace("Bearer ", "");

  if (!token) {
    return next(new unAuthorizedException(
      "Please provide an authorization token",
      ErrorCode.UNAUTHORIZED
    ));
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET as string) as {
      userId: string;
      email: string;
    };

    const user = await prisma.user.findFirst({
      where: { id: payload.userId },
    });

    if (!user) {
      return next(new unAuthorizedException("User not found", ErrorCode.UNAUTHORIZED));
    }

    (req as any).user = user;
    next();
  } catch (error: any) {
    // Check for specific JWT error types
    if (error.name === "TokenExpiredError") {
      return next(new unAuthorizedException(
        "The provided token has expired",
        ErrorCode.UNAUTHORIZED
      ));
    } else if (error.name === "JsonWebTokenError") {
      return next(new unAuthorizedException(
        "The provided token is invalid",
        ErrorCode.UNAUTHORIZED
      ));
    } else if (error.name === "NotBeforeError") {
      return next(new unAuthorizedException(
        "The provided token is not active yet",
        ErrorCode.UNAUTHORIZED
      ));
    } else {
      // Generic error for other issues
      return next(new unAuthorizedException(
        "Authentication failed",
        ErrorCode.UNAUTHORIZED
      ));
    }
  }
};