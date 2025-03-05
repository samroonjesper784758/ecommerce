import { NextFunction, Request, Response } from "express";
import * as authServices from "../services";
import { CreateUserDto } from "../interfaces";

export const handleCreateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, password, email }: CreateUserDto = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const response = await authServices.handleCreateUser({
      name,
      email,
      password,
    });

    res
      .status(201)
      .json({ message: "User created successfully", user: response });
  } catch (error) {
    next(error);
  }
};
