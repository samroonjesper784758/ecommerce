import { CreateUserDto, LoginUserDto } from "../interfaces/auth.interfaces";
import { prisma } from "../prisma";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secretes";
import { CustomError, ErrorCode } from "../exceptions/root";

export const signup = async (data: CreateUserDto) => {
  const { email, name, password } = data;

  let user = await prisma.user.findFirst({
    where: { email },
  });

  if (user) {
    throw new CustomError(
      400,
      "User already exists",
      ErrorCode.USER_ALREADY_EXISTS
    );
  }

  user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashSync(password, 10),
    },
  });

  return user;
};

export const login = async (data: LoginUserDto) => {
  const { email, password } = data;

  let user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new CustomError(404, "User not  found", ErrorCode.USER_NOT_FOUND);
  }

  const isValidPassword = compareSync(password, user.password);
  if (!isValidPassword) {
    throw new CustomError(
      400,
      "Password does not match",
      ErrorCode.PASSWORD_DOES_NOT_MATCH
    );
  }

  const token = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    JWT_SECRET!,
    { expiresIn: "1h" }
  );

  return {
    user,
    token,
  };
};
