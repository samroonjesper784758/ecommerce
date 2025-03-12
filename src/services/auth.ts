import bcrypt from "bcryptjs";
import { prisma } from "../prisma";
import { CreateUserDto, UserSignIn } from "../interfaces";
import { ErrorCode } from "../exceptions/root";
import * as jwt from "jsonwebtoken";
import { BadRequestExceptions } from "../exceptions/bad-requests";

export const handleCreateUser = async ({
  name,
  email,
  password,
}: CreateUserDto) => {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    throw new BadRequestExceptions(
      "User already exist ",
      ErrorCode.USER_ALREADY_EXIST
    );
  }

  // Hash the password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: name,
      email: email,
      password: hashedPassword,
    },
  });

  return user;
};

export const handleSignIn = async ({ email, password }: UserSignIn) => {
  const user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    throw new BadRequestExceptions("User not found", ErrorCode.USER_NOT_FOUND);
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new BadRequestExceptions(
      "Password does not match",
      ErrorCode.INCORRECT_PASSWORD
    );
  }

  const token = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_SECRET!
  );

  return { user, token };
};
