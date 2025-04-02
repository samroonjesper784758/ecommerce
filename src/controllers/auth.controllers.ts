import { NextFunction, Request, Response } from "express";
import * as authServices from "../services/auth.services";
import { validateLogin, validateSignup } from "../schema/auth.schema";

export const signup = async (req: Request, res: Response) => {
  const data = validateSignup.parse(req.body);
  const user = await authServices.signup(data);

  res.status(201).json({
    message: "User created successfully",
    user,
  });
};

export const login = async (req: Request, res: Response) => {
  const data = validateLogin.parse(req.body);
  const { token, user } = await authServices.login(data);

  res.status(200).json({
    message: "Successfully logged in",
    user,
    token,
  });
};

export const me = async (req: Request, res: Response) => {
  console.log((req as any).user);
};
