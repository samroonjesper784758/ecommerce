import { NextFunction, Request, Response } from "express";
import * as authServices from "../services/auth.services";
import { validateSignup } from "../schema/signup";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    validateSignup.parse(req.body);
    const { name, email, password } = req.body;
    
    const user = await authServices.signup({
      name,
      email,
      password,
    });

    res.status(200).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: "Email and password is required" });
      return;
    }

    const { token, user } = await authServices.login({
      email,
      password,
    });

    res.status(200).json({
      message: "Successfully logged in",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
};
