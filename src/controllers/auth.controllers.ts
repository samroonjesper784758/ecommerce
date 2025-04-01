import { NextFunction, Request, Response } from "express";
import * as authServices from "../services/auth.services";
import { validateLogin, validateSignup } from "../schema/auth.schema";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = validateSignup.parse(req.body);
  const user = await authServices.signup(data);

  res.status(200).json({
    message: "User created successfully",
    user,
  });
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const data = validateLogin.parse(req.body);
  const { token, user } = await authServices.login(data);

  res.status(200).json({
    message: "Successfully logged in",
    user,
    token,
  });
};
