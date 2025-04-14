import { BadRequestException } from "../exceptions/badRequestException";
import { InternalException } from "../exceptions/internalException";
import { CustomError, ErrorCode } from "../exceptions/root";
import {
  createAddressDto,
  updateAddressDto,
} from "../interfaces/address.interfaces";
import { prisma } from "../prisma";

export const handleCreateAddress = async (
  data: createAddressDto,
  id: string
) => {
  const address = await prisma.address.create({
    data: {
      ...data,
      userId: id,
    },
  });

  return { address };
};

export const handleGetAllAddresses = async (id: string) => {
  const addresses = await prisma.address.findMany({
    where: {
      userId: id,
    },
  });

  return { addresses };
};

export const handleDeleteAddressById = async (addressId: string) => {
  let address = await prisma.address.findFirst({ where: { id: addressId } });

  if (!address) {
    throw new BadRequestException(
      "Address not found",
      ErrorCode.ADDRESS_NOT_FOUND
    );
  }

  let deletedAddress = await prisma.address.delete({
    where: { id: address.id },
  });

  return { deletedAddress };
};

export const handleUpdateAddressById = async (
  id: string,
  newAddress: updateAddressDto
) => {
  let address = await prisma.address.findFirst({ where: { id } });

  if (!address) {
    throw new BadRequestException(
      "Address not found",
      ErrorCode.ADDRESS_NOT_FOUND
    );
  }

  let updatedAddress = await prisma.address.update({
    where: { id },
    data: newAddress,
  });

  return {
    updatedAddress,
  };
};

export const handleUpdateUser = async (
  data: { defaultShippingAddress: string },
  userId: string
) => {
  let address = await prisma.address.findFirst({
    where: { id: data.defaultShippingAddress },
  });

  if (!address) {
    throw new BadRequestException(
      "Address not found or does not belong to user",
      ErrorCode.ADDRESS_NOT_FOUND
    );
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      defaultShippingAddress: address.id,
    },
  });

  return {
    updatedUser
  }
};
