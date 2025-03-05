import bcrypt from "bcryptjs";
import { prisma } from "../prisma";
import { CreateUserDto } from "../interfaces";

export const handleCreateUser = async ({
  name,
  email,
  password,
}: CreateUserDto) => {
  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    throw new Error("User already exist ");
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
