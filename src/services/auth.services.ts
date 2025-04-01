import { CreateUserDto, LoginUserDto } from "../interfaces/auth.interfaces";
import { prisma } from "../prisma";
import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../secretes";
import { CustomError, ErrorCode } from "../exceptions/root";
import { BadRequestException } from "../exceptions/badRequestException";
import { NotFoundExceptions } from "../exceptions/notFoudException";

export const signup = async (data: CreateUserDto) => {
  const { email, name, password } = data;

  let user = await prisma.user.findFirst({
    where: { email },
  });

  if (user) {
    throw new BadRequestException(
      "User already exists with this email",
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
    throw new NotFoundExceptions("User not  found", ErrorCode.USER_NOT_FOUND);
  }

  const isValidPassword = compareSync(password, user.password);
  if (!isValidPassword) {
    throw new BadRequestException(
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
